# zh-velo-pumpi

1. [Overview](#overview)
2. [Installation](#installation)

## Overview
Finde öffentliche Zürcher Velopumpstation in einer einfach zu bedienenden App.

Basierend auf:
 - [Expo](https://exp.host/@booooza/zhvelopumpi)
 - [React Native](https://facebook.github.io/react-native/)
 - [React Navigation](https://github.com/react-navigation/react-navigation)
 - [React Native Maps Directions](https://github.com/bramus/react-native-maps-directions)
 - [Mapbox/polyline](https://github.com/mapbox/polyline)
 - [Swiss Open Data](https://opendata.swiss/de/dataset/velopumpstationen-in-der-stadt-zurich1)
 - [Google Directions API](https://developers.google.com/maps/documentation/directions/)
 - "Bicycle Pump" Icon by [Nicolas Molès](https://thenounproject.com/nicolas.moles/) from the [Noun Project](https://thenounproject.com)

![Alt text](/app.png?raw=true "App Screenshot")

## Installation
### Dependencies
Go to the project root and install all dependencies:
```bash
npm install
```
### Environment variables

Copy the example environment and modify it according to your needs:

```bash
cp .env.example .env
```
### Expo App Configuration
Copy the example configuration and modify it according to your needs:
```bash
cp .app-example.json .app.json
```

## Run the App
Install the Expo Client mobile app and run:
```bash
exp start
```

## Build the App
Start the build:
```bash
exp build:android
exp build:ios
```
