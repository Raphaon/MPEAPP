# Mémo des routes API (langage simple)

Toutes les adresses ci-dessous sont accessibles sous `https://votre-domaine/api`.
Sauf mention contraire, il faut envoyer le jeton JWT dans l'entête `Authorization: Bearer <token>`.

| Module | Verbe + chemin | Ce que ça fait | Qui peut l'utiliser ? |
| ------ | -------------- | -------------- | ---------------------- |
| Auth | `POST /auth/register` | Demander la création d'un compte (en attente de validation). | Un responsable qui ajoute un nouvel utilisateur. |
| Auth | `POST /auth/login` | Se connecter et recevoir un jeton JWT. | Tout utilisateur actif. |
| Régions | `GET /regions` | Voir la liste des régions (paginée). | Rôles avec droit de lecture. |
| Régions | `POST /regions` | Ajouter une région. | Admin national. |
| Districts | `GET /districts?regionId=<id>` | Lister les districts (optionnellement filtrés par région). | Rôles avec droit de lecture. |
| Districts | `POST /districts` | Créer un district. | Admin national ou superviseur régional. |
| Assemblées | `GET /assemblies?districtId=<id>` | Voir les assemblées (filtre possible par district). | Rôles avec droit de lecture. |
| Assemblées | `POST /assemblies` | Ajouter une assemblée. | Chef de district ou supérieur. |
| Membres | `GET /members` | Lister les membres avec filtres (région/district/assemblée). | Rôles autorisés. |
| Membres | `POST /members` | Créer un nouveau membre. | Chef de district, pasteur, admin. |
| Membres | `POST /members/:id/transfer` | Changer l'assemblée d'un membre. | Rôles avec droit de transfert. |
| Ministères | `GET /ministries` | Voir les ministères. | Rôles autorisés. |
| Ministères | `POST /ministries` | Ajouter un ministère. | Admin ou leader concerné. |
| Évènements | `GET /events` | Voir les évènements. | Rôles autorisés. |
| Évènements | `POST /events` | Créer ou mettre à jour un évènement. | Rôles autorisés. |
| Messagerie | `GET /messages` | Voir les conversations (annonces, chat, circulaires). | Utilisateur connecté. |
| Messagerie | `POST /messages` | Envoyer un message. | Utilisateur connecté. |
| Statistiques | `GET /statistics/membership` | Obtenir les chiffres par genre/statut. | Rôles autorisés. |
| Statistiques | `GET /statistics/regional` | Résumé par région (districts, assemblées, membres). | Rôles autorisés. |
| Géolocalisation | `GET /geolocation/assemblies` | Obtenir les assemblées avec coordonnées. | Rôles autorisés. |
| Géolocalisation | `GET /geolocation/dead-zones` | Voir les "zones mortes" (assemblées sans coordonnées). | Rôles autorisés. |

> 💡 Astuce : pour tester rapidement, utilisez un outil comme Postman ou Insomnia.
> Commencez par `POST /auth/login`, copiez le token reçu, puis ajoutez-le dans vos autres requêtes.
