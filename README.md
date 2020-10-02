# Spuren der Vergangenheit: OGT Prototype

## Beschreibung

Prototype für https://www.tib.eu/de/service/aktuelles/detail/spuren-der-vergangenheit-verbrechen-der-gestapo-digital-sichtbar-machen

## Setup

```bash
git clone https://github.com/naustica/SdVer.git
```

```bash
cd SdVer && npm install
```

```bash
npm run dev
```

## Problemfelder

### Bilder aus Wikidata

- nur Dateiname in Wikidata (P18 Attribut)
- um Bilder (aus Wikimedia Commons) in einer Weboberfläche darzustellen, muss ein MD5-Hash aus dem Dateinamen berechnet werden
- Siehe: https://stackoverflow.com/a/34402875/12580727

### Eindeutige Kennzeichnung von Denkmälern

- Wikidata bietet kein passendes Attribut um spezielle Denkmäler für dieses Projekt zu selektieren

### Items in Wikidata sehr unterschiedlich beschrieben

- zum Teil fehlen für Denkmäler in Wikidata Koordinaten, Bilder oder weiterführende Informationen.
- Items teils sehr unterschiedlich stark beschrieben.

### Denkmalatlas Niedersachsen

- keine offene Schnittstelle
- operiert über ADABweb
