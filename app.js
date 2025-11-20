// State Management
const state = {
    selectedPlatform: null,
    selectedMoods: [],
    playlists: []
};

// DOM Elements
const platformButtons = document.querySelectorAll('.platform-btn');
const moodSection = document.getElementById('moodSection');
const moodButtons = document.querySelectorAll('.mood-btn');
const generateBtn = document.getElementById('generateBtn');
const loading = document.getElementById('loading');
const resultsSection = document.getElementById('resultsSection');
const playlistsContainer = document.getElementById('playlistsContainer');
const resetBtn = document.getElementById('resetBtn');

// Platform Selection
platformButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        platformButtons.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Update state
        state.selectedPlatform = btn.dataset.platform;
        
        // Show mood selection
        moodSection.style.display = 'block';
        moodSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Mood Selection
moodButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const mood = btn.dataset.mood;
        
        // Toggle selection
        if (btn.classList.contains('selected')) {
            btn.classList.remove('selected');
            state.selectedMoods = state.selectedMoods.filter(m => m !== mood);
        } else {
            // Limit to 3 moods
            if (state.selectedMoods.length < 3) {
                btn.classList.add('selected');
                state.selectedMoods.push(mood);
            } else {
                showNotification('Vous pouvez sélectionner maximum 3 ambiances 🎄');
            }
        }
        
        // Enable/disable generate button
        generateBtn.disabled = state.selectedMoods.length === 0;
    });
});

// Generate Playlists
generateBtn.addEventListener('click', async () => {
    if (state.selectedMoods.length === 0) {
        showNotification('Veuillez sélectionner au moins une ambiance');
        return;
    }

    // Hide mood section and show loading
    moodSection.style.display = 'none';
    resultsSection.style.display = 'none';
    loading.style.display = 'block';
    loading.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    try {
        // Call backend API
        const response = await fetch('/api/playlists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                platform: state.selectedPlatform,
                moods: state.selectedMoods
            })
        });
        
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des playlists');
        }
        
        const data = await response.json();
        state.playlists = data.playlists || [];
        
        // Display results
        displayPlaylists();
        
    } catch (error) {
        console.error('Error:', error);
        showNotification('⚠️ Oups! Une erreur est survenue. Veuillez réessayer.');
        moodSection.style.display = 'block';
    } finally {
        loading.style.display = 'none';
    }
});

// Display Playlists
function displayPlaylists() {
    playlistsContainer.innerHTML = '';
    
    if (state.playlists.length === 0) {
        playlistsContainer.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
                <p style="font-size: 1.5em; color: #666;">
                    😔 Aucune playlist trouvée pour cette combinaison.<br>
                    Essayez d'autres ambiances!
                </p>
            </div>
        `;
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
    }
    
    state.playlists.forEach((playlist, index) => {
        const card = createPlaylistCard(playlist, index);
        playlistsContainer.appendChild(card);
    });
    
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Create Playlist Card
function createPlaylistCard(playlist, index) {
    const card = document.createElement('div');
    card.className = 'playlist-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    const platformClass = state.selectedPlatform;
    const platformEmoji = state.selectedPlatform === 'spotify' ? '🎵' : '🎶';
    const platformName = state.selectedPlatform === 'spotify' ? 'Spotify' : 'Deezer';
    
    // Sécurité: s'assurer que les valeurs existent
    const name = escapeHtml(playlist.name || 'Playlist de Noël');
    const description = escapeHtml(playlist.description || 'Une sélection parfaite pour vos fêtes de Noël!');
    const image = playlist.image || 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22200%22%3E%3Crect fill=%22%23165B33%22 width=%22300%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2224%22 fill=%22white%22 text-anchor=%22middle%22 dy=%22.3em%22%3E🎄 Playlist de Noël%3C/text%3E%3C/svg%3E';
    const url = playlist.url || '#';
    
    card.innerHTML = `
        <img src="${image}" alt="${name}" class="playlist-image" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22200%22%3E%3Crect fill=%22%23165B33%22 width=%22300%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2224%22 fill=%22white%22 text-anchor=%22middle%22 dy=%22.3em%22%3E🎄 Playlist de Noël%3C/text%3E%3C/svg%3E'">
        <div class="playlist-info">
            <h3 class="playlist-name">${name}</h3>
            <p class="playlist-description">${description}</p>
            <div class="playlist-stats">
                ${playlist.tracks ? `<div class="stat">🎵 ${playlist.tracks} titres</div>` : ''}
                ${playlist.followers ? `<div class="stat">❤️ ${formatNumber(playlist.followers)} abonnés</div>` : ''}
            </div>
            <button class="play-btn ${platformClass}" onclick="openPlaylist('${url}')">
                ${platformEmoji} Écouter sur ${platformName}
            </button>
        </div>
    `;
    
    return card;
}

// Open Playlist
function openPlaylist(url) {
    if (url && url !== '#') {
        window.open(url, '_blank');
    } else {
        showNotification('Lien indisponible pour cette playlist');
    }
}

// Reset
resetBtn.addEventListener('click', () => {
    // Reset state
    state.selectedMoods = [];
    state.playlists = [];
    
    // Reset UI
    moodButtons.forEach(btn => btn.classList.remove('selected'));
    generateBtn.disabled = true;
    resultsSection.style.display = 'none';
    moodSection.style.display = 'block';
    
    // Scroll to mood section
    moodSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Utility Functions
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatNumber(num) {
    if (!num) return '0';
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: white;
        color: #165B33;
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 1000;
        font-weight: 600;
        animation: slideDown 0.3s ease;
        border: 2px solid #FFD700;
        max-width: 300px;
        text-align: center;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations to document
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            transform: translate(-50%, -100%);
            opacity: 0;
        }
        to {
            transform: translate(-50%, 0);
            opacity: 1;
        }
    }
    
    @keyframes slideUp {
        from {
            transform: translate(-50%, 0);
            opacity: 1;
        }
        to {
            transform: translate(-50%, -100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize - Add sparkle cursor effect
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.96) { // Réduire la fréquence
        createSparkle(e.pageX, e.pageY);
    }
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        font-size: ${Math.random() * 10 + 10}px;
        z-index: 9999;
        animation: sparkleFloat 1s ease-out forwards;
    `;
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 1000);
}

const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleFloat {
        to {
            transform: translateY(-30px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Test API connection on load
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/health');
        if (response.ok) {
            console.log('🎄 Christmas Playlist Generator Ready! 🎄');
        }
    } catch (error) {
        console.warn('API connection test failed:', error.message);
    }
});
