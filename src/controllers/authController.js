const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Visa registreringsformuläret
exports.getRegister = (req, res) => {
  if (req.session.user) {
    return res.redirect('/');
  }  res.render('pages/register', {
    title: 'Registrera konto',
    layout: 'layouts/main',
    page: 'register'
  });
};

exports.register = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      req.flash('error', 'Vänligen fyll i alla obligatoriska fält');
      return res.redirect('/register');
    }

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      req.flash('error', 'En användare med denna e-post eller användarnamn finns redan');
      return res.redirect('/register');
    }

    // Create new user
    const user = new User({ username, email, password, firstName, lastName });
    await user.save();

    // Log the user in automatically
    req.session.user = {
      id: user._id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role
    };

    req.flash('success', 'Registrering lyckades! Välkommen!');
    res.redirect('/');
  } catch (err) {
    console.error('Registration error:', err);
    req.flash('error', 'Ett fel uppstod vid registreringen');
    res.redirect('/register');
  }
};

// Visa inloggningsformuläret
exports.getLogin = (req, res) => {
  if (req.session.user) {
    return res.redirect('/');
  }  res.render('pages/login', {
    title: 'Logga in',
    layout: 'layouts/main',
    page: 'login'
  });
};

// Hantera inloggningsförsök
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      req.flash('error', 'Vänligen ange både e-post och lösenord');
      return res.redirect('/login');
    }

    const user = await User.findOne({ email });
    
    if (!user) {
      req.flash('error', 'Ogiltig e-post eller lösenord');
      return res.redirect('/login');
    }

    const isValidPassword = await user.comparePassword(password);
    
    if (!isValidPassword) {
      req.flash('error', 'Ogiltig e-post eller lösenord');
      return res.redirect('/login');
    }

    // Spara hela användarobjektet i session (utan lösenord)
    req.session.user = {
      _id: user._id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role
    };

    // Om användaren är admin och försöker nå admin-sidan, skicka dit
    const redirectUrl = req.session.returnTo || 
      (user.role === 'admin' ? '/admin/dashboard' : '/');
    delete req.session.returnTo;
    
    res.redirect(redirectUrl);
  } catch (err) {
    console.error('Login error:', err);
    req.flash('error', 'Ett fel uppstod vid inloggningen');
    res.redirect('/login');
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true, message: 'Utloggning lyckad' });
  });
};

exports.me = async (req, res) => {
  if (!req.session.userId)
    return res.status(401).json({ success: false, message: 'Ej inloggad' });
  const user = await User.findById(req.session.userId).select('-password');
  res.json({ success: true, user });
};
