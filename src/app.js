// src/app.js - Huvudapplikation för Kino-site
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const dotenv = require('dotenv');
const flash = require('connect-flash');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const compression = require('compression');

// Importera konfiguration och databasanslutning
const { connectDB } = require('./config/database');
const { ensureAdminExists } = require('./utils/adminSeeder');

// Ladda miljövariabler
dotenv.config();

// Skapa Express app
const app = express();

// Security middleware
app.use(
  helmet({
    contentSecurityPolicy: false, // Tillåt inline styles för utveckling
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minuter
  max: 100, // Max 100 requests per fönster
  message: 'För många förfrågningar från denna IP, försök igen senare.',
});
app.use('/api/', limiter);

// Compression middleware
app.use(compression());

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'kino-site-secret-key-change-in-production',
    resave: false,
    saveUninitialized: true,
    store: process.env.NODE_ENV === 'production' 
      ? MongoStore.create({
          mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/kino-site'
        })
      : undefined,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 24 timmar
    }
  })
);

// Flash messages middleware
app.use(flash());

// Global middleware för flash messages och user
app.use((req, res, next) => {
  res.locals.flash = {
    success: req.flash('success'),
    error: req.flash('error'),
    info: req.flash('info')
  };
  res.locals.user = req.session.user || null;
  res.locals.isAuthenticated = !!req.session.user;
  res.locals.page = '';  // Default page för nav highlighting
  next();
});

// View engine setup - EJS templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

// Middleware för statiska filer
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../public')));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware (endast i development)
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

// Anslut till databas (endast om inte i test-miljö där vi hanterar det manuellt)
if (process.env.NODE_ENV !== 'test') {
  connectDB()
    .then(async () => {
      console.log('✅ Ansluten till databasen');

      // Kör admin-seeding i utvecklingsmiljö
      if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
        await ensureAdminExists();
      }
    })
    .catch((err) => {
      console.error('Failed to connect to database:', err);
      process.exit(1);
    });
}

// Routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

// Mount routes
app.use('/', authRoutes);  // Detta gör att /login, /register etc funkar
app.use('/admin', adminRoutes);

const filmerRoutes = require('./routes/movies');
app.use('/filmer', filmerRoutes);

const showtimeRoutes = require('./routes/showtimes');
app.use('/visningar', showtimeRoutes);

app.get('/', (req, res) => {
  res.render('pages/index', {
    title: 'Välkommen till Kino-site',
    page: 'home',
  });
});

// Formulär för registrering
app.get('/register', (req, res) => {
  res.render('pages/register', { title: 'Registrera konto', page: 'register' });
});

app.post('/register', async (req, res) => {
  const { username, email, password, firstName, lastName } = req.body;
  try {
    const User = require('./models/User');
    const user = new User({ username, email, password, firstName, lastName });
    await user.save();
    req.session.userId = user._id;
    req.session.user = user;
    res.redirect('/');
  } catch (err) {
    res.render('pages/register', {
      title: 'Registrera konto',
      error: err.message,
      page: 'register',
    });
  }
});

// Formulär för login
app.get('/login', (req, res) => {
  res.render('pages/login', { title: 'Logga in', page: 'login' });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const User = require('./models/User');
    const user = await User.findOne({ username });
    if (!user) throw new Error('Felaktigt användarnamn eller lösenord');
    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error('Felaktigt användarnamn eller lösenord');
    req.session.userId = user._id;
    req.session.user = user;
    res.redirect('/');
  } catch (err) {
    res.render('pages/login', {
      title: 'Logga in',
      error: err.message,
      page: 'login',
    });
  }
});

// Logout
app.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Error handling middleware
app.use((req, res, next) => {
  res.status(404).render('pages/404', {
    title: '404 - Sidan hittades inte',
    layout: 'layouts/main'
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('pages/error', {
    title: 'Ett fel uppstod',
    layout: 'layouts/main',
    error: {
      message: process.env.NODE_ENV === 'development' ? err.message : 'Ett internt serverfel uppstod'
    },
    stack: process.env.NODE_ENV === 'development' ? err.stack : null
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
