# Clone Netflix - Projet Portfolio

Un clone de Netflix créé avec Next.js, Tailwind CSS et l'API TMDB pour mon portfolio.

## Configuration

### Prérequis

- Node.js 18+ et npm/yarn/pnpm
- Compte TMDB et clé API

### Installation

1. Cloner ce dépôt
\`\`\`bash
git clone https://github.com/votre-username/netflix-clone.git
cd netflix-clone
\`\`\`

2. Installer les dépendances
\`\`\`bash
npm install
# ou
yarn
# ou
pnpm install
\`\`\`

3. Configurer les variables d'environnement
   - Copier le fichier `.env.example` en `.env.local`
   - Ajouter votre clé API TMDB dans le fichier `.env.local`

\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Lancer le serveur de développement
\`\`\`bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
\`\`\`

5. Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur

## Fonctionnalités

- Interface utilisateur similaire à Netflix
- Récupération de vrais films et séries via l'API TMDB
- Affichage d'un film en vedette aléatoire
- Rangées de films par catégorie
- Pages de détails pour chaque film/série
- Lecture de bandes-annonces YouTube
- Design responsive

## Sécurité

⚠️ **Important** : Ne jamais commiter le fichier `.env.local` contenant votre clé API TMDB. Ce fichier est déjà ajouté au `.gitignore`.

## Technologies utilisées

- Next.js 14+
- React 18+
- Tailwind CSS
- API TMDB
- TypeScript
- shadcn/ui

## Licence

Ce projet est un projet de portfolio et n'est pas affilié à Netflix. Il est créé à des fins éducatives et de démonstration uniquement.
