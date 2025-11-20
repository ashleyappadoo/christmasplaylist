const express = require('express');
const axios = require('axios');
const qs = require('querystring');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration Spotify API
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || '';
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || '';

// Configuration Deezer (pas d'auth nécessaire)
let spotifyToken = null;
let tokenExpiry = null;

// Middleware
app.use(express.json());
app.use(express.static(__dirname)); // Servir les fichiers depuis la racine

// Fonction pour obtenir un token Spotify
async function getSpotifyToken() {
    try {
        if (spotifyToken && tokenExpiry && Date.now() < tokenExpiry) {
            return spotifyToken;
        }

        const response = await axios.post('https://accounts.spotify.com/api/token', 
            qs.stringify({
                grant_type: 'client_credentials'
            }), 
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
                }
            }
        );

        spotifyToken = response.data.access_token;
        tokenExpiry = Date.now() + (response.data.expires_in * 1000);
        
        return spotifyToken;
    } catch (error) {
        console.error('Erreur lors de l\'obtention du token Spotify:', error.message);
        return null;
    }
}

// Fonction pour rechercher des playlists Spotify avec support multilingue
async function searchSpotifyPlaylists(mood, language = 'fr', region = 'FR') {
    try {
        const token = await getSpotifyToken();
        if (!token) {
            throw new Error('Token Spotify non disponible');
        }

        const queries = getChristmasSearchQueries(mood, language, region);
        const allPlaylists = [];

        for (const query of queries) {
            try {
                const response = await axios.get('https://api.spotify.com/v1/search', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    params: {
                        q: query,
                        type: 'playlist',
                        limit: 5,
                        market: region
                    }
                });

                const playlists = response.data.playlists.items
                    .filter(playlist => 
                        playlist.tracks && 
                        playlist.tracks.total > 5 &&
                        playlist.images && 
                        playlist.images.length > 0
                    )
                    .map(playlist => ({
                        id: playlist.id,
                        name: playlist.name,
                        description: playlist.description || '',
                        url: playlist.external_urls.spotify,
                        image: playlist.images[0]?.url || '',
                        trackCount: playlist.tracks.total,
                        owner: playlist.owner.display_name,
                        platform: 'spotify'
                    }));

                allPlaylists.push(...playlists);
            } catch (error) {
                console.error(`Erreur recherche Spotify pour "${query}":`, error.message);
            }
        }

        // Retourner les 8 meilleures playlists
        return allPlaylists.slice(0, 8);
    } catch (error) {
        console.error('Erreur Spotify:', error.message);
        return [];
    }
}

// Fonction pour rechercher des playlists Deezer avec support multilingue
async function searchDeezerPlaylists(mood, language = 'fr', region = 'FR') {
    try {
        const queries = getChristmasSearchQueries(mood, language, region);
        const allPlaylists = [];

        for (const query of queries) {
            try {
                const response = await axios.get('https://api.deezer.com/search/playlist', {
                    params: {
                        q: query,
                        limit: 5
                    }
                });

                const playlists = response.data.data
                    .filter(playlist => 
                        playlist.nb_tracks > 5 &&
                        playlist.picture_medium
                    )
                    .map(playlist => ({
                        id: playlist.id,
                        name: playlist.title,
                        description: `${playlist.nb_tracks} pistes`,
                        url: playlist.link,
                        image: playlist.picture_medium,
                        trackCount: playlist.nb_tracks,
                        owner: playlist.user?.name || 'Deezer',
                        platform: 'deezer'
                    }));

                allPlaylists.push(...playlists);
            } catch (error) {
                console.error(`Erreur recherche Deezer pour "${query}":`, error.message);
            }
        }

        return allPlaylists.slice(0, 8);
    } catch (error) {
        console.error('Erreur Deezer:', error.message);
        return [];
    }
}

// Requêtes de recherche multilingues et régionales
function getChristmasSearchQueries(mood, language = 'fr', region = 'FR') {
    const queries = {
        fr: {
            traditional: [
                'musique traditionnelle noël',
                'chants de noël classiques',
                'cantiques de noël',
                'noël ancien français',
                'musique religieuse noël'
            ],
            family: [
                'musique familiale noël',
                'chansons noël enfants',
                'noël en famille',
                'comptines de noël',
                'disney noël français'
            ],
            jazzy: [
                'jazz noël français',
                'swing noël',
                'noël lounge',
                'jazz club christmas',
                'bossa nova noël'
            ],
            modern: [
                'pop noël français',
                'rock noël moderne',
                'électro noël',
                'indie christmas français',
                'alternative noël'
            ],
            romantic: [
                'romantique noël',
                'slow noël amour',
                'ballades romantiques noël',
                'love songs christmas français',
                'dîner romantique noël'
            ],
            party: [
                'party noël français',
                'danse noël',
                'fête noël musique',
                'club noël',
                'dance christmas'
            ],
            cozy: [
                'atmosphère cosy noël',
                'doux noël',
                'relaxant noël',
                'ambiance chaleureuse noël',
                'chill noël'
            ],
            international: [
                'noël du monde',
                'christmas world music',
                'noël international',
                'world christmas',
                'global holiday'
            ]
        },
        en: {
            traditional: [
                'traditional christmas carols',
                'classic christmas songs',
                'religious christmas music',
                'vintage christmas',
                'old fashioned christmas'
            ],
            family: [
                'family christmas music',
                'kids christmas songs',
                'disney christmas',
                'children holiday music',
                'wholesome christmas'
            ],
            jazzy: [
                'christmas jazz classics',
                'holiday jazz standards',
                'swing christmas',
                'jazz christmas vocals',
                'christmas lounge'
            ],
            modern: [
                'modern christmas pop',
                'contemporary holiday',
                'indie christmas',
                'alternative holiday music',
                'new christmas songs'
            ],
            romantic: [
                'romantic christmas songs',
                'love songs christmas',
                'christmas ballads',
                'romantic holiday music',
                'christmas date night'
            ],
            party: [
                'upbeat christmas music',
                'christmas party playlist',
                'dance christmas songs',
                'fun holiday music',
                'christmas celebration'
            ],
            cozy: [
                'cozy christmas atmosphere',
                'peaceful christmas music',
                'relaxing holiday songs',
                'chill christmas playlist',
                'warm christmas vibes'
            ],
            international: [
                'world christmas music',
                'international holiday',
                'global christmas traditions',
                'multicultural christmas',
                'christmas around world'
            ]
        },
        es: {
            traditional: [
                'villancicos tradicionales',
                'música navideña clásica',
                'navidad religiosa',
                'villancicos españoles',
                'música tradicional navidad'
            ],
            family: [
                'música navideña familiar',
                'canciones navidad niños',
                'navidad en familia',
                'villancicos infantiles',
                'disney navidad español'
            ],
            jazzy: [
                'jazz navideño',
                'swing navidad',
                'navidad lounge',
                'jazz club navidad',
                'bossa nova navidad'
            ],
            modern: [
                'pop navideño moderno',
                'rock navidad',
                'música navideña contemporánea',
                'indie navidad',
                'navidad alternativa'
            ],
            romantic: [
                'navidad romántica',
                'baladas navideñas',
                'música romántica navidad',
                'amor navidad',
                'cena romántica navidad'
            ],
            party: [
                'fiesta navideña',
                'baile navidad',
                'música fiesta navidad',
                'celebración navideña',
                'dance navidad'
            ],
            cozy: [
                'ambiente acogedor navidad',
                'navidad relajante',
                'música suave navidad',
                'navidad chill',
                'ambiente cálido navidad'
            ],
            international: [
                'navidad del mundo',
                'música navideña internacional',
                'tradiciones navideñas mundiales',
                'navidad multicultural',
                'christmas world'
            ]
        },
        de: {
            traditional: [
                'traditionelle weihnachtslieder',
                'klassische weihnachtsmusik',
                'deutsche weihnachtslieder',
                'religiöse weihnachtsmusik',
                'alte weihnachtslieder'
            ],
            family: [
                'familien weihnachtsmusik',
                'kinder weihnachtslieder',
                'weihnachten für kinder',
                'disney weihnachten deutsch',
                'familie weihnachten'
            ],
            jazzy: [
                'weihnachts jazz',
                'swing weihnachten',
                'jazz weihnachtslieder',
                'lounge weihnachten',
                'christmas jazz deutsch'
            ],
            modern: [
                'moderne weihnachtsmusik',
                'pop weihnachten',
                'rock weihnachtslieder',
                'contemporary christmas deutsch',
                'indie weihnachten'
            ],
            romantic: [
                'romantische weihnachtsmusik',
                'weihnachts balladen',
                'liebevolle weihnachtslieder',
                'romantische weihnachten',
                'weihnachts liebeslieder'
            ],
            party: [
                'weihnachtsparty musik',
                'fröhliche weihnachtslieder',
                'party weihnachten',
                'tanzbare weihnachtsmusik',
                'weihnachtsfeier'
            ],
            cozy: [
                'gemütliche weihnachtsmusik',
                'entspannte weihnachten',
                'ruhige weihnachtslieder',
                'besinnliche weihnachten',
                'chill weihnachtsmusik'
            ],
            international: [
                'internationale weihnachtsmusik',
                'weihnachten weltweit',
                'world christmas musik',
                'multicultural weihnachten',
                'globale weihnachten'
            ]
        }
    };

    // Ajouter des requêtes spécifiques par région
    const regionalQueries = getRegionalQueries(mood, region, language);
    
    const baseQueries = queries[language]?.[mood] || queries['en'][mood] || [];
    return [...baseQueries, ...regionalQueries].slice(0, 6);
}

// Requêtes spécifiques par région
function getRegionalQueries(mood, region, language) {
    const regional = {
        FR: {
            artists: ['Michel Sardou noël', 'Céline Dion christmas', 'Johnny Hallyday noël'],
            terms: ['noël français', 'christmas france']
        },
        US: {
            artists: ['Mariah Carey christmas', 'Michael Bublé holiday', 'Bing Crosby christmas'],
            terms: ['american christmas', 'holiday classics']
        },
        UK: {
            artists: ['Elton John christmas', 'George Michael christmas', 'Band Aid'],
            terms: ['british christmas', 'uk holiday music']
        },
        ES: {
            artists: ['Jesse & Joy navidad', 'Manu Tenorio navidad', 'Raphael navidad'],
            terms: ['navidad española', 'villancicos españa']
        },
        DE: {
            artists: ['Helene Fischer weihnachten', 'Andreas Gabalier weihnachten'],
            terms: ['deutsche weihnachten', 'german christmas']
        },
        CA: {
            artists: ['Céline Dion christmas', 'Michael Bublé holiday', 'Alanis Morissette christmas'],
            terms: ['canadian christmas', 'holiday canada']
        }
    };

    const regionData = regional[region] || regional['US'];
    return [
        ...regionData.artists.slice(0, 2),
        ...regionData.terms
    ];
}

// Route principale - servir index.html depuis la racine
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route API pour générer des playlists multilingues
app.post('/api/playlists', async (req, res) => {
    try {
        const { platform, moods, language = 'fr', region = 'FR' } = req.body;

        if (!platform || !moods || !Array.isArray(moods)) {
            return res.status(400).json({
                success: false,
                error: 'Paramètres manquants: platform et moods requis'
            });
        }

        if (moods.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Veuillez sélectionner au moins une ambiance'
            });
        }

        console.log(`🎵 Recherche de playlists ${platform} pour:`, {
            moods,
            language,
            region
        });

        const allPlaylists = [];

        for (const mood of moods) {
            let playlists = [];
            
            if (platform === 'spotify') {
                playlists = await searchSpotifyPlaylists(mood, language, region);
            } else if (platform === 'deezer') {
                playlists = await searchDeezerPlaylists(mood, language, region);
            }

            // Ajouter le mood aux playlists pour le filtrage côté client
            playlists = playlists.map(playlist => ({
                ...playlist,
                mood: mood
            }));

            allPlaylists.push(...playlists);
        }

        // Mélanger les résultats et enlever les doublons
        const uniquePlaylists = [];
        const seenIds = new Set();

        for (const playlist of allPlaylists) {
            if (!seenIds.has(playlist.id)) {
                seenIds.add(playlist.id);
                uniquePlaylists.push(playlist);
            }
        }

        // Mélanger les playlists
        for (let i = uniquePlaylists.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [uniquePlaylists[i], uniquePlaylists[j]] = [uniquePlaylists[j], uniquePlaylists[i]];
        }

        console.log(`✅ ${uniquePlaylists.length} playlists trouvées`);

        res.json({
            success: true,
            playlists: uniquePlaylists.slice(0, 20),
            language,
            region
        });

    } catch (error) {
        console.error('❌ Erreur API:', error);
        res.status(500).json({
            success: false,
            error: 'Erreur lors de la recherche de playlists'
        });
    }
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`🎄 Serveur démarré sur le port ${PORT}`);
    console.log(`🌍 Support multilingue activé: FR, EN, ES, DE`);
    console.log(`📍 Régions supportées: FR, US, UK, ES, DE, CA`);
});
