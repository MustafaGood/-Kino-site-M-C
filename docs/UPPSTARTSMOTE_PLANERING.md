Plan för första mötet
Syftet:
Att skapa gemensam förståelse för projektet, sätta ramarna, etablera roller, och förbereda teknisk miljö.
Vanliga punkter att gå igenom:
Mål och vision


Vad är syftet med projektet?
Vad ska produkten göra?


Roller och ansvar


Vem är Product Owner?
Vem är Scrum Master?
Vilka är i utvecklingsteamet?


Teknisk miljö


Är Node.js rätt teknik för detta projekt?
Vilka verktyg används? (t.ex. Git, CI/CD, Docker, databaser)


Definition of Done (DoD)


Vad betyder "klart" för teamet? (kodad, testad, dokumenterad?)


Backlogg-initiering


Skapa en första Product Backlog med högnivå-user stories
Prioritera de första funktionerna
Bygga backloggen


Plan för första sprinten


Bestäm sprintlängd (vanligtvis 1–2 veckor, men vi kommer göra 1 dag)
Förbered Sprint Planning


Kommunikation & samarbete


Hur hålls Daily Standups?
Vilka verktyg används? (t.ex. Slack, Jira, Trello, VSCode, Cursor, MariaDB)





Kino-site: Uppstartsmöte / Sprint 0 - Planering

 Syfte
Att skapa gemensam förståelse för projektet, sätta ramarna, etablera roller, och förbereda teknisk miljö för Kino-site utveckling från Node.js till Next.js refaktorering.


 1. Mål och Vision

 Vad är syftet med projektet?
Huvudsyfte: Utveckla en komplett kinobiografshemsida som demonstrerar full-stack utveckling och refaktoreringsprocess från Node.js till Next.js.

Långsiktigt mål: 
- Skapa en funktionell biografhemsida med komplett användarupplevelse
- Genomföra en praktisk refaktorering som visar skillnader mellan traditionell Node.js och modern Next.js utveckling
- Utveckla färdigheter inom agil projektledning och kvalitetssäkring

 Vad ska produkten göra?

 Kärnfunktionalitet:
- Filmvisning: Utforska aktuella filmer med detaljerad information, poster, trailers
- Platsbokning: Interaktiv sittplatsplan för bokningar av biografplatser
- Användarkonton: Säker registrering, inloggning och profilhantering
- Recensionssystem: Skriv och läs filmrecensioner med betygsättning (1-5 stjärnor)
- Administratörspanel: Hantera filmer, visningar, bokningar och användare

 Användargrupper:
- Gäster: Kan browsa filmer och läsa recensioner
- Registrerade användare: Kan boka platser och skriva recensioner
- Administratörer: Kan hantera hela systemet

 Affärslogik:
- Bokningar kan endast göras av inloggade användare
- Varje användare kan bara recensera en film en gång
- Bokningar kan avbokas fram till 2 timmar före visning
- Automatisk beräkning av genomsnittlig filmbetyg






 2. Roller och Ansvar

 Teamsammansättning:
- Projektteam: 2-personer utvecklingsteam
- Arbetssätt: Scrum-inspirerad agil metod

 Rollfördelning:

 Product Owner: Gemensamt ansvar
Ansvar:
- Prioritera Product Backlog
- Definiera user stories och acceptanskriterier
- Validera leveranser mot krav
- Kommunicera med "kund" (kursledning)

 Scrum Master: Roterar varje sprint
Sprint 1-2: [Christoffer]  
Sprint 3-4: [Mustafa]  
Sprint 5-6: [Christoffer]

Ansvar:
- Facilitera Scrum-moment
- Hjälpa teamet följa arbetssätt
- Identifiera och ta bort blockeringar
- Förbättra teamets effektivitet

 Development Team: Båda medlemmar
Gemensamt ansvar:
- Utveckla funktionalitet enligt Definition of Done
- Planera och estimera user stories
- Säkerställa kodkvalitet genom code reviews
- Testa och dokumentera all funktionalitet

 Kommunikationsansvar:
- Daglig kommunikation: Teams
- Formell dokumentation: GitHub Issues och PR comments
- Beslutsdokumentation: Github Repo i /docs/






 3. Teknisk Miljö

 Är Node.js rätt teknik för detta projekt?

 Fas 1: Node.js Implementation
Fördelar:
- Snabb utveckling med Express.js
- Enkel integration med MongoDB
- Stort ecosystem av packages
- Bra för traditionella MVC-applikationer
- Lämplig för lärande av grundläggande web-koncept

Teknikstack:
- Backend: Node.js + Express.js
- Frontend: EJS templates + vanilla JavaScript
- Databas: MongoDB + Mongoose
- Autentisering: Express-session + bcrypt
- Styling: CSS3 + Bootstrap

 Fas 2: Next.js Refaktorering
Fördelar:
- Server-side rendering för bättre SEO
- Modern React-baserad UI
- Optimerad prestanda
- API routes integration
- Förbättrad utvecklarupplevelse

 Vilka verktyg används?

 Utvecklingsverktyg:
- Code Editor: VS Code/Cursor
- Version Control: Git + GitHub
- Databas: MongoDB (lokal + MongoDB Atlas för produktion)
- API Testing: Postman
- Testning: Jest

 Projekthantering:
- Primärt: GitHub Projects
- Backup: Trello
- Dokumentation: Markdown filer i `/docs`
- Kommunikation: Teams

 Databashantering:
- Utveckling: MongoDB lokalt (port 27017)
- Produktion: MongoDB Atlas
- Backup: Automatiska dagliga backups








 4. Definition of Done (DoD)

 Vad betyder "klart" för teamet?

En user story/feature är Done när:

 Kod:
- [ ] Funktionalitet implementerad enligt acceptanskriterier
- [ ] Kod följer projektets kodstandarder (ESLint + Prettier)
- [ ] All kod är kommenterad där nödvändigt (JSDoc)
- [ ] Inga linter-varningar eller fel

 Testning:
- [ ] Enhetstester skrivna och passerar (>70% coverage)
- [ ] Integrationstester för API endpoints
- [ ] Manuell testning i utvecklingsmiljö genomförd
- [ ] Regressionstest för befintlig funktionalitet

 Code Review:
- [ ] Pull Request skapad med detaljerad beskrivning
- [ ] Code review genomförd av annan teammedlem
- [ ] Feedback adresserad och godkänd
- [ ] PR merged till develop branch

 Dokumentation:
- [ ] API-dokumentation uppdaterad (om relevant)
- [ ] README uppdaterad (om relevant)
- [ ] Användardokumentation skapad (om relevant)
- [ ] Teknisk dokumentation för refaktorering

 Kvalitetssäkring:
- [ ] Funktionalitet testad i olika webbläsare
- [ ] Responsiv design verifierad
- [ ] Säkerhetskontroller genomförda
- [ ] Prestanda acceptable (< 2s laddningstid)








 5. Backlogg-initiering

 Första Product Backlog med högnivå User Stories:

 Epic 1: Användarhantering
Som besökare vill jag kunna skapa ett konto för att få tillgång till bokningsfunktioner
- Story 1.1: Registreringsformulär
- Story 1.2: Inloggning/utloggning
- Story 1.3: Lösenordsåterställning
- Story 1.4: Profilhantering

 Epic 2: Filmkatalog
Som besökare vill jag kunna utforska filmer för att hitta något att se
- Story 2.1: Filmlistning med poster
- Story 2.2: Filmdetaljer (beskrivning, genre, skådespelare)
- Story 2.3: Sökfunktion
- Story 2.4: Genrefiltrering

 Epic 3: Bokningssystem
Som registrerad användare vill jag kunna boka platser för att se en film
- Story 3.1: Visa tillgängliga visningar
- Story 3.2: Interaktiv sittplatsplan
- Story 3.3: Bokningsprocess
- Story 3.4: Bokningsbekräftelse

 Epic 4: Recensionssystem
Som registrerad användare vill jag kunna dela mina åsikter om filmer
- Story 4.1: Skriva recensioner
- Story 4.2: Betygsättning (1-5 stjärnor)
- Story 4.3: Läsa andras recensioner
- Story 4.4: Genomsnittlig betyg på filmer

 Epic 5: Administratörspanel
Som admin vill jag kunna hantera systemet
- Story 5.1: Filmhantering (CRUD)
- Story 5.2: Visningshantering
- Story 5.3: Användarhantering
- Story 5.4: Bokningsöversikt

 Prioritering av första funktionerna:

 Hög prioritet (Sprint 1-2):
1. Projektsetup och grundstruktur
2. Användarregistrering och autentisering
3. Grundläggande filmlistning

 Medel prioritet (Sprint 3-4):
1. Bokningssystem
2. Filmdetaljer och sök
3. Administratörspanel (grundfunktioner)

 Låg prioritet (Sprint 5-6):
1. Recensionssystem
2. Avancerad admin-funktionalitet
3. Prestanda och polering










 6. Plan för första sprinten

 Sprint-längd: 1 vecka (enligt projektdokument)

 Sprint 1 (Vecka 1): Foundation
Sprint Mål: Etablera projektgrund och grundläggande funktionalitet

Kapacitet: 2 utvecklare × 5 dagar = 10 utvecklardagar

 Sprint Backlog:
Projektsetup (3 dagar)
- [ ] Repository struktur enligt projektdokument
- [ ] Package.json konfiguration
- [ ] Express server grundkonfiguration
- [ ] MongoDB connection setup
- [ ] Environment variables (.env)

Grundläggande UI (2 dagar)
- [ ] EJS templates setup
- [ ] Bootstrap integration
- [ ] Grundlayout (header, footer, navigation)
- [ ] Responsive design grund

Användarautentisering (4 dagar)
- [ ] User model (MongoDB/Mongoose)
- [ ] Registreringsformulär
- [ ] Login/logout funktionalitet
- [ ] Sessionshantering
- [ ] Middleware för autentisering

DevOps Setup (1 dag)
- [ ] ESLint + Prettier konfiguration
- [ ] Jest testing setup
- [ ] Utvecklingsscripts (npm run dev)

 Sprint 1 Acceptanskriterier:
- Applikationen kan startas lokalt
- Användare kan registrera sig och logga in
- Grundläggande navigation fungerar
- Alla tester passerar
- Code coverage >70%

 Förberedelser för Sprint Planning:

 Estimering:
- Planning Poker för user story estimering
- Story Points baserat på komplexitet och tid
- Velocity beräknas efter första sprint

 Risk Assessment:
- MongoDB setup kan vara komplicerat
- Sessionshantering kräver säkerhetsöverväganden
- Första sprint är ofta längre för setup
 7. Kommunikation & Samarbete

 Hur hålls Daily Standups?

 Format: Kort check-in (5-10 minuter)
Tid: Varje dag kl 9:00
Plattform: Discord/Teams call eller text

 Struktur:
Varje teammedlem svarar på:
1. Vad gjorde jag igår? - Konkreta uppgifter
2. Vad ska jag göra idag? - Planerade uppgifter
3. Finns det några blockeringar? - Hinder eller hjälpbehov

 Async Alternative:
Om tidsscheman kolliderar:
- Statusuppdatering via Discord/Teams text
- Dokumentera i GitHub Project comments
- Akut hjälp via direkt kommunikation

 Vilka verktyg används?

 Kommunikationsverktyg:
- Discord/Teams: Daglig kommunikation, snabba frågor
- GitHub: Formell projektdiskussion, code review
- E-post: Officiell kommunikation med kursansvarig

 Projekthanteringsverktyg:
- GitHub Projects: Primärt för sprint planning och tracking
- Trello: Backup om GitHub Projects inte räcker
- GitHub Issues: Detaljerad dokumentation av uppgifter

 Utvecklingsverktyg:
- VS Code/Cursor: Code editor med Live Share för pair programming
- Git: Version control med GitHub
- Postman/Thunder Client: API testing
- MariaDB/MongoDB: Databas (projektet använder MongoDB)

 Dokumentationsverktyg:
- Markdown: All projektdokumentation
- JSDoc: Kod-dokumentation
- GitHub Wiki: Omfattande dokumentation (vid behov)

 Mötesstruktur:

 Veckovisa möten:
Sprint Planning (Måndag 1 timme)
- Review av föregående sprint
- Planning av kommande sprint
- Commitments och estimering

Sprint Review & Retrospective (Fredag 45 min)
- Demo av funktionalitet
- Reflektion över sprint
- Förbättringsförslag

 Ad-hoc möten:
- Pair Programming vid komplexa uppgifter
- Problem Solving vid tekniska utmaningar
- Architecture Decisions vid viktiga tekniska val

---

 Nästa Steg

 Omedelbart efter mötet:
1. Sätt upp utvecklingsmiljö
   - Klona repository
   - Installera dependencies
   - Konfigurera .env filer
   - Testa MongoDB connection

2. Initiera projektverktyg
   - Skapa GitHub Project board
   - Sätt upp kommunikationskanaler
   - Definiera Git branching strategy

3. Sprint 1 Planning
   - Bryt ner backlog items till detaljerade tasks
   - Tilldela ansvarig för varje uppgift
   - Sätt upp testing framework

 Förbereda för utveckling:
- Bestäm kodkonventioner (svenska/engelska)
- Sätt upp pair programming sessions
- Skapa templates för PR och Issues
- Planera första code review process


Nästa review: Efter Sprint 1 completion

