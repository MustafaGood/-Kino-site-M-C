# Kino-site Projektledning och Arbetssätt

## Agil Projektmetod

### Scrum-inspirerad Approach
Vi använder en förenklad Scrum-metod anpassad för ett 2-personersteam:

#### Sprints
- **Sprint-längd**: 1 vecka
- **Sprint Planning**: Måndag morgon (30 min)
- **Daily Standups**: Kort check-in via text/call
- **Sprint Review**: Fredag eftermiddag (30 min)
- **Sprint Retrospective**: Fredag eftermiddag (15 min)

#### Roller
- **Product Owner**: Gemensamt ansvar
- **Scrum Master**: Roterar varje sprint
- **Development Team**: Båda medlemmar

#### User Stories Format
```
Som [användartyp]
Vill jag [funktionalitet]
För att [värde/nytta]

Acceptanskriterier:
- [ ] Kriterium 1
- [ ] Kriterium 2
- [ ] Kriterium 3
```

## Projektverktyg

### GitHub Projects
- **Primärt verktyg**: GitHub Projects för projekthantering
- **Board struktur**: 
  - Backlog
  - Sprint Backlog
  - In Progress
  - In Review
  - Testing
  - Done

### Alternativ: Trello (Backup)
Om GitHub Projects inte fungerar optimalt:
- **Boards**: En per sprint
- **Listor**: To Do, Doing, Code Review, Testing, Done
- **Etiketter**: Priority (High/Medium/Low), Type (Frontend/Backend/Bug/Feature)

### Kommunikation
- **Discord/Teams**: Daglig kommunikation
- **GitHub**: Formell projektdiskussion via Issues och PR comments
- **Möten**: Weeekly planning och review via video/fysiskt

## Git Workflow

### Branch Strategi (Git Flow)
```
main (production-ready code)
├── develop (integration branch)
    ├── feature/user-authentication
    ├── feature/movie-database
    ├── feature/booking-system
    ├── feature/review-system
    └── hotfix/critical-bug-fix
```

### Branches namngivning
- `feature/beskrivning-av-feature` - Nya funktioner
- `bugfix/beskrivning-av-bug` - Buggfixar
- `hotfix/kritisk-fix` - Kritiska fixar
- `chore/beskrivning` - Maintenance tasks
- `docs/dokumentation` - Dokumentationsuppdateringar

### Standard för commit-meddelande.
```
type(scope): beskrivning

Längre beskrivning om nödvändigt

Closes #issue-nummer
```

**Typer:**
- `feat`: Ny funktionalitet
- `fix`: Buggfix
- `docs`: Dokumentation
- `style`: Formatering, inget som påverkar kod
- `refactor`: Kod refaktorering
- `test`: Lägga till tester
- `chore`: Maintenance

**Exempel:**
```
feat(auth): lägg till användarregistrering

Implementerar registreringsformulär med validering
och lösenordshashning med bcrypt

Closes #12
```

### Pull Request Process

#### PR Template
```markdown
## Beskrivning
Kort beskrivning av ändringarna

## Typ av ändring
- [ ] Buggfix
- [ ] Ny funktionalitet
- [ ] Breaking change
- [ ] Dokumentation

## Checklist
- [ ] Min kod följer projektets kodstil
- [ ] Jag har gjort en self-review av min kod
- [ ] Jag har kommenterat min kod där det behövs
- [ ] Jag har lagt till tester som bevisar att min fix fungerar
- [ ] Nya och befintliga enhetstester passerar
- [ ] Mina ändringar genererar inga nya varningar

## Screenshots/GIFs
(Om applicerbart)

## Relaterade Issues
Closes #
```

#### Review Process
1. **Skapare** öppnar PR mot `develop`
2. **Reviewer** tilldelas automatiskt (den andra teammedlemmen)
3. **Review Requirements:**
   - Kod kvalitet och läsbarhet
   - Funktionalitet enligt acceptanskriterier
   - Inga konflikter eller breaking changes
   - Tester är inkluderade och passerar
4. **Approval** krävs innan merge
5. **Merge strategy**: Squash and merge för feature branches

## Kvalitetskriterier

### Kod Kvalitet
- **Kodstil**: ESLint + Prettier konfiguration
- **Kommentarer**: JSDoc för funktioner, inline för komplex logik
- **Variabelnamn**: Beskrivande och konsistenta (svenska eller engelska, men konsekvent)
- **Funktioner**: Max 20 rader, en ansvarsområde per funktion
- **Filer**: Max 200 rader per fil

### Testing Standards
- **Testtäckning**: Minimum 70% för nya funktioner
- **Test typer**:
  - Unit tests för utilities och models
  - Integration tests för API endpoints
  - Component tests för frontend komponenter
- **Test naming**: `describe` vad som testas, `it` vad som förväntas

### Definition of Done
En feature är klar när:
- [ ] Kod är skriven och följer kodstandarder
- [ ] Tester är skrivna och passerar
- [ ] Code review är genomförd och godkänd
- [ ] Funktionalitet är testad i development miljö
- [ ] Dokumentation är uppdaterad
- [ ] PR är mergad till develop branch

## Refaktoreringsplan

### Fas 1: Node.js Implementation
**Mål**: Skapa en fullt fungerande traditionell webbapplikation

#### Vad som implementeras exakt som planerat:
- Alla kärnfunktioner (inloggning, bokning, filmdatabas, recensioner)
- Databas struktur och API endpoints
- Grundläggande UI/UX design
- Säkerhet och autentisering

#### Designbeslut för refaktorering:
- **Modularisering**: Separera business logic från route handlers
- **API-first approach**: Skapa tydliga API endpoints
- **Komponenttänk**: Strukturera EJS templates som återanvändbara delar
- **State management**: Dokumentera hur data flödar i applikationen

### Fas 2: Next.js Refaktorering
**Mål**: Konvertera till Next.js med exakt samma funktionalitet

#### Mappning Node.js → Next.js:
```
Node.js                    Next.js
src/routes/auth.js    →    pages/api/auth/[...nextauth].js
src/controllers/      →    pages/api/ + utils/
views/layouts/        →    components/Layout.jsx  
views/pages/          →    pages/
public/               →    public/ (unchanged)
src/models/           →    lib/models/ (unchanged)
```

#### Vad som behålls identiskt:
- Databas struktur och modeller
- API endpoint URLs och funktionalitet
- UI design och användarflöden

#### Vad som förändras:
- Server-side rendering → React komponenter
- EJS templates → JSX
- Express routes → Next.js API routes
- Vanilla JavaScript → React hooks
- CSS → CSS Modules/Styled Components

## Sprint Planning

### Sprint 1 (Vecka 1): Foundation
**Mål**: Projektsetup och grundstruktur

**Krav från användare/utvecklare:**
- Som utvecklare vill jag ha en komplett projektstruktur för att kunna börja utveckla
- Som utvecklare vill jag ha databas connection för att kunna lagra data
- Som användare vill jag kunna besöka hemsidan för att se grundlayout

**Uppgifter:**
- [ ] Projektsetup (package.json, dependencies)
- [ ] MongoDB setup och connection
- [ ] Express server grundkonfiguration
- [ ] Första EJS templates och layout
- [ ] CSS framework integration
- [ ] GitHub repository och CI/CD setup

### Sprint 2 (Vecka 2): Autentisering
**Mål**: Användarsystem

**Krav från användare:**
- Som besökare vill jag kunna registrera ett konto för att bli medlem
- Som medlem vill jag kunna logga in för att komma åt mina funktioner
- Som inloggad användare vill jag kunna logga ut säkert

**Uppgifter:**
- [ ] User model och schema
- [ ] Registreringsformulär och vaildering
- [ ] Login/logout funktionalitet
- [ ] Sessionshantering
- [ ] Lösenordssäkerhet (bcrypt)
- [ ] Autentisering-middleware

### Sprint 3 (Vecka 3): Filmdatabas
**Mål**: Filmhantering och visning

**Krav från användare:**
- Som besökare vill jag se alla tillgängliga filmer
- Som besökare vill jag kunna läsa detaljer om en specifik film
- Som admin vill jag kunna lägga till nya filmer

**Uppgifter:**
- [ ] Movie model och schema
- [ ] Film listing sida
- [ ] Film detalj sida
- [ ] Admin panel för filmhantering
- [ ] Bilduppladdning för filmaffischer
- [ ] Sökfunktionalitet

### Sprint 4 (Vecka 4): Bokningssystem
**Mål**: Platsbokning

**Krav från användare:**
- Som medlem vill jag kunna se lediga visningar
- Som medlem vill jag kunna boka platser
- Som medlem vill jag kunna se mina bokningar

**Uppgifter:**
- [ ] Showtime model och schema
- [ ] Booking model och schema
- [ ] Visning av tillgängliga tider
- [ ] Bokningsformulär
- [ ] Platsvisualisering
- [ ] Bokningsbekräftelse

### Sprint 5 (Vecka 5): Recensioner
**Mål**: Recensionssystem

**Krav från användare:**
- Som medlem vill jag kunna skriva recensioner på filmer
- Som besökare vill jag kunna läsa recensioner
- Som medlem vill jag kunna betygsätta filmer

**Uppgifter:**
- [ ] Review model och schema
- [ ] Recensionsformulär
- [ ] Visning av recensioner
- [ ] Betygsystem (1-5 stjärnor)
- [ ] Moderation av recensioner

### Sprint 6 (Vecka 6): Testa & Polera
**Mål**: Kvalitetssäkring och polering

**Uppgifter:**
- [ ] Enhetstester för alla modeller
- [ ] API endpoint tester
- [ ] Frontend komponenttester
- [ ] Cross-browser testing
- [ ] Prestandaoptimering
- [ ] Dokumentationkomplettering

## Riskhantering

### Identifierade Risker
1. **Tekniska risker:**
   - MongoDB anslutningsproblem
   - Session management höga komplexitet
   - Frontend/backend integration

2. **Projektrisker:**
   - Tidspress inför deadline
   - Scope creep
   - Kommunikationsproblem

3. **Refaktoreringrisker:**
   - Funktionalitet tapps bort i översättning
   - Next.js svårighetsgrad
   - API kompatabilitetsproblem

### Mitigation strategier
- Veckovis redovisning av framsteg
- Pair programming för kritiska komponenter  
- Kontinuerlig testning
- Dokumenterad API som kontrakt mellan faser
- Buffer tid i planering

## Kommunikationsplan

### Daglig Kommunikation
- **Morning Standup** (5 min): Vad gjorde jag igår? Vad ska jag göra idag? Några blockers?
- **End-of-day Update**: Kort status via chat

### Veckovis
- **Sprint Planning**: Måndag 1 timme
- **Sprint Review & Retrospective**: Fredag 45 min

### Dokumentation
- Alla beslut dokumenteras i GitHub Issues
- Mötesnoteringar sparas i `/docs/meetings/`
- Beslut av arkitektur i `/docs/adr/` (ADR)

## Målöversikt

### Tekniska Mål
- [ ] 100% funktionalitet överförd från Node.js till Next.js
- [ ] >70% test coverage
- [ ] <2s sideloadningstid
- [ ] Inga kritiska säkerhetsbrister

### Projektmål  
- [ ] Leverans inom tidsram
- [ ] Alla user stories implementerade
- [ ] Dokumentation komplett
- [ ] Demo-redo vid presentation

### Lärandemål
- [ ] Fördjupad förståelse för full-stack utveckling
- [ ] Praktisk erfarenhet av refaktorering
- [ ] Git workflow mastery
- [ ] Agile projektledning experience
