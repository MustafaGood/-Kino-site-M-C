## Projektöversikt

Kino-site är en komplett webblösning för biografer som tillhandahåller:

- **Filmvisning** - Utforska aktuella filmer med detaljerad information
- **Platsbokning** - Boka biografplatser för önskade visningar  
- **Användarkonton** - Registrering, inloggning och profilhantering
- **Recensionssystem** - Skriv och läs filmrecensioner
- **Administratörspanel** - Hantera filmer, visningar och bokningar

## Teknisk Stack

### Fas 1: Node.js Implementation
- **Backend**: Node.js + Express.js
- **Frontend**: EJS templates + vanilla JavaScript
- **Databas**: MongoDB + Mongoose
- **Autentisering**: Express-session + bcrypt
- **Styling**: CSS3 + Bootstrap
- **Testning**: Jest

### Fas 2: Next.js Refaktorering
- **Framework**: Next.js (React)
- **API**: Next.js API routes
- **Styling**: CSS Modules
- **Databas**: MongoDB (bibehålls från fas 1)

## Snabbstart

### Förutsättningar
- Node.js (v16 eller senare)
- MongoDB (lokal installation eller MongoDB Atlas)
- Git

### Installation

```powershell
# Klona repository
git clone [repository-url]
cd kino-site-M-C

# Installera dependencies
npm install

# Konfigurera miljövariabler
cp .env.example .env
# Redigera .env med dina databas-inställningar

# Starta utvecklingsserver
npm run dev
```

### Tillgängliga Kommandon

```powershell
npm run dev          # Startar utvecklingsserver
npm run build        # Bygger applikationen för produktion
npm start           # Startar produktionsserver
npm test            # Kör alla tester
npm run test:watch  # Kör tester i watch-mode
npm run lint        # Kontrollerar kodkvalitet
```

## Projektstruktur

```
kino-site-M-C/
├── docs/                    # Projektdokumentation
├── src/                     # Källkod
│   ├── controllers/         # Route handlers och business logic
│   ├── models/             # MongoDB modeller
│   ├── routes/             # Express routes
│   ├── middleware/         # Custom middleware
│   ├── utils/              # Hjälpfunktioner
│   └── config/             # Konfigurationsfiler
├── views/                  # EJS templates
│   ├── layouts/            # Layout templates
│   ├── pages/              # Sidspecifika templates
│   └── partials/           # Återanvändbara komponenter
├── public/                 # Statiska filer (CSS, JS, bilder)
├── tests/                  # Test suites
└── package.json           # Projekt konfiguration
```

## Dokumentation

Omfattande projektdokumentation finns i [`docs/`](./docs/) mappen:

### 📋 [Projektledning](./docs/PROJEKTLEDNING.md)
- Agil projektmetod och Sprint planning
- Git workflow och branching strategy
- Kvalitetskriterier och Definition of Done
- Refaktoreringsplan från Node.js till Next.js
- Risk management och kommunikation

### 🔌 [API Design](./docs/API_DESIGN.md)
- RESTful API endpoints specifikation
- Request/Response format med exempel
- Autentisering och säkerhetsimplementation
- Felhantering och statuskoder
- Prestanda och caching strategier

### 🧪 [Testningsstrategi](./docs/TESTNINGSSTRATEGI.md)
- Testpyramid (Unit/Integration/E2E)
- Test frameworks och verktyg
- Continuous Integration setup
- Regression testing för refaktorering
- Quality gates och coverage mål

## Funktioner

### Kärnfunktionalitet
- [x] Användarregistrering och autentisering
- [x] Filmkatalog med sök- och filtreringsfunktioner
- [x] Platsbokning med interaktiv sittplatsplan
- [x] Recensions- och betygsystem
- [x] Administratörspanel för innehållshantering

### Kommande Funktioner (Next.js Fas)
- [x] Server-side rendering för bättre SEO
- [x] React-baserad interaktiv UI
- [x] Optimerad prestanda med Next.js
- [x] Förbättrad användarupplevelse

## Utveckling

### Git Workflow
Projektet använder Git Flow med följande branches:
- `main` - Produktionsklar kod
- `develop` - Integration branch
- `feature/*` - Nya funktioner
- `bugfix/*` - Buggfixar

### Code Style
- ESLint för kodkvalitet
- Prettier för formatering
- JSDoc för dokumentation
- Konsekvent namnkonvention (svenska eller engelska)

### Pull Request Process
1. Skapa feature branch från `develop`
2. Implementera funktionalitet med tester
3. Öppna Pull Request med beskrivning
4. Code review från teammedlem
5. Merge efter godkännande

## Testing

Projektet använder en omfattande teststrategi:

```powershell
# Kör alla tester
npm test

# Specific test types
npm run test:unit           # Enhetstester
npm run test:integration    # Integrationstester
npm run test:e2e           # End-to-end tester

# Test coverage
npm run test:coverage
```

**Coverage Mål:**
- Funktioner: >80%
- Rader: >70%
- Branches: >70%

## Deployment

### Development
```powershell
npm run dev
# Applikation tillgänglig på http://localhost:3000
```

### Production
```powershell
npm run build
npm start
```

## Bidrag

### För Projektmedlemmar
1. Se [Projektledning dokumentation](./docs/PROJEKTLEDNING.md)
2. Följ Git workflow och coding standards
3. Säkerställ att tester passerar innan PR
4. Delta aktivt i code reviews

### Rapportera Problem
- Skapa GitHub Issue med detaljerad beskrivning
- Använd lämpliga labels (bug, enhancement, documentation)
- Inkludera steps to reproduce för bugs

## Support

### Dokumentation
- [API Dokumentation](./docs/API_DESIGN.md)
- [Utvecklingsguide](./docs/PROJEKTLEDNING.md)
- [Testguide](./docs/TESTNINGSSTRATEGI.md)

### Kontakt
- GitHub Issues för bug reports och feature requests
- Projektmeetings för större diskussioner
- Code reviews för tekniska frågor

---

**Status:** 🚧 Under utveckling - Node.js fas  
**Nästa Milstolpe:** Refaktorering till Next.js  
**Senast uppdaterad:** Juni 2025
