// Dictionnaire de traductions complet
const translations = {
    fr: {
        title: "Générateur de Playlists de Noël",
        subtitle: "Trouvez la playlist parfaite pour vos fêtes ✨",
        languageLabel: "🌍 Langue :",
        regionLabel: "📍 Région :",
        platformTitle: "Choisissez votre plateforme",
        moodTitle: "Quelle ambiance pour vos fêtes ?",
        moodSubtitle: "Sélectionnez jusqu'à 3 ambiances",
        generateBtn: "Générer mes playlists",
        loadingText: "Génération en cours...",
        errorText: "Erreur lors de la génération des playlists",
        noPlaylistsText: "Aucune playlist trouvée pour ces critères",
        playlistsFoundText: "playlists trouvées",
        trackText: "pistes",
        byText: "par",
        regions: {
            FR: "🇫🇷 France",
            US: "🇺🇸 États-Unis",
            UK: "🇬🇧 Royaume-Uni",
            ES: "🇪🇸 Espagne",
            DE: "🇩🇪 Allemagne",
            CA: "🇨🇦 Canada"
        },
        moods: {
            traditional: {
                name: "Traditionnel",
                desc: "Classiques de Noël intemporels"
            },
            family: {
                name: "Familial",
                desc: "Pour toute la famille"
            },
            jazzy: {
                name: "Jazz",
                desc: "Swing et standards jazz"
            },
            modern: {
                name: "Moderne",
                desc: "Pop et rock contemporain"
            },
            romantic: {
                name: "Romantique",
                desc: "Ballades et ambiance intime"
            },
            party: {
                name: "Fête",
                desc: "Rythmes entraînants"
            },
            cozy: {
                name: "Cosy",
                desc: "Atmosphère chaleureuse"
            },
            international: {
                name: "International",
                desc: "Noël du monde entier"
            }
        }
    },
    en: {
        title: "Christmas Playlist Generator",
        subtitle: "Find the perfect playlist for your holidays ✨",
        languageLabel: "🌍 Language:",
        regionLabel: "📍 Region:",
        platformTitle: "Choose your platform",
        moodTitle: "What's your holiday vibe?",
        moodSubtitle: "Select up to 3 moods",
        generateBtn: "Generate my playlists",
        loadingText: "Generating...",
        errorText: "Error generating playlists",
        noPlaylistsText: "No playlists found for these criteria",
        playlistsFoundText: "playlists found",
        trackText: "tracks",
        byText: "by",
        regions: {
            FR: "🇫🇷 France",
            US: "🇺🇸 United States",
            UK: "🇬🇧 United Kingdom",
            ES: "🇪🇸 Spain",
            DE: "🇩🇪 Germany",
            CA: "🇨🇦 Canada"
        },
        moods: {
            traditional: {
                name: "Traditional",
                desc: "Timeless Christmas classics"
            },
            family: {
                name: "Family",
                desc: "Perfect for the whole family"
            },
            jazzy: {
                name: "Jazz",
                desc: "Swing and jazz standards"
            },
            modern: {
                name: "Modern",
                desc: "Contemporary pop and rock"
            },
            romantic: {
                name: "Romantic",
                desc: "Ballads and intimate vibes"
            },
            party: {
                name: "Party",
                desc: "Upbeat and energetic"
            },
            cozy: {
                name: "Cozy",
                desc: "Warm and peaceful atmosphere"
            },
            international: {
                name: "International",
                desc: "Christmas around the world"
            }
        }
    },
    es: {
        title: "Generador de Listas Navideñas",
        subtitle: "Encuentra la lista perfecta para tus fiestas ✨",
        languageLabel: "🌍 Idioma:",
        regionLabel: "📍 Región:",
        platformTitle: "Elige tu plataforma",
        moodTitle: "¿Cuál es tu ambiente navideño?",
        moodSubtitle: "Selecciona hasta 3 ambientes",
        generateBtn: "Generar mis listas",
        loadingText: "Generando...",
        errorText: "Error generando listas",
        noPlaylistsText: "No se encontraron listas para estos criterios",
        playlistsFoundText: "listas encontradas",
        trackText: "pistas",
        byText: "por",
        regions: {
            FR: "🇫🇷 Francia",
            US: "🇺🇸 Estados Unidos",
            UK: "🇬🇧 Reino Unido",
            ES: "🇪🇸 España",
            DE: "🇩🇪 Alemania",
            CA: "🇨🇦 Canadá"
        },
        moods: {
            traditional: {
                name: "Tradicional",
                desc: "Clásicos navideños atemporales"
            },
            family: {
                name: "Familiar",
                desc: "Perfecto para toda la familia"
            },
            jazzy: {
                name: "Jazz",
                desc: "Swing y estándares de jazz"
            },
            modern: {
                name: "Moderno",
                desc: "Pop y rock contemporáneo"
            },
            romantic: {
                name: "Romántico",
                desc: "Baladas y ambiente íntimo"
            },
            party: {
                name: "Fiesta",
                desc: "Ritmos alegres y energéticos"
            },
            cozy: {
                name: "Acogedor",
                desc: "Ambiente cálido y tranquilo"
            },
            international: {
                name: "Internacional",
                desc: "Navidad alrededor del mundo"
            }
        }
    },
    de: {
        title: "Weihnachts-Playlist Generator",
        subtitle: "Finde die perfekte Playlist für deine Feiertage ✨",
        languageLabel: "🌍 Sprache:",
        regionLabel: "📍 Region:",
        platformTitle: "Wähle deine Plattform",
        moodTitle: "Wie ist deine Weihnachtsstimmung?",
        moodSubtitle: "Wähle bis zu 3 Stimmungen",
        generateBtn: "Meine Playlists generieren",
        loadingText: "Wird generiert...",
        errorText: "Fehler beim Generieren der Playlists",
        noPlaylistsText: "Keine Playlists für diese Kriterien gefunden",
        playlistsFoundText: "Playlists gefunden",
        trackText: "Titel",
        byText: "von",
        regions: {
            FR: "🇫🇷 Frankreich",
            US: "🇺🇸 Vereinigte Staaten",
            UK: "🇬🇧 Vereinigtes Königreich",
            ES: "🇪🇸 Spanien",
            DE: "🇩🇪 Deutschland",
            CA: "🇨🇦 Kanada"
        },
        moods: {
            traditional: {
                name: "Traditionell",
                desc: "Zeitlose Weihnachtsklassiker"
            },
            family: {
                name: "Familie",
                desc: "Perfekt für die ganze Familie"
            },
            jazzy: {
                name: "Jazz",
                desc: "Swing und Jazz-Standards"
            },
            modern: {
                name: "Modern",
                desc: "Zeitgenössischer Pop und Rock"
            },
            romantic: {
                name: "Romantisch",
                desc: "Balladen und intime Stimmung"
            },
            party: {
                name: "Party",
                desc: "Schwungvoll und energiegeladen"
            },
            cozy: {
                name: "Gemütlich",
                desc: "Warme und friedliche Atmosphäre"
            },
            international: {
                name: "International",
                desc: "Weihnachten rund um die Welt"
            }
        }
    }
};

// State de l'application
const state = {
    selectedPlatform: null,
    selectedMoods: [],
    playlists: [],
    currentLanguage: 'fr',
    currentRegion: 'FR',
    isLoading: false
};

// Fonction pour obtenir la traduction
function t(key) {
    const keys = key.split('.');
    let value = translations[state.currentLanguage];
    
    for (const k of keys) {
        if (value && value[k] !== undefined) {
            value = value[k];
        } else {
            // Fallback vers l'anglais si la traduction n'existe pas
            value = translations.en;
            for (const k2 of keys) {
                if (value && value[k2] !== undefined) {
                    value = value[k2];
                } else {
                    return key; // Retourner la clé si aucune traduction trouvée
                }
            }
            break;
        }
    }
    
    return value;
}

// Fonction pour mettre à jour l'interface avec les traductions
function updateTranslations() {
    // Titre de la page
    document.title = t('title');
    
    // Titre principal
    const mainTitle = document.querySelector('.hero h1');
    if (mainTitle) mainTitle.textContent = t('title');
    
    // Sous-titre
    const subtitle = document.querySelector('.hero .subtitle');
    if (subtitle) subtitle.textContent = t('subtitle');
    
    // Labels des sélecteurs
    const languageLabel = document.querySelector('.language-selector label');
    if (languageLabel) languageLabel.textContent = t('languageLabel');
    
    const regionLabel = document.querySelector('.region-selector label');
    if (regionLabel) regionLabel.textContent = t('regionLabel');
    
    // Titre de la section plateforme
    const platformTitle = document.querySelector('#platform-section h2');
    if (platformTitle) platformTitle.textContent = t('platformTitle');
    
    // Titre de la section ambiances
    const moodTitle = document.querySelector('#mood-section h2');
    if (moodTitle) moodTitle.textContent = t('moodTitle');
    
    // Sous-titre des ambiances
    const moodSubtitle = document.querySelector('#mood-section .section-subtitle');
    if (moodSubtitle) moodSubtitle.textContent = t('moodSubtitle');
    
    // Bouton de génération
    const generateBtn = document.querySelector('#generate-btn');
    if (generateBtn && !state.isLoading) {
        generateBtn.textContent = t('generateBtn');
    }
    
    // Mettre à jour les options de région
    const regionSelect = document.getElementById('regionSelect');
    if (regionSelect) {
        const options = regionSelect.querySelectorAll('option');
        options.forEach(option => {
            const regionCode = option.value;
            if (t(`regions.${regionCode}`)) {
                option.textContent = t(`regions.${regionCode}`);
            }
        });
    }
    
    // Mettre à jour les ambiances
    updateMoodCards();
}

// Fonction pour mettre à jour les cartes d'ambiance
function updateMoodCards() {
    const moodCards = document.querySelectorAll('.mood-card');
    moodCards.forEach(card => {
        const moodType = card.dataset.mood;
        const nameElement = card.querySelector('.mood-name');
        const descElement = card.querySelector('.mood-desc');
        
        if (nameElement && t(`moods.${moodType}.name`)) {
            nameElement.textContent = t(`moods.${moodType}.name`);
        }
        if (descElement && t(`moods.${moodType}.desc`)) {
            descElement.textContent = t(`moods.${moodType}.desc`);
        }
    });
}

// Fonction pour détecter la langue du navigateur
function detectBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.split('-')[0].toLowerCase();
    
    // Vérifier si la langue est supportée
    if (translations[langCode]) {
        return langCode;
    }
    
    return 'fr'; // Défaut
}

// Fonction pour détecter la région du navigateur
function detectBrowserRegion() {
    const browserLang = navigator.language || navigator.userLanguage;
    const regionCode = browserLang.split('-')[1];
    
    if (regionCode) {
        const upperRegion = regionCode.toUpperCase();
        const supportedRegions = ['FR', 'US', 'UK', 'ES', 'DE', 'CA'];
        if (supportedRegions.includes(upperRegion)) {
            return upperRegion;
        }
    }
    
    return 'FR'; // Défaut
}

// Initialisation des sélecteurs de langue et région
function initializeLanguageAndRegion() {
    // Auto-détecter la langue et région
    state.currentLanguage = detectBrowserLanguage();
    state.currentRegion = detectBrowserRegion();
    
    // Mettre à jour les sélecteurs
    const languageSelect = document.getElementById('languageSelect');
    const regionSelect = document.getElementById('regionSelect');
    
    if (languageSelect) {
        languageSelect.value = state.currentLanguage;
        languageSelect.addEventListener('change', (e) => {
            state.currentLanguage = e.target.value;
            updateTranslations();
        });
    }
    
    if (regionSelect) {
        regionSelect.value = state.currentRegion;
        regionSelect.addEventListener('change', (e) => {
            state.currentRegion = e.target.value;
        });
    }
    
    // Mettre à jour l'interface
    updateTranslations();
}

// Gestion de la sélection des plateformes
function initializePlatformSelection() {
    const platformCards = document.querySelectorAll('.platform-card');
    platformCards.forEach(card => {
        card.addEventListener('click', () => {
            // Supprimer la classe selected de toutes les cartes
            platformCards.forEach(c => c.classList.remove('selected'));
            
            // Ajouter la classe selected à la carte cliquée
            card.classList.add('selected');
            
            // Mettre à jour le state
            state.selectedPlatform = card.dataset.platform;
            
            // Afficher la section suivante
            const moodSection = document.getElementById('mood-section');
            if (moodSection) {
                moodSection.style.display = 'block';
                moodSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Gestion de la sélection des ambiances
function initializeMoodSelection() {
    const moodCards = document.querySelectorAll('.mood-card');
    moodCards.forEach(card => {
        card.addEventListener('click', () => {
            const mood = card.dataset.mood;
            
            if (state.selectedMoods.includes(mood)) {
                // Déselectionner
                state.selectedMoods = state.selectedMoods.filter(m => m !== mood);
                card.classList.remove('selected');
            } else if (state.selectedMoods.length < 3) {
                // Sélectionner (max 3)
                state.selectedMoods.push(mood);
                card.classList.add('selected');
            }
            
            // Afficher le bouton si au moins une ambiance est sélectionnée
            const generateBtn = document.getElementById('generate-btn');
            if (generateBtn) {
                if (state.selectedMoods.length > 0) {
                    generateBtn.style.display = 'block';
                    generateBtn.scrollIntoView({ behavior: 'smooth' });
                } else {
                    generateBtn.style.display = 'none';
                }
            }
        });
    });
}

// Génération des playlists
async function generatePlaylists() {
    if (!state.selectedPlatform || state.selectedMoods.length === 0) {
        alert('Veuillez sélectionner une plateforme et au moins une ambiance');
        return;
    }

    const generateBtn = document.getElementById('generate-btn');
    const resultsSection = document.getElementById('results-section');
    
    // État de chargement
    state.isLoading = true;
    generateBtn.textContent = t('loadingText');
    generateBtn.disabled = true;
    
    // Afficher la section résultats
    resultsSection.style.display = 'block';
    resultsSection.innerHTML = `
        <div class="loading">
            <div class="loading-spinner"></div>
            <p>${t('loadingText')}</p>
        </div>
    `;
    resultsSection.scrollIntoView({ behavior: 'smooth' });

    try {
        const response = await fetch('/api/playlists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                platform: state.selectedPlatform,
                moods: state.selectedMoods,
                language: state.currentLanguage,
                region: state.currentRegion
            })
        });

        const data = await response.json();

        if (data.success && data.playlists && data.playlists.length > 0) {
            state.playlists = data.playlists;
            displayPlaylists(data.playlists);
        } else {
            resultsSection.innerHTML = `
                <div class="no-results">
                    <h3>🎵 ${t('noPlaylistsText')}</h3>
                    <p>Essayez avec d'autres critères ou une autre plateforme</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Erreur:', error);
        resultsSection.innerHTML = `
            <div class="error">
                <h3>❌ ${t('errorText')}</h3>
                <p>Veuillez réessayer dans quelques instants</p>
            </div>
        `;
    } finally {
        // Remettre le bouton en état normal
        state.isLoading = false;
        generateBtn.textContent = t('generateBtn');
        generateBtn.disabled = false;
    }
}

// Affichage des playlists
function displayPlaylists(playlists) {
    const resultsSection = document.getElementById('results-section');
    
    const resultsHTML = `
        <div class="results-header">
            <h2>🎵 ${playlists.length} ${t('playlistsFoundText')}</h2>
        </div>
        <div class="playlists-grid">
            ${playlists.map(playlist => `
                <div class="playlist-card" data-mood="${playlist.mood}">
                    <div class="playlist-image">
                        <img src="${playlist.image}" alt="${playlist.name}" loading="lazy">
                        <div class="playlist-platform">
                            ${playlist.platform === 'spotify' ? 
                                '<img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/spotify.svg" alt="Spotify">' : 
                                '<img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/deezer.svg" alt="Deezer">'
                            }
                        </div>
                    </div>
                    <div class="playlist-info">
                        <h3 class="playlist-name">${playlist.name}</h3>
                        <p class="playlist-desc">${playlist.description || ''}</p>
                        <div class="playlist-meta">
                            <span class="track-count">${playlist.trackCount} ${t('trackText')}</span>
                            <span class="playlist-owner">${t('byText')} ${playlist.owner}</span>
                        </div>
                        <a href="${playlist.url}" target="_blank" rel="noopener" class="playlist-link">
                            Écouter sur ${playlist.platform === 'spotify' ? 'Spotify' : 'Deezer'}
                        </a>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    resultsSection.innerHTML = resultsHTML;
}

// Initialisation de l'application
function initializeApp() {
    // Initialiser la langue et région
    initializeLanguageAndRegion();
    
    // Initialiser les sélections
    initializePlatformSelection();
    initializeMoodSelection();
    
    // Event listener pour le bouton de génération
    const generateBtn = document.getElementById('generate-btn');
    if (generateBtn) {
        generateBtn.addEventListener('click', generatePlaylists);
    }
}

// Démarrer l'application quand le DOM est chargé
document.addEventListener('DOMContentLoaded', initializeApp);
