const Movie = require('../models/Movie');

// GET /movies?search=&genre=&sort=
exports.listMovies = async (req, res) => {
  try {
    const { search, genre, sort } = req.query;
    let query = {};
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    if (genre) {
      query.genre = genre;
    }
    let sortOption = {};
    if (sort === 'title') sortOption.title = 1;
    else if (sort === 'releaseDate') sortOption.releaseDate = -1;
    else if (sort === 'rating') sortOption.rating = -1;
    const movies = await Movie.find(query).sort(sortOption);
    res.render('pages/movies', { movies, search, genre, sort });
  } catch (err) {
    res.status(500).render('pages/error', { error: err.message });
  }
};
