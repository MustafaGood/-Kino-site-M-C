const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;
    const user = new User({ username, email, password, firstName, lastName });
    await user.save();
    res.status(201).json({ success: true, message: 'Användare registrerad', user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ success: false, message: 'Felaktigt användarnamn eller lösenord' });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Felaktigt användarnamn eller lösenord' });
    req.session.userId = user._id;
    res.json({ success: true, message: 'Inloggning lyckad', user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true, message: 'Utloggning lyckad' });
  });
};

exports.me = async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ success: false, message: 'Ej inloggad' });
  const user = await User.findById(req.session.userId).select('-password');
  res.json({ success: true, user });
};
