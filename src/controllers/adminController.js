const Movie = require('../models/Movie');
const Showtime = require('../models/Showtime');

// Dashboard översikt
exports.getDashboard = async (req, res) => {
  try {
    const moviesCount = await Movie.countDocuments();
    const showtimesCount = await Showtime.countDocuments();
    const upcomingShowtimes = await Showtime.find({ 
      date: { $gte: new Date() } 
    })
    .sort({ date: 1 })
    .limit(5)
    .populate('movie');    res.render('admin/dashboard', {
      title: 'Admin Dashboard',
      layout: 'layouts/main',
      page: 'admin',
      moviesCount,
      showtimesCount,
      upcomingShowtimes
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    res.status(500).render('pages/error', { 
      error: { 
        status: 500, 
        message: 'Ett fel uppstod vid laddning av dashboard' 
      } 
    });
  }
};

// Film-hantering
exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ title: 1 });
    res.render('admin/movies/index', {
      title: 'Hantera Filmer',
      movies
    });
  } catch (error) {
    res.status(500).render('pages/error', { 
      error: { 
        status: 500, 
        message: 'Kunde inte hämta filmlistan' 
      } 
    });
  }
};

exports.getNewMovieForm = (req, res) => {
  res.render('admin/movies/form', {
    title: 'Lägg till ny film',
    movie: null
  });
};

exports.createMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    req.flash('success', 'Film skapad framgångsrikt');
    res.redirect('/admin/movies');
  } catch (error) {
    res.render('admin/movies/form', {
      title: 'Lägg till ny film',
      movie: req.body,
      error: 'Kunde inte skapa filmen'
    });
  }
};

exports.getEditMovieForm = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).render('pages/error', { 
        error: { 
          status: 404, 
          message: 'Film hittades inte' 
        } 
      });
    }
    res.render('admin/movies/form', {
      title: 'Redigera film',
      movie
    });
  } catch (error) {
    res.status(500).render('pages/error', { 
      error: { 
        status: 500, 
        message: 'Kunde inte hämta filmen' 
      } 
    });
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!movie) {
      return res.status(404).render('pages/error', { 
        error: { 
          status: 404, 
          message: 'Film hittades inte' 
        } 
      });
    }
    req.flash('success', 'Film uppdaterad framgångsrikt');
    res.redirect('/admin/movies');
  } catch (error) {
    res.render('admin/movies/form', {
      title: 'Redigera film',
      movie: { ...req.body, _id: req.params.id },
      error: 'Kunde inte uppdatera filmen'
    });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Film hittades inte' });
    }
    // Ta även bort relaterade visningstider
    await Showtime.deleteMany({ movie: req.params.id });
    req.flash('success', 'Film och tillhörande visningstider borttagna');
    res.redirect('/admin/movies');
  } catch (error) {
    res.status(500).json({ message: 'Kunde inte ta bort filmen' });
  }
};

// Visningstider-hantering
exports.getShowtimes = async (req, res) => {
  try {
    const showtimes = await Showtime.find()
      .populate('movie')
      .sort({ date: 1 });
    res.render('admin/showtimes/index', {
      title: 'Hantera Visningstider',
      showtimes
    });
  } catch (error) {
    res.status(500).render('pages/error', { 
      error: { 
        status: 500, 
        message: 'Kunde inte hämta visningstiderna' 
      } 
    });
  }
};

exports.getNewShowtimeForm = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ title: 1 });
    res.render('admin/showtimes/form', {
      title: 'Lägg till ny visningstid',
      movies,
      showtime: null
    });
  } catch (error) {
    res.status(500).render('pages/error', { 
      error: { 
        status: 500, 
        message: 'Kunde inte ladda filmdata' 
      } 
    });
  }
};

exports.createShowtime = async (req, res) => {
  try {
    const showtime = new Showtime(req.body);
    await showtime.save();
    req.flash('success', 'Visningstid skapad framgångsrikt');
    res.redirect('/admin/showtimes');
  } catch (error) {
    const movies = await Movie.find().sort({ title: 1 });
    res.render('admin/showtimes/form', {
      title: 'Lägg till ny visningstid',
      movies,
      showtime: req.body,
      error: 'Kunde inte skapa visningstiden'
    });
  }
};

exports.getEditShowtimeForm = async (req, res) => {
  try {
    const [showtime, movies] = await Promise.all([
      Showtime.findById(req.params.id).populate('movie'),
      Movie.find().sort({ title: 1 })
    ]);
    
    if (!showtime) {
      return res.status(404).render('pages/error', { 
        error: { 
          status: 404, 
          message: 'Visningstid hittades inte' 
        } 
      });
    }
    
    res.render('admin/showtimes/form', {
      title: 'Redigera visningstid',
      movies,
      showtime
    });
  } catch (error) {
    res.status(500).render('pages/error', { 
      error: { 
        status: 500, 
        message: 'Kunde inte hämta visningstiden' 
      } 
    });
  }
};

exports.updateShowtime = async (req, res) => {
  try {
    const showtime = await Showtime.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!showtime) {
      return res.status(404).render('pages/error', { 
        error: { 
          status: 404, 
          message: 'Visningstid hittades inte' 
        } 
      });
    }
    
    req.flash('success', 'Visningstid uppdaterad framgångsrikt');
    res.redirect('/admin/showtimes');
  } catch (error) {
    const movies = await Movie.find().sort({ title: 1 });
    res.render('admin/showtimes/form', {
      title: 'Redigera visningstid',
      movies,
      showtime: { ...req.body, _id: req.params.id },
      error: 'Kunde inte uppdatera visningstiden'
    });
  }
};

exports.deleteShowtime = async (req, res) => {
  try {
    const showtime = await Showtime.findByIdAndDelete(req.params.id);
    if (!showtime) {
      return res.status(404).json({ message: 'Visningstid hittades inte' });
    }
    req.flash('success', 'Visningstid borttagen');
    res.redirect('/admin/showtimes');
  } catch (error) {
    res.status(500).json({ message: 'Kunde inte ta bort visningstiden' });
  }
};
