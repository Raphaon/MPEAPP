# API Brethren

Base URL : `/api`

## Authentification

### POST /auth/register
- Crée un compte utilisateur en attente d'activation.

### POST /auth/login
- Authentifie l'utilisateur et renvoie un JWT.

## Gestion territoriale

### GET /regions
- Liste paginée des régions.

### POST /regions
- Crée une région (Admin national).

### GET /districts
- Liste paginée des districts, filtrable par région.

### GET /assemblies
- Liste paginée des assemblées, filtrable par district.

## Membres

### GET /members
- Liste paginée des membres avec filtres région/district/assemblée.

### POST /members
- Création d'un membre.

### POST /members/:id/transfer
- Transfert d'un membre vers une nouvelle assemblée.

## Ministères

CRUD complet via `/ministries`.

## Évènements

Routes `/events` pour créer/lister/mettre à jour des évènements.

## Messagerie

`/messages` pour récupérer et envoyer des messages (chat/circulaires/annonces).

## Statistiques

- `/statistics/membership`
- `/statistics/regional`

## Géolocalisation

- `/geolocation/assemblies`
- `/geolocation/dead-zones`

Toutes les routes (hors `/auth`) exigent un JWT valide et respectent les règles RBAC définies dans `role.constants.ts`.
