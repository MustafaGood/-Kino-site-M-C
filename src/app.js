// src/app.js - Huvudapplikation för Kino-site
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const dotenv = require('dotenv');

// Importera konfiguration och databasanslutning
const { connectDB } = require('./config/database');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const compression = require('compression');

// Ladda miljövariabler
dotenv.config();

// Skapa Express app
const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false // Tillåt inline styles för utveckling
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minuter
  max: 100, // Max 100 requests per fönster
  message: 'För många förfrågningar från denna IP, försök igen senare.'
});
app.use('/api/', limiter);

// Compression middleware
app.use(compression());

// Logging middleware (endast i development)
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

// Anslut till databas (endast om inte i test-miljö där vi hanterar det manuellt)
if (process.env.NODE_ENV !== 'test') {
  connectDB().catch(err => {
    console.error('Failed to connect to database:', err);
    process.exit(1);
  });
}

// View engine setup - EJS templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware för statiska filer
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../public')));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware med MongoDB store
app.use(session({
  secret: process.env.SESSION_SECRET || 'kino-site-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/kino-site'
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 24 timmar
  }
}));

// Middleware för att göra användarinfo tillgänglig i alla templates
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.isAuthenticated = !!req.session.user;
  next();
});

// Routes
app.get('/', (req, res) => {
  res.render('pages/index', { 
    title: 'Välkommen till Kino-site',
    page: 'home'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// 404 Error handler
app.use('*', (req, res) => {
  res.status(404).render('pages/404', { 
    title: 'Sida inte hittad',
    page: '404'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  
  const isDevelopment = process.env.NODE_ENV !== 'production';
  
  res.status(err.status || 500).render('pages/error', {
    title: 'Ett fel uppstod',
    page: 'error',
    error: isDevelopment ? err : { message: 'Något gick fel' },
    stack: isDevelopment ? err.stack : null
  });
});

// Server setup
const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🎬 Kino-site server körs på port ${PORT}`);
    console.log(`📊 Miljö: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 URL: http://localhost:${PORT}`);
  });
}

module.exports = app;
