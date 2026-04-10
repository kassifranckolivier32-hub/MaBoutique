# Adorachou Boutiqique

Ce projet est un site vitrine statique en HTML/CSS/JS pour la boutique Adorachou Boutiqique.

## Héberger le site

### Pré-requis : installer Git
1. Télécharge Git depuis https://git-scm.com/download/win
2. Installe-le en gardant les options par défaut.
3. Après l'installation, ouvre PowerShell et vérifie avec :
   ```powershell
   git --version
   ```

### Option 1 : GitHub Pages
1. Crée un dépôt sur GitHub.
2. Dans ton dossier `MaBoutique`, initialise un dépôt Git :
   ```powershell
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/TON_COMPTE/TON_REPO.git
   git push -u origin main
   ```
3. Sur GitHub, va dans `Settings > Pages` et choisis la branche `main` / dossier `/ (root)`.
4. Ton site sera publié quelques minutes après.

### Option 2 : Netlify
1. Va sur https://app.netlify.com/ et crée un compte.
2. Choisis `New site from Git` puis connecte ton dépôt GitHub.
3. Sélectionne la branche `main` et laisse les paramètres par défaut.
4. Netlify déploiera automatiquement ton site.

### Option 3 : Vercel
1. Va sur https://vercel.com/ et crée un compte.
2. Import ton projet depuis GitHub.
3. Sélectionne `Framework Preset` : `Other` si nécessaire.
4. Vercel publiera le site automatiquement.

### Option rapide de test local
Ouvre un serveur local avec Python :
```powershell
python -m http.server 8000
```
Puis visite `http://localhost:8000`.

## Remarque
Je ne peux pas héberger le site directement depuis cet environnement, mais je peux t’aider à préparer le dépôt Git ou le déploiement sur GitHub/Netlify/Vercel.