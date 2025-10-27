# Brethren Platform

Suite applicative pour la Mission du Plein Évangile du Cameroun (MPEC).

## Ce qu'il y a dans ce dépôt
- `backend/` : API Node.js (Express + TypeORM + Socket.io).
- `frontend/` : site web Angular 18 (tableau de bord).
- `mobile/` : application mobile Ionic + Angular.
- `docs/` : guides simples, schémas et script SQL.

## Démarrage rapide (pour un débutant)
1. **Installer les outils** : Node.js 20+, Docker (facultatif), Git.
2. **Cloner** le dépôt et se placer dedans :
   ```bash
   git clone <url>
   cd MPEAPP
   ```
3. **Configurer la base de données** :
   - Copier `backend/.env.example` vers `backend/.env` et adapter si nécessaire.
   - Si vous avez Docker :
     ```bash
     docker compose up -d
     ```
   - Sinon, installez PostgreSQL manuellement et créez une base `brethren`.
4. **Installer et lancer l'API** :
   ```bash
   cd backend
   npm install
   npm run start:dev
   ```
5. **Lancer le site web** (nouveau terminal) :
   ```bash
   cd frontend
   npm install
   npm start
   ```
6. **Lancer l'application mobile** (optionnel) :
   ```bash
   cd mobile
   npm install
   npm start
   ```

Le tableau de bord est ensuite accessible sur http://localhost:4200 et l'API sur http://localhost:4000.

## Aller plus loin
- Suivez les explications pas à pas dans `docs/ARCHITECTURE.md`, `docs/API.md` et `docs/USER_GUIDE.md`.
- Le script SQL complet se trouve dans `docs/schema.sql`.
- Déploiement automatisé : voir `docker-compose.yml` et `.github/workflows/ci.yml`.
