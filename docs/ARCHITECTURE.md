# Architecture Brethren

## Vue d'ensemble

L'écosystème Brethren est composé de trois projets principaux :

1. **Backend API (Node.js + Express + TypeORM)** – fournit les services REST, l'authentification JWT, la gestion des rôles et un serveur Socket.io pour la messagerie en temps réel.
2. **Frontend Web (Angular 18 + Angular Material)** – tableau de bord administratif avec formulaires, statistiques et filtres hiérarchiques.
3. **Application Mobile (Ionic + Angular)** – interface simplifiée pour les pasteurs et responsables sur le terrain.

## Modules fonctionnels

- Gestion des régions, districts et assemblées avec hiérarchies et statistiques.
- Gestion des membres, transferts d'assemblées et exports (à implémenter côté client).
- Gestion des ministères et des responsables.
- Communication interne (chat, annonces, circulaires) via API + Socket.io.
- Géolocalisation des assemblées (Google Maps à intégrer sur le front).
- Statistiques consolidées (genre, statut, par région/district).
- Authentification JWT, RBAC par rôle, audit des actions.

## Base de données

Le script `schema.sql` décrit les tables principales avec relations et colonnes temporelles. Les entités TypeORM reflètent la même structure pour permettre la synchronisation avec PostgreSQL.

## Déploiement

- Conteneurisation via Docker (voir `Dockerfile` et `docker-compose.yml`).
- CI/CD GitHub Actions (voir `.github/workflows/ci.yml`).
- Secrets à fournir : variables d'environnement backend (BDD + JWT), clés API Google Maps côté front.

## Sécurité

- Hash des mots de passe avec `bcryptjs`.
- JWT signé avec secret configurable (`JWT_SECRET`).
- Limiteur de débit simple au niveau Express.
- Vérification des rôles pour chaque route sensible.

## Tâches complémentaires

- Intégration du module d'export CSV/PDF côté front.
- Branchements effectifs sur Google Maps/Chart.js.
- Ajout de tests unitaires et e2e.
