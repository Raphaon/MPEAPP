# Brethren Platform

Suite applicative pour la Mission du Plein Évangile du Cameroun (MPEC).

## Projets

- `backend/` : API Node.js (Express + TypeORM + Socket.io)
- `frontend/` : Interface web Angular 18
- `mobile/` : Application Ionic + Angular
- `docs/` : Schémas, scripts SQL, guides

## Démarrage rapide

1. Cloner le dépôt
2. Configurer les variables d'environnement (`backend/.env.example`)
3. Lancer la base PostgreSQL (voir `docker-compose.yml`)
4. Installer les dépendances et démarrer chaque projet

## Scripts utiles

```bash
# Backend
cd backend
npm install
npm run start:dev

# Frontend web
cd frontend
npm install
npm start

# Application mobile
cd mobile
npm install
npm start
```

## Documentation

Consulter le dossier `docs/` pour :
- `schema.sql` : structure PostgreSQL
- `ARCHITECTURE.md` : détails techniques
- `API.md` : endpoints REST
- `USER_GUIDE.md` : guide utilisateur
