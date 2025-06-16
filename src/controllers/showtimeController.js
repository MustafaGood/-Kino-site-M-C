const Showtime = require('../models/Showtime');
const NodeCache = require('node-cache');
const showtimeCache = new NodeCache({ stdTTL: 300 }); // 5 min cache

// GET /visningar?search=&date=&sort=
exports.listShowtimes = async (req, res) => {
  try {
    const { search, date, sort } = req.query;
    const cacheKey = date ? `showtimes_${date}` : 'showtimes_all';
    let showtimes = showtimeCache.get(cacheKey);

    if (!showtimes) {
      let query = {};

      // Sök på filmtitel (case-insensitive)
      if (search) {
        query.movieTitle = { $regex: search, $options: 'i' };
      }

      // Filtrera på datum
      if (date) {
        const startDate = new Date(date);
        const endDate = new Date(date);
        endDate.setDate(endDate.getDate() + 1);
        query.datetime = { $gte: startDate, $lt: endDate };
      }

      // Hämta visningar
      showtimes = await Showtime.find(query)
        .populate('movie')
        .sort({ datetime: 1 })
        .lean();

      showtimeCache.set(cacheKey, showtimes);
    }

    // Gruppera visningar per dag
    const groupedShowtimes = {};
    showtimes.forEach(st => {
      const dateKey = new Date(st.datetime).toISOString().split('T')[0];
      if (!groupedShowtimes[dateKey]) groupedShowtimes[dateKey] = [];
      groupedShowtimes[dateKey].push(st);
    });

    res.render('pages/showtimes', {
      groupedShowtimes,
      search,
      date,
      sort
    });
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).render('pages/error', {
      error: 'Serverfel vid hämtning av visningar',
      page: 'error'
    });
  }
};

// GET /visningar/:id
exports.showtimeDetails = async (req, res) => {
  try {
    const showtime = await Showtime.findById(req.params.id)
      .populate('movie')
      .lean();

    if (!showtime) {
      return res.status(404).render('pages/404', {
        error: 'Visning ej hittad',
        page: '404'
      });
    }

    res.render('pages/showtimeDetails', {
      showtime,
      page: 'showtimeDetails'
    });
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).render('pages/error', {
      error: 'Serverfel vid hämtning av visning',
      page: 'error'
    });
  }
};
