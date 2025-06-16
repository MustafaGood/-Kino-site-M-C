const Movie = require('../models/Movie');
const { deleteOldPoster } = require('../utils/imageUpload');

// GET /movies?search=&genre=&sort=
exports.listMovies = async (req, res) => {
  try {
    const { search, genre, sort } = req.query;
    const query = {};

    // Search by title
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    // Filter by genre
    if (genre) {
      query.genre = genre;
    }

    // Build sort object
    let sortOption = {};
    switch (sort) {
      case 'title':
        sortOption = { title: 1 };
        break;
      case 'releaseDate':
        sortOption = { releaseDate: -1 };
        break;
      case 'rating':
        sortOption = { averageRating: -1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    // Get unique genres for filter dropdown
    const genres = await Movie.distinct('genre');

    // Get movies with pagination
    const page = parseInt(req.query.page) || 1;
    const limit = 12;
    const skip = (page - 1) * limit;

    const movies = await Movie.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    const total = await Movie.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    res.render('pages/movies', {
      title: 'Filmer',
      movies,
      genres,
      currentPage: page,
      totalPages,
      search: search || '',
      selectedGenre: genre || '',
      selectedSort: sort || '',
      error: null
    });
  } catch (error) {
    console.error('Error in listMovies:', error);
    res.render('pages/movies', {
      title: 'Filmer',
      movies: [],
      genres: [],
      currentPage: 1,
      totalPages: 1,
      search: '',
      selectedGenre: '',
      selectedSort: '',
      error: 'Ett fel uppstod vid hämtning av filmer'
    });
  }
};

// GET /movies/:id
exports.movieDetails = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).render('pages/404', { 
        title: 'Film ej hittad', 
        page: '404' 
      });
    }
    res.render('pages/movieDetails', { 
      movie,
      page: 'movieDetails'
    });
  } catch (err) {
    console.error('Error in movieDetails:', err);
    res.status(500).render('pages/error', { 
      error: 'Ett fel uppstod vid hämtning av filmdetaljer',
      page: 'error'
    });
  }
};

// Create new movie
exports.createMovie = async (req, res) => {
  try {
    const movieData = req.body;
    
    // Handle poster upload
    if (req.file) {
      movieData.posterUrl = '/uploads/posters/' + req.file.filename;
    }

    const movie = new Movie(movieData);
    await movie.save();

    res.redirect(`/filmer/${movie._id}`);
  } catch (error) {
    console.error('Error in createMovie:', error);
    res.status(400).render('pages/movies/new', {
      title: 'Ny Film',
      movie: req.body,
      error: 'Ett fel uppstod vid skapande av film'
    });
  }
};

// Update movie
exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).render('pages/404', {
        title: 'Film hittades inte',
        message: 'Den sökta filmen kunde inte hittas'
      });
    }

    const movieData = req.body;

    // Handle poster upload
    if (req.file) {
      // Delete old poster if exists
      deleteOldPoster(movie.posterUrl);
      movieData.posterUrl = '/uploads/posters/' + req.file.filename;
    }

    Object.assign(movie, movieData);
    await movie.save();

    res.redirect(`/filmer/${movie._id}`);
  } catch (error) {
    console.error('Error in updateMovie:', error);
    res.status(400).render('pages/movies/edit', {
      title: 'Redigera Film',
      movie: req.body,
      error: 'Ett fel uppstod vid uppdatering av film'
    });
  }
};

// Delete movie
exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).render('pages/404', {
        title: 'Film hittades inte',
        message: 'Den sökta filmen kunde inte hittas'
      });
    }

    // Delete poster file if exists
    deleteOldPoster(movie.posterUrl);

    await movie.remove();
    res.redirect('/filmer');
  } catch (error) {
    console.error('Error in deleteMovie:', error);
    res.status(500).render('pages/error', {
      title: 'Server Error',
      message: 'Ett fel uppstod vid borttagning av film'
    });
  }
};
