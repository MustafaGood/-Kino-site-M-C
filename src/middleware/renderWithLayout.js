const renderWithLayout = (req, res, next) => {
  // Spara den ursprungliga render-funktionen
  const originalRender = res.render;

  // Skapa en ny render-funktion som använder layouten
  res.render = function(view, options = {}) {
    const opts = {
      ...options,
      messages: {
        error: req.flash('error'),
        success: req.flash('success')
      }
    };

    if (view.includes('layouts/')) {
      // Om vyn redan är en layout, rendera den direkt
      return originalRender.call(this, view, opts);
    }

    // Rendera innehållet först
    originalRender.call(this, view, opts, (err, content) => {
      if (err) {
        console.error('Error rendering content:', err);
        return next(err);
      }

      // Sedan rendera layouten med innehållet
      originalRender.call(this, 'layouts/main', {
        ...opts,
        content: content,
        title: opts.title || 'Kino-site',
        user: req.session.user,
        isAuthenticated: !!req.session.user
      });
    });
  };

  next();
};

module.exports = renderWithLayout;
