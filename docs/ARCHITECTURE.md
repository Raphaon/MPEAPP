# Comprendre l'architecture Brethren (explication simple)

Ce projet est découpé en trois blocs qui travaillent ensemble. Imaginez-les comme trois équipes qui se parlent en permanence.

## 1. L'API (dossier `backend/`)
- Construite avec **Node.js, Express et TypeORM**.
- Elle garde le lien avec la base de données PostgreSQL.
- Elle applique les règles de sécurité : connexion avec JWT, rôles, journal des actions, limite des requêtes.
- Elle discute aussi en temps réel grâce à **Socket.io** pour le chat et les annonces instantanées.

## 2. Le site web (dossier `frontend/`)
- Créé avec **Angular 18** et **Angular Material**.
- C'est le tableau de bord pour les équipes dirigeantes : formulaires CRUD, filtres par région/district/assemblée, graphiques.
- Il appelle l'API via HTTPS pour afficher ou modifier les données.

## 3. L'application mobile (dossier `mobile/`)
- Basée sur **Ionic + Angular**.
- Pensée pour un usage rapide sur le terrain : consulter un membre, voir les annonces, suivre un évènement.

## Comment les blocs communiquent
1. Les utilisateurs se connectent sur le web ou le mobile.
2. Les interfaces envoient leurs demandes à l'API (`https://.../api`).
3. L'API vérifie les droits, lit/écrit dans PostgreSQL et renvoie une réponse.
4. Pour la messagerie en direct, le navigateur ou le téléphone ouvre une connexion Socket.io avec le serveur.

## La base de données PostgreSQL
- Les tables principales se trouvent dans `docs/schema.sql` (régions, districts, assemblées, membres, rôles, utilisateurs, messages, évènements...).
- Chaque table contient des colonnes de suivi (`created_at`, `updated_at`).
- TypeORM utilise les mêmes noms dans les entités pour rester synchronisé avec la base.

## Sécurité (les règles de base)
- Les mots de passe sont chiffrés avec **bcryptjs**.
- Chaque appel protégé doit envoyer un **token JWT** (récupéré via `/auth/login`).
- Un simple **rate limiter** évite les abus.
- Les rôles (Admin national, Superviseur régional, etc.) sont définis dans `backend/src/modules/roles/role.constants.ts`.

## Déploiement sans stress
- Chaque projet a son **Dockerfile**.
- `docker-compose.yml` lance PostgreSQL, l'API et le frontend d'un coup.
- Un workflow GitHub Actions (`.github/workflows/ci.yml`) vérifie que le code compile.

## Suite du travail
- Brancher les vraies cartes (Google Maps) et graphiques (Chart.js) sur le frontend.
- Ajouter les exports CSV/PDF côté web.
- Rédiger plus de tests automatisés (unitaires et end-to-end).
