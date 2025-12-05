# Cute Weather App

Cute Weather App est une application mobile développée dans le cadre des modules 01, 02 et 03 de la Piscine Mobile 42.  
Elle permet d’afficher la météo actuelle, horaire et hebdomadaire, tout en intégrant la recherche de villes, la géolocalisation, la gestion d’erreurs et un design complet.

---

## Description

L’application repose sur trois grands axes issus des exercices des modules :

### Module 01 — Structure & Navigation
- Barre supérieure (TopBar) avec : champ de recherche et bouton de géolocalisation  
- BottomBar avec 3 onglets : **Current**, **Today**, **Weekly**.  
- Navigation fluide : clic ou swipe.  
- Comportement réactif sur tous types d’écrans.

### Module 02 — API & Data Management
- Utilisation du **GPS du device** pour récupérer les coordonnées.  
- Rechercher de ville avec liste de suggestions dynamique lors de la saisie utilisateur.  
- Conversion coordonnées ⇄ ville via l’API **Here Geocoding & Search**.  
- Récupération météo via **Open-Meteo** (météo actuelle, horaire, hebdomadaire).  
- Gestion des cas d’erreur :
  - ville introuvable
  - API non accessible  

### Module 03 — Design & UI
- Design complet pour chaque onglet.  
- Affichage clair, lisible, structuré, inspiré des exemples fournis dans le sujet.  
- Graphiques, icônes météo, backgrounds fixes, animations légères.  

---

## Stack technique

- **Langage** : TypeScript (`typescript` ^5.3.3)
- **Framework mobile** : React Native (`react-native` 0.76.5)
- **Environnement** : Expo (`expo` 52.0.18)
- **APIs utilisées** :
- **APIs utilisées** :
  - **[Open-Meteo](https://open-meteo.com/en/docs)** · météo actuelle, horaire et hebdomadaire
  - **[Here](https://www.here.com) Geocoding & Search API** · géocodage et recherche de villes  
- **Modules clés** :
  - Expo Location (GPS)
  - Hooks personnalisés
  - Graphiques (bibliothèque Expo + custom)
- **Styling** : StyleSheet React Native

---

## Structure du projet

```
cute_weather_app/
├── app/
│   ├── components/                       # Composants réutilisables
│   │   ├── Header.tsx                    # Header (input de rechercher et bouton de geolocalistion)
│   │   ├── Loader.tsx                    # Composant de chargement animé
│   │   ├── NavBar.tsx                    # Barre de navigation (Current / Today / Weekly)
│   │   ├── TodayHourCard.tsx             # Carte des données météo par heure
│   │   └── WeeklyDayCard.tsx             # Carte météo pour un jour de la semaine
│   │
│   ├── index.tsx                         # Point d'entrée Expo Router
│   │
│   ├── navigation/                       # Gestion de la navigation
│   │   └── _layout.tsx                   # Layout global + Bottom Tabs
│   │
│   ├── screens/                          # Écrans principaux (onglets)
│   │   ├── CurrentTab.tsx                # Météo actuelle (température, icône, vent…)
│   │   ├── TodayTab.tsx                  # Météo détaillée du jour (courbe + liste)
│   │   └── WeeklyTab.tsx                 # Prévisions 7 jours (graphique min/max + liste)
│   │
│   ├── types/                            # Définition et typage TypeScript
│   │   ├── interface.tsx                
│   │   └── type.tsx                      
│   │
│   └── utils/                            # Fonftions utils au projet
│       ├── currentWeatherData.ts         # Récupération et formatage de la météo actuelle
│       ├── findDataCity.ts               # Recherche de villes via API HERE
│       ├── getCurrentLocation.ts         # Lecture du GPS et coordonnées
│       ├── getLocationPermission.ts      # Gestion des permissions de localisation
│       ├── todayWeatherData.ts           # Formatage des données météo du jour
│       ├── weatherMapper.ts              # Mapping icônes / conditions météo
│       └── weeklyWeatherData.ts          # Formatage des données météo de la semaine
```

---

## Installation

### 1. Cloner le projet
```bash
git clone git@github.com:amelmnd/cute-weather-app.git
cd cute-weather-app
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configurer les variables d’environnement

Créer un fichier `.env` :

```env
EXPO_PUBLIC_API_HERE=YOUR_HERE_API_KEY
```

- Cette clé permet d’utiliser le **geocoding HERE** pour retrouver une ville depuis son nom ou coordonnée.
- Open-Meteo ne nécessite **aucune clé API**.

### 4. Lancer l'application
```bash
npm start
```

---

## Aperçu du rendu

_rendu à venir_

---

## Licence

Projet réalisé dans le cadre de la Piscine Mobile 42.