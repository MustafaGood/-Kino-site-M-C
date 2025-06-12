# Kino-site: Komplett Sprint Backlog (Sprint 1-6)

## Projektöversikt
**Mål**: Utveckla en komplett kinobiografshemsida från Node.js till Next.js refaktorering  
**Metod**: Scrum-inspirerad agil utveckling  
**Teamstorlek**: 2 utvecklare  
**Sprint-längd**: 1 vecka per sprint  

---

## Sprint 1 (Vecka 1): Foundation
**Sprint Mål**: Etablera projektgrund och grundläggande funktionalitet  
**Kapacitet**: 2 utvecklare × 5 dagar = 10 utvecklardagar

### Sprint Backlog:
**Projektsetup (3 dagar)**
- [ ] Repository struktur enligt projektdokument
- [ ] Package.json konfiguration
- [ ] Express server grundkonfiguration
- [ ] MongoDB connection setup
- [ ] Environment variables (.env)

**Grundläggande UI (2 dagar)**
- [ ] EJS templates setup
- [ ] Bootstrap integration
- [ ] Grundlayout (header, footer, navigation)
- [ ] Responsive design grund

**Användarautentisering (4 dagar)**
- [ ] User model (MongoDB/Mongoose)
- [ ] Registreringsformulär
- [ ] Login/logout funktionalitet
- [ ] Sessionshantering
- [ ] Middleware för autentisering

**DevOps Setup (1 dag)**
- [ ] ESLint + Prettier konfiguration
- [ ] Jest testing setup
- [ ] Utvecklingsscripts (npm run dev)

### Sprint 1 Acceptanskriterier:
- Applikationen kan startas lokalt
- Användare kan registrera sig och logga in
- Grundläggande navigation fungerar
- Alla tester passerar
- Code coverage >70%

---

## Sprint 2 (Vecka 2): Filmdatabas
**Sprint Mål**: Implementera filmhantering och visning  
**Kapacitet**: 2 utvecklare × 5 dagar = 10 utvecklardagar

### Sprint Backlog:
**Film Model & Database (2 dagar)**
- [ ] Movie model (MongoDB/Mongoose)
- [ ] Film schema med validering
- [ ] Seed data för testfilmer
- [ ] Bilduppladdning för filmaffischer

**Filmvisning (3 dagar)**
- [ ] Filmlistning sida (/filmer)
- [ ] Filmdetaljer sida (/filmer/:id)
- [ ] Filmkort komponenter
- [ ] Responsiv filmgalleri

**Sök & Filtrera (2 dagar)**
- [ ] Grundläggande sökfunktion
- [ ] Genrefiltrering
- [ ] Sorteringsalternativ
- [ ] Sökresultat presentation

**Admin Panel Grund (3 dagar)**
- [ ] Admin middleware och routes
- [ ] Film CRUD operationer
- [ ] Admin filmhantering interface
- [ ] Säkerhetskontroller för admin

### Sprint 2 Acceptanskriterier:
- Filmkatalog visas med poster och information
- Sök- och filtreringsfunktioner fungerar
- Admin kann lägga till/redigera/ta bort filmer
- Alla nya funktioner är testade

---

## Sprint 3 (Vecka 3): Visningar & Tider
**Sprint Mål**: Implementera visningssystem och tidshantering  
**Kapacitet**: 2 utvecklare × 5 dagar = 10 utvecklardagar

### Sprint Backlog:
**Showtime Model (2 dagar)**
- [ ] Showtime model (MongoDB/Mongoose)
- [ ] Relationskoppling till filmer
- [ ] Tid och datum hantering
- [ ] Salong/teater information

**Visningsschema (3 dagar)**
- [ ] Visning av tillgängliga tider
- [ ] Kalendervy för visningar
- [ ] Filtrering per datum/tid
- [ ] Visning av lediga platser

**Admin Visningshantering (3 dagar)**
- [ ] Skapa nya visningar
- [ ] Redigera befintliga visningar
- [ ] Ta bort visningar
- [ ] Bulk operationer för visningar

**Integration & Optimering (2 dagar)**
- [ ] Koppling filmer ↔ visningar
- [ ] Prestanda optimering
- [ ] Caching av visningsdata
- [ ] Error handling förbättringar

### Sprint 3 Acceptanskriterier:
- Visningar kan skapas och hanteras av admin
- Användare kan se tillgängliga visningar per film
- Visningssystem integrerat med filmkatalog
- Ingen prestandaförsämring på filmsidor

---

## Sprint 4 (Vecka 4): Bokningssystem
**Sprint Mål**: Implementera komplett bokningssystem med platshantering  
**Kapacitet**: 2 utvecklare × 5 dagar = 10 utvecklardagar

### Sprint Backlog:
**Booking Model (2 dagar)**
- [ ] Booking model (MongoDB/Mongoose)
- [ ] Relationskoppling till användare och visningar
- [ ] Platshantering schema
- [ ] Bokningsstatus hantering

**Platsvisualisering (3 dagar)**
- [ ] Interaktiv sittplatsplan
- [ ] Lediga/bokade platser visualisering
- [ ] Platsval funktionalitet
- [ ] Responsive design för mobil

**Bokningsprocess (3 dagar)**
- [ ] Bokningsformulär
- [ ] Betalningssimulering
- [ ] Bokningsbekräftelse
- [ ] Email bekräftelse (simulerad)

**Bokningshantering (2 dagar)**
- [ ] Mina bokningar sida
- [ ] Avbokning funktionalitet
- [ ] Bokningsdetaljer vy
- [ ] Bokningshistorik

### Sprint 4 Acceptanskriterier:
- Inloggade användare kan boka platser
- Interaktiv sittplatsplan fungerar
- Bokningar syns i användarens profil
- Avbokning fungerar (fram till 2h före visning)

---

## Sprint 5 (Vecka 5): Recensionssystem
**Sprint Mål**: Implementera recensioner och betygsättning  
**Kapacitet**: 2 utvecklare × 5 dagar = 10 utvecklardagar

### Sprint Backlog:
**Review Model (2 dagar)**
- [ ] Review model (MongoDB/Mongoose)
- [ ] Relationskoppling till användare och filmer
- [ ] Betygsättning (1-5 stjärnor)
- [ ] Validering (en recension per användare/film)

**Recensionsystem (3 dagar)**
- [ ] Recensionsformulär
- [ ] Recensionsvisning på filmsidor
- [ ] Stjärnbetyg komponenter
- [ ] Recensionsmoderation

**Betygsberäkning (2 dagar)**
- [ ] Genomsnittlig betygsberäkning
- [ ] Betygsstatistik
- [ ] Sortering av recensioner
- [ ] Betygsfördelning visualisering

**Användarrecensioner (3 dagar)**
- [ ] Mina recensioner sida
- [ ] Redigera egna recensioner
- [ ] Ta bort egna recensioner
- [ ] Användarprofil med recensioner

### Sprint 5 Acceptanskriterier:
- Inloggade användare kan skriva recensioner
- Betyg visas på filmsidor
- Genomsnittlig betyg beräknas korrekt
- Användare kan hantera sina recensioner

---

## Sprint 6 (Vecka 6): Polering & Förbättringar
**Sprint Mål**: Kvalitetssäkring, polering och förberedelse för refaktorering  
**Kapacitet**: 2 utvecklare × 5 dagar = 10 utvecklardagar

### Sprint Backlog:
**Komplett Testning (3 dagar)**
- [ ] Enhetstester för alla modeller
- [ ] Integrationstester för API endpoints
- [ ] E2E tester för användarflöden
- [ ] Säkerhetstester

**UI/UX Polering (2 dagar)**
- [ ] Förbättrad användarupplevelse
- [ ] Styling refinement
- [ ] Responsiv design optimering
- [ ] Accessibility förbättringar

**Prestanda & Säkerhet (2 dagar)**
- [ ] Databasindexering
- [ ] Caching implementation
- [ ] Säkerhetsaudit
- [ ] Prestandaoptimering

**Dokumentation (2 dagar)**
- [ ] API dokumentation komplettering
- [ ] Användarmanual
- [ ] Teknisk dokumentation
- [ ] Refaktoreringsplan finalisering

**Refaktorering Förberedelse (1 dag)**
- [ ] Kod refaktorering för bättre struktur
- [ ] Komponenter separation
- [ ] API endpoints dokumentation
- [ ] Data migration plan

### Sprint 6 Acceptanskriterier:
- Alla tester passerar (>80% coverage)
- Applikationen är produktionsredo
- Dokumentation är komplett
- Refaktoreringsplan är förberedd

---

## Övergripande Mål per Sprint

### Sprint 1-2: **Grundläggande funktionalitet**
- Användare kan registrera sig och logga in
- Filmkatalog är tillgänglig och sökbar

### Sprint 3-4: **Kärnfunktioner**
- Bokningssystem fungerar komplett
- Visningar kan hanteras av admin

### Sprint 5-6: **Komplettering & kvalitet**
- Recensionssystem adderar värde
- Applikationen är kvalitetssäkrad

## Teknisk Skuld & Refaktorering

### Kontinuerlig refaktorering:
- Kod kvalitet maintainance varje sprint
- Prestanda monitoring
- Säkerhetsuppdateringar
- Testning expansion

### Förberedelse för Next.js:
- Komponenterisering av UI
- API-first development
- State management dokumentation
- Database schema stabilisering

---

## Riskhantering per Sprint

### Sprint 1: Setup komplexitet
- **Risk**: MongoDB och session setup
- **Mitigation**: Detaljerad dokumentation, pair programming

### Sprint 2: Datamodellering
- **Risk**: Komplex film-data struktur
- **Mitigation**: Enkel start, iterativ förbättring

### Sprint 3: Tidshantering
- **Risk**: Datum/tid logik komplexitet
- **Mitigation**: Använd beprövade bibliotek (moment.js)

### Sprint 4: Bokningslogik
- **Risk**: Concurrent booking conflicts
- **Mitigation**: Database constraints, proper locking

### Sprint 5: Användarinnehåll
- **Risk**: Moderation och spam
- **Mitigation**: Grundläggande validering, admin tools

### Sprint 6: Kvalitet & tid
- **Risk**: Tidsbrist för polish
- **Mitigation**: Prioritera kärnfunktionalitet

---

## Success Metrics

### Tekniska Mål:
- [ ] 100% av plannerad funktionalitet implementerad
- [ ] >80% test coverage
- [ ] <2s genomsnittlig sideloadningstid
- [ ] Inga kritiska säkerhetsbrister

### Användarupplevelse:
- [ ] Intuitiv navigation
- [ ] Responsiv design på alla enheter
- [ ] Snabba svar från applikationen
- [ ] Tydliga felmeddelanden

### Projektmål:
- [ ] Leverans inom tidsram (6 veckor)
- [ ] Alla user stories implementerade
- [ ] Dokumentation komplett
- [ ] Refaktorering-redo

---

**Skapad**: Juni 2025  
**Team**: Christoffer & Mustafa  
**Projekt**: Kino-site M-C  
**Nästa fas**: Next.js refaktorering
