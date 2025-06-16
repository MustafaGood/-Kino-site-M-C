const isAdmin = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).redirect('/login');
  }

  if (req.session.user.role !== 'admin') {
    return res.status(403).render('pages/error', {
      error: {
        status: 403,
        message: 'Åtkomst nekad. Du måste vara admin för att se denna sida.'
      }
    });
  }

  next();
};

module.exports = isAdmin;
