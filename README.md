# 🎄 Christmas Playlist Generator

Générateur de playlists de Noël utilisant les APIs Spotify et Deezer.

## 🚀 Déploiement Vercel

1. **Installer Vercel CLI** (si pas déjà fait)
```bash
npm i -g vercel
```

2. **Connecter votre repo GitHub**
```bash
vercel --prod
```

3. **Ajouter les variables d'environnement dans Vercel**

Dans votre dashboard Vercel, ajoutez :
- `SPOTIFY_CLIENT_ID`: 758c3add1c884a27a1991eda696cc391
- `SPOTIFY_CLIENT_SECRET`: fa056bf2974a48449ff605711221d42f

4. **Redéployer**
```bash
vercel --prod
```

## 📊 Configuration AdSense

Dans `public/index.html`, remplacez :
```html
data-ad-client="ca-pub-XXXXXXXXXXXXXXXXXX"
```

Par votre véritable Publisher ID AdSense.

## ✨ Fonctionnalités

- ✅ Interface sans inscription
- 🎵 Support Spotify & Deezer  
- 🎭 8 ambiances de Noël
- 📱 100% responsive
- 💰 Prêt pour AdSense
- ⚡ Cache intelligent

## 🛠️ Développement local

```bash
npm install
npm start
```

Ouvrez http://localhost:3000

---

🎄 **Joyeux Noël 2024!** 🎁
