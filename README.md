# KeepMind

## Déploiement de l'application
npm i
npm run dev

## Fonctionnalité du projet
- Création d'un thème 
- Création de carte
- Suppression de carte
- Révision d'un thème
    - Recto/Verso de la carte
- Passage des cartes au niveau suivant si reussite et niveau 1 si échec

## Organisation
L'application est codé en typescript (plus simple au niveau du typage). Elle utilise des interfaces pour définir les différent élément de l'appli : Thème, révision, carte

Les données par défaut sont stockées dans un json qui est par la suite stoqué dans le localstorage
Le localstorage est composé des trois clées, une pour les cartes, une pour les thèmes et la dernière pour les révisions
Cahque dossier dans le dossier "Store" contient un Json (valeur par défaut) et un store qui lui est associér

Les views sont rangées dans des dossiers. 
Les icons de type svg ont été ajouter dans le dossier component/icons et non dans assets