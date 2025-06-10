#Uppgifts-beskrivning

1.	Planering	


Docs, UML, Iterationer, 




2.	Agile projektmetod	
	
Kanban Projektmetod




3.	Projektverktyg (Github eller Trello)	


Github Projects




4.	Gitflöde - commits, branches, PR, reviews och merge.
	
Dokumentera gitflöde




5.	Arbetsflöde - kvalitetskriterier för kod och projekt, t ex hur en review ska gå till. Hur testning av kod ska gå till … Detta ska vara dokumenterat i en readmen eller wiki	
	
Vi skapar en välformaterad Readme.md för att visa all nödvändig information.




6.	Tillvägagångssätt för refactorering där tidigare applikationer agerar förlaga för    utseende/design och funktioner. Där planen ska visa vad som bara ska refactieras
och vad som ska ändras i design eller funktion.


En helt vanlig refaktorerings-plan som följer Kanban-metoden och visar enligt kriterier som andreas nämner ovanför.





# Projektplan

## Översikt
Projekt för att skapa en Kino-hemsida först i Node.js och sedan refaktorera till Next.js.

## Kärnfunktioner
1. **Inloggning** - Användarsystem med registrering och autentisering
2. **Platsbokning** - Bokning av platser till filmvisningar
3. **Egen filmdatabas** - Hantering av filmer och visningar
4. **Statiska informationssidor** - Om oss, kontakt, etc.
5. **Recensioner** - Användare kan skriva och läsa filmrecensioner

## Teknisk Stack

### Node.js App (Fas 1)
- **Backend**: Node.js + Express
- **Frontend**: EJS templates + vanilla JavaScript
- **Databas**: MongoDB + Mongoose
- **Autentisering**: Express-session + bcrypt
- **Tester**: Jest för komponenttester
- **Styling**: CSS3 + Bootstrap

### Next.js App (Fas 2 - Refaktorering)
- **Framework**: Next.js (React)
- **API**: Next.js API routes
- **Databas**: MongoDB (samma som fas 1)
- **Styling**: CSS Modules eller Styled Components

## Projektstruktur Node.js

```
kino-site/
├── src/
│   ├── controllers/     # Route handlers
│   ├── models/         # MongoDB modeller
│   ├── routes/         # Express routes
│   ├── middleware/     # Custom middleware
│   ├── utils/          # Hjälpfunktioner
│   └── config/         # Konfiguration
├── public/             # Statiska filer
│   ├── css/
│   ├── js/
│   └── images/
├── views/              # EJS templates
│   ├── layouts/
│   ├── partials/
│   └── pages/
├── tests/              # Jest tester
├── docs/               # Dokumentation
└── package.json
```

## API Design

### Endpoints
- **POST** `/api/auth/register` - Registrera användare
- **POST** `/api/auth/login` - Logga in
- **GET** `/api/movies` - Hämta alla filmer
- **GET** `/api/movies/:id` - Hämta specifik film
- **POST** `/api/movies` - Skapa ny film (admin)
- **GET** `/api/showtimes` - Hämta visningar
- **POST** `/api/bookings` - Skapa bokning
- **GET** `/api/bookings/:userId` - Hämta användarens bokningar
- **POST** `/api/reviews` - Skapa recension
- **GET** `/api/reviews/:movieId` - Hämta recensioner för film

## Arbetsfördelning (2 personer)

### Person 1: Backend & Databas
- MongoDB setup och modeller
- Express server konfiguration
- API endpoints implementation
- Autentisering och säkerhet
- Bokningssystem backend

### Person 2: Frontend & UI
- EJS templates och layouts
- CSS styling och responsiv design
- JavaScript för interaktivitet
- Formulär och validering
- Användarupplevelse

## Milstolpar

### Vecka 1: Grundstruktur
- [ ] Projektsetup och dependencies
- [ ] MongoDB connection
- [ ] Grundläggande Express server
- [ ] Första EJS templates

### Vecka 2: Kärnfunktioner
- [ ] Användarsystem (registrering/inloggning)
- [ ] Filmdatabas och API
- [ ] Grundläggande frontend

### Vecka 3: Avancerade funktioner
- [ ] Bokningssystem
- [ ] Recensionssystem
- [ ] Tester implementation

### Vecka 4: Finputsning
- [ ] Bugfixar och optimering
- [ ] Dokumentation
- [ ] Förberedelse för Next.js refaktorering

## Testning
- **Enhetstester**: För utility funktioner
- **Integrationstester**: För API endpoints
- **Komponenttester**: För frontend komponenter

## Git Workflow
1. `main` branch för produktionsklar kod
2. `develop` branch för integration
3. Feature branches: `feature/login`, `feature/booking`, etc.
4. Pull requests för alla ändringar
5. Code review innan merge

## Refaktorering till Next.js
- Behåll samma databas och API-struktur
- Konvertera EJS templates till React komponenter
- Flytta server-side logic till Next.js API routes
- Implementera samma funktionalitet med React hooks
