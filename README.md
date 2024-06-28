## Projektbeschreibung

## Testing

-Coverage
In den Unit-Tests, testen wir alle Utils/Helper sowie den Gesamnten Pokemon Context.

-Ausführen
E2E  => npx playwright test
Unit => npm test

## Aufsetzen des Projektes

npm install
npm run dev

## Infos über API

# OpenWeather
1-Geocoding API:
Die Geocoding-API für geografische Koordinaten (lat, lon) unter Verwendung des Ortsnamens (Name der Stadt oder des Gebiets) zu erhalten.

2-Forecast weather data:
Die API für aktuelle Wetterdaten bietet Wetterinformationen für 5 Tage mit Daten alle 3 Stunden nach geografischen .

## Third Party Packages

npm install react-icons
npm install date-fns

## Ordnerstruktur

src
└── components
└── pages               => Seiten
    └── api             => API-Routen
└── test                => Unit Tests
	└── components    
    └── utils
└── utils               => Nützliche Helper und Tools, unter anderem Session-Methoden