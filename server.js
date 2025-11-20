require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const NodeCache = require('node-cache');
const path = require('path');

const app = express();
const cache = new NodeCache({ stdTTL: 3600 }); // Cache 1 heure

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Spotify Configuration
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

// Cache pour le token Spotify
let spotifyToken = null;
let spotifyTokenExpiry = 0;

// Obtenir token d'accès Spotify (Client Credentials Flow)
async function getSpotifyToken() {
  if (spotifyToken && Date.now() < spotifyTokenExpiry) {
    return spotifyToken;
  }

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      'grant_type=client_credentials',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64')
        }
      }
    );

    spotifyToken = response.data.access_token;
    spotifyTokenExpiry = Date.now() + (response.data.expires_in * 1000) - 60000; // -1 min de sécurité
    return spotifyToken;
  } catch (error) {
    console.error('Erreur obtention token Spotify:', error.message);
    throw new Error('Impossible d\'accéder à Spotify');
  }
}

// Rechercher playlists Spotify
async function searchSpotifyPlaylists(mood) {
  const cacheKey = `spotify_${mood}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  try {
    const token = await getSpotifyToken();
    const searchQueries = getChristmasSearchQueries(mood);
    
    const results = [];
    for (const query of searchQueries) {
      const response = await axios.get('https://api.spotify.com/v1/search', {
        headers: { 'Authorization': `Bearer ${token}` },
        params: {
          q: query,
          type: 'playlist',
          limit: 10,
          market: 'US'
        }
      });

      if (response.data.playlists.items.length > 0) {
        results.push(...response.data.playlists.items);
      }
    }

    // Filtrer et formater les résultats
    const playlists = results
      .filter(p => p && p.images && p.images.length > 0)
      .slice(0, 12)
      .map(playlist => ({
        id: playlist.id,
        name: playlist.name,
        description: playlist.description || 'Playlist de Noël parfaite pour votre ambiance',
        image: playlist.images[0]?.url || '',
        tracks: playlist.tracks?.total || 0,
        followers: playlist.followers?.total || 0,
        url: playlist.external_urls?.spotify || '',
        owner: playlist.owner?.display_name || 'Spotify'
      }));

    cache.set(cacheKey, playlists);
    return playlists;
  } catch (error) {
    console.error('Erreur recherche Spotify:', error.message);
    return [];
  }
}

// Rechercher playlists Deezer
async function searchDeezerPlaylists(mood) {
  const cacheKey = `deezer_${mood}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  try {
    const searchQueries = getChristmasSearchQueries(mood);
    const results = [];

    for (const query of searchQueries) {
      const response = await axios.get('https://api.deezer.com/search/playlist', {
        params: { q: query, limit: 10 }
      });

      if (response.data.data && response.data.data.length > 0) {
        results.push(...response.data.data);
      }
    }

    // Filtrer et formater les résultats
    const playlists = results
      .filter(p => p && p.picture_medium)
      .slice(0, 12)
      .map(playlist => ({
        id: playlist.id,
        name: playlist.title,
        description: `${playlist.nb_tracks} chansons de Noël`,
        image: playlist.picture_medium || playlist.picture_big || '',
        tracks: playlist.nb_tracks || 0,
        followers: playlist.fans || 0,
        url: playlist.link || `https://www.deezer.com/playlist/${playlist.id}`,
        owner: playlist.user?.name || 'Deezer'
      }));

    cache.set(cacheKey, playlists);
    return playlists;
  } catch (error) {
    console.error('Erreur recherche Deezer:', error.message);
    return [];
  }
}

// Générer requêtes de recherche selon l'ambiance
function getChristmasSearchQueries(mood) {
  const queries = {
    traditional: [
      'christmas traditional music',
      'classic christmas carols',
      'traditional christmas songs',
      'vintage christmas music'
    ],
    family: [
      'christmas family music',
      'christmas songs for kids',
      'family christmas playlist',
      'all ages christmas music'
    ],
    party: [
      'christmas party music',
      'upbeat christmas songs',
      'christmas dance party',
      'fun christmas music'
    ],
    romantic: [
      'romantic christmas music',
      'christmas love songs',
      'cozy christmas playlist',
      'christmas jazz romantic'
    ],
    modern: [
      'modern christmas music',
      'pop christmas songs',
      'contemporary christmas',
      'new christmas music 2024'
    ],
    kids: [
      'christmas songs for children',
      'kids christmas music',
      'childrens christmas carols',
      'disney christmas songs'
    ],
    jazz: [
      'christmas jazz music',
      'smooth jazz christmas',
      'jazz christmas standards',
      'swing christmas songs'
    ],
    instrumental: [
      'instrumental christmas music',
      'christmas piano music',
      'christmas orchestra',
      'christmas background music'
    ]
  };

  return queries[mood] || queries.traditional;
}

// Routes pour fichiers statiques
app.get('/styles.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'styles.css'));
});

app.get('/app.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'app.js'));
});

// Route principale
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API: Rechercher playlists (POST pour multiple moods)
app.post('/api/playlists', async (req, res) => {
  const { platform, moods } = req.body;

  if (!platform || !moods || !Array.isArray(moods) || moods.length === 0) {
    return res.status(400).json({ error: 'Platform et moods requis' });
  }

  try {
    let allPlaylists = [];

    // Rechercher pour chaque ambiance sélectionnée
    for (const mood of moods) {
      let playlists = [];
      
      if (platform === 'spotify') {
        playlists = await searchSpotifyPlaylists(mood);
      } else if (platform === 'deezer') {
        playlists = await searchDeezerPlaylists(mood);
      }
      
      allPlaylists.push(...playlists);
    }

    // Dédupliquer et limiter les résultats
    const uniquePlaylists = allPlaylists
      .filter((playlist, index, self) => 
        index === self.findIndex(p => p.id === playlist.id)
      )
      .slice(0, 12);

    res.json({ playlists: uniquePlaylists, count: uniquePlaylists.length });
  } catch (error) {
    console.error('Erreur API:', error);
    res.status(500).json({ error: 'Erreur lors de la recherche' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    spotify: !!SPOTIFY_CLIENT_ID,
    cache_keys: cache.keys().length
  });
});

const server = app.listen(PORT, () => {
  console.log(`🎄 Christmas Playlist Generator lancé sur le port ${PORT}`);
  console.log(`🎵 http://localhost:${PORT}`);
  console.log(`🔑 Spotify Client ID: ${SPOTIFY_CLIENT_ID ? 'Configuré' : 'Manquant'}`);
});

// Export pour Vercel
module.exports = app;
