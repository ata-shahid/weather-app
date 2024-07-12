# Wetter-app

## Projektbeschreibung

Die zu beschreibende Wetter-Applikation ermöglicht die Suche nach bestimmten Orten und präsentiert daraufhin mehrere Vorschläge.
Bei der Auswahl eines dieser Vorschläge werden die Wetterdaten in Form von Widgets für den jeweiligen Ort angezeigt.
Zudem besteht die Möglichkeit, Daten über einen Zeitraum von bis zu vier Tagen in der Zukunft zu ermitteln.
Des Weiteren besteht die Möglichkeit, durch Betätigen der Orts-Taste den Nutzer-Ort durch den Browser zu bestimmen und Wetterdaten abzurufen
Darüber hinaus wird bei Betätigen der Kartenseite die Karte im gleichen Ort angezeigt, in dem zuvor die Wetterdaten präsentiert wurden,
dann besteht die Möglichkeit, die fünf Wetterdateischichten zu aktivieren oder zu deaktivieren.
Schließlich ist ein Kontaktformular vorhanden,falls ein Nutzer eine Beschwerde oder ein Feedback hat.


## Testing

### Coverage

Im Rahmen der Unit-Tests Vitest und React Testing Library sind genutzt um die Überprüfung der Komponenten, Hooks und Utilities durchzuführen.

Für den E2E Tests wird Playwright verwendet, um die Benutzererfahrung zu testen, und der Forecast-Test ist gemacht, um die Mocked api antwort (forecastdata.json) zu testen .

### Ausführen
```
npm run dev
npm run test:e2e        => E2E

npm test                => Unit
```

## Aufsetzen des Projektes
```
npm install
npm run dev
```

## Infos über APIs

### OpenWeather Geocoding:
Die Geocoding-API für geografische Koordinaten (lat, lon) unter Verwendung des Ortsnamens (Name der Stadt oder des Gebiets) zu erhalten.

### OpenWeather 5 day weather forecast:
Die API für aktuelle Wetterdaten bietet Wetterinformationen für 5 Tage mit Daten alle 3 Stunden nach geografischen koordinanten.

### OpenStreetMap:

Die API stellt die Basic-Karte zur Verfügung, welche die Grundlage für die Darstellung der weiteren Wetterlagen bildet.

### OpenWeather Basic MAP 1.0:
Die API bietet viele Arten von Wetterkarten, einschließlich Niederschlag, Wolken, Luftdruck, Temperatur und Wind.


## Ordnerstruktur
```
├──src
|  └── components          => Wetter-basierte Komponenten und Tests
|      └── ContactForm     => KontaktsFormular Komponenten und Tests
|  └── hooks               => Custom-hooks und Tests
|  └── pages               => Seiten
|      └── api             => API-Routen (nicht genutzt)
|  └── styles              => globals für tailwind
|  └── tests               => E2E tests und json api mocked antwort
|  └── types               => static types für JavaScript
|  └── utils               => Nützliche Tools und Tests
```