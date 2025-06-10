# Kino-site API Design

## API Arkitektur

### RESTful Principer
API:et följer REST-arkitektur med:
- Resursorienterade URLs
- HTTP-verb för olika operationer
- Stateless kommunikation
- JSON för dataöverföring
- Konsekvent felhantering

### Base URL
```
Development: http://localhost:3000/api
Production: Inget val
```

## Autentisering

### Session-based Authentication
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

#### POST /api/auth/register
**Request Body:**
```json
{
  "username": "string (3-50 tecken)",
  "email": "string (giltig email)",
  "password": "string (min 8 tecken)",
  "firstName": "string",
  "lastName": "string"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Användare registrerad",
  "user": {
    "id": "string",
    "username": "string",
    "email": "string",
    "firstName": "string",
    "lastName": "string",
    "role": "user",
    "createdAt": "ISO 8601 datum"
  }
}
```

#### POST /api/auth/login
**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Inloggning lyckad",
  "user": {
    "id": "string",
    "username": "string",
    "email": "string",
    "firstName": "string",
    "lastName": "string",
    "role": "user"
  }
}
```

## Filmer

### Endpoints
```
GET    /api/movies           # Hämta alla filmer
GET    /api/movies/:id       # Hämta specifik film
POST   /api/movies           # Skapa ny film (admin)
PUT    /api/movies/:id       # Uppdatera film (admin)
DELETE /api/movies/:id       # Ta bort film (admin)
GET    /api/movies/search    # Sök filmer
```

#### GET /api/movies
**Query Parameters:**
- `page` (int): Sidnummer (default: 1)
- `limit` (int): Antal per sida (default: 20, max: 100)
- `genre` (string): Filtrera på genre
- `rating` (string): Filtrera på åldersklassning
- `sort` (string): Sortering (titel, utgivningsdatum, betyg)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "movies": [
      {
        "id": "string",
        "title": "string",
        "description": "string",
        "genre": ["string"],
        "director": "string",
        "actors": ["string"],
        "duration": "number (minuter)",
        "releaseDate": "ISO 8601 datum",
        "rating": "string (Barntillåten, 7+, 11+, 15+)",
        "poster": "string (URL)",
        "trailer": "string (URL)",
        "averageRating": "number (1-5)",
        "reviewCount": "number",
        "createdAt": "ISO 8601 datum"
      }
    ],
    "pagination": {
      "page": "number",
      "totalPages": "number",
      "totalItems": "number",
      "hasNext": "boolean",
      "hasPrev": "boolean"
    }
  }
}
```

#### GET /api/movies/:id
**Response (200):**
```json
{
  "success": true,
  "data": {
    "movie": {
      "id": "string",
      "title": "string",
      "description": "string",
      "genre": ["string"],
      "director": "string",
      "actors": ["string"],
      "duration": "number",
      "releaseDate": "ISO 8601 datum",
      "rating": "string",
      "poster": "string",
      "trailer": "string",
      "averageRating": "number",
      "reviewCount": "number",
      "showtimes": [
        {
          "id": "string",
          "date": "ISO 8601 datum",
          "time": "string (HH:MM)",
          "availableSeats": "number",
          "totalSeats": "number",
          "price": "number"
        }
      ]
    }
  }
}
```

## Visningar (Showtimes)

### Endpoints
```
GET    /api/showtimes           # Hämta alla visningar
GET    /api/showtimes/:id       # Hämta specifik visning
POST   /api/showtimes           # Skapa ny visning (admin)
PUT    /api/showtimes/:id       # Uppdatera visning (admin)
DELETE /api/showtimes/:id       # Ta bort visning (admin)
```

#### GET /api/showtimes
**Query Parameters:**
- `movieId` (string): Filtrera på film
- `date` (string): Filtrera på datum (YYYY-MM-DD)
- `available` (boolean): Endast visningar med lediga platser

**Response (200):**
```json
{
  "success": true,
  "data": {
    "showtimes": [
      {
        "id": "string",
        "movieId": "string",
        "movieTitle": "string",
        "date": "ISO 8601 datum",
        "time": "string",
        "theater": "string",
        "totalSeats": "number",
        "availableSeats": "number",
        "price": "number",
        "seats": [
          {
            "row": "string",
            "number": "number",
            "isBooked": "boolean",
            "isBlocked": "boolean"
          }
        ]
      }
    ]
  }
}
```

## Bokningar

### Endpoints
```
GET    /api/bookings               # Hämta användarens bokningar
POST   /api/bookings               # Skapa ny bokning
GET    /api/bookings/:id           # Hämta specifik bokning
DELETE /api/bookings/:id           # Avboka (innan visning)
```

#### POST /api/bookings
**Request Body:**
```json
{
  "showtimeId": "string",
  "seats": [
    {
      "row": "string",
      "number": "number"
    }
  ]
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Bokning skapad",
  "data": {
    "booking": {
      "id": "string",
      "userId": "string",
      "showtimeId": "string",
      "movieTitle": "string",
      "date": "ISO 8601 datum",
      "time": "string",
      "theater": "string",
      "seats": [
        {
          "row": "string",
          "number": "number"
        }
      ],
      "totalPrice": "number",
      "bookingNumber": "string",
      "status": "confirmed",
      "createdAt": "ISO 8601 datum"
    }
  }
}
```

#### GET /api/bookings
**Response (200):**
```json
{
  "success": true,
  "data": {
    "bookings": [
      {
        "id": "string",
        "showtimeId": "string",
        "movieTitle": "string",
        "moviePoster": "string",
        "date": "ISO 8601 datum",
        "time": "string",
        "theater": "string",
        "seats": [
          {
            "row": "string",
            "number": "number"
          }
        ],
        "totalPrice": "number",
        "bookingNumber": "string",
        "status": "string",
        "createdAt": "ISO 8601 datum"
      }
    ]
  }
}
```

## Recensioner

### Endpoints
```
GET    /api/reviews/:movieId    # Hämta recensioner för film
POST   /api/reviews             # Skapa ny recension
PUT    /api/reviews/:id         # Uppdatera egen recension
DELETE /api/reviews/:id         # Ta bort egen recension
GET    /api/reviews/user/:userId # Hämta användarens recensioner
```

#### POST /api/reviews
**Request Body:**
```json
{
  "movieId": "string",
  "rating": "number (1-5)",
  "title": "string (max 100 tecken)",
  "content": "string (max 1000 tecken)"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Recension skapad",
  "data": {
    "review": {
      "id": "string",
      "userId": "string",
      "username": "string",
      "movieId": "string",
      "rating": "number",
      "title": "string",
      "content": "string",
      "createdAt": "ISO 8601 datum",
      "updatedAt": "ISO 8601 datum"
    }
  }
}
```

#### GET /api/reviews/:movieId
**Query Parameters:**
- `page` (int): Sidnummer
- `limit` (int): Antal per sida
- `sort` (string): Sortering (nyaste, äldsta, högsta, lägsta)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "reviews": [
      {
        "id": "string",
        "userId": "string",
        "username": "string",
        "rating": "number",
        "title": "string",
        "content": "string",
        "createdAt": "ISO 8601 datum",
        "updatedAt": "ISO 8601 datum"
      }
    ],
    "statistics": {
      "averageRating": "number",
      "totalReviews": "number",
      "ratingDistribution": {
        "1": "number",
        "2": "number",
        "3": "number",
        "4": "number",
        "5": "number"
      }
    },
    "pagination": {
      "page": "number",
      "totalPages": "number",
      "totalItems": "number"
    }
  }
}
```

## Felhantering

### HTTP Status Codes
- `200` - OK (lyckad GET/PUT)
- `201` - Created (lyckad POST)
- `204` - No Content (lyckad DELETE)
- `400` - Bad Request (felaktig data)
- `401` - Unauthorized (ej inloggad)
- `403` - Forbidden (ej behörighet)
- `404` - Ej funnen (resurs finns ej)
- `409` - Konflikt (datakonflikt)
- `422` - Ej processerbar enhet (valideringsfel)
- `500` - Internt serverfel

### Felformat
```json
{
  "success": false,
  "error": {
    "code": "string",
    "message": "string",
    "details": "string (optional)",
    "field": "string (för valideringsfel)"
  }
}
```

### Vanliga Felkoder
- `VALIDATION_ERROR` - Felaktig input data
- `AUTHENTICATION_REQUIRED` - Inloggning krävs
- `INSUFFICIENT_PERMISSIONS` - Saknar behörighet
- `RESOURCE_NOT_FOUND` - Resurs hittades inte
- `DUPLICATE_ENTRY` - Duplicerad data
- `SEATS_UNAVAILABLE` - Platser ockuperade
- `BOOKING_EXPIRED` - Bokning inte längre giltig

## Säkerhet

### Autentisering
- Sessionsbaserad med säkra cookies
- CSRF-skydd
- Hastighetsbegränsning på känsliga endpoints

### Datavalidering
- Indatavalidering på alla endpoints
- SQL-injektionsskydd via Mongoose
- XSS-skydd genom sanering

### Behörigheter
- `guest` - Kan läsa filmer och recensioner
- `user` - Kan boka och skriva recensioner
- `admin` - Kan hantera filmer och visningar

## Prestanda

### Cachelagring
- Filmdata cachelagras i 1 timme
- Visningsdata cachelagras i 15 minuter
- Recensionsstatistik cachelagras i 30 minuter

### Optimering
- Sidindelning för stora dataset
- Databasindexering på ofta använda fält
- Komprimering av API-svar
- Frågeoptimering för komplexa join-operationer

## Testning

### API Testningsstrategi
- **Enhetstester**: Varje endpoint testas isolerat
- **Integrationstester**: Hela flöden från förfrågan till svar
- **Säkerhetstester**: Autentisering och auktorisering
- **Prestandatester**: Belastningstestning på kritiska endpoints

### Testtäckningsmål
- Minst 80% kodtäckning
- Alla lyckade och felscenarier täckta
- Kantfall dokumenterade och testade
