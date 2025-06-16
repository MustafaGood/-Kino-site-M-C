const Showtime = require('../models/Showtime');
const Movie = require('../models/Movie');

// GET /visningar?search=&date=&sort=
exports.listShowtimes = async (req, res) => {
  try {
    const { search, date, sort } = req.query;
    
    // Build query object
    let query = {};
    
    // Search by movie title (case-insensitive)
    if (search) {
      query.movieTitle = { $regex: search, $options: 'i' };
    }
    
    // Filter by date
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      
      query.date = {
        $gte: startDate,
        $lt: endDate
      };
    }
    
    // Build sort object
    let sortOption = {};
    switch (sort) {
      case 'date':
        sortOption.date = 1; // Earliest first
        break;
      case 'time':
        sortOption.time = 1; // Earliest time first
        break;
      case 'price':
        sortOption.price = 1; // Lowest price first
        break;
      default:
        sortOption.date = 1; // Default: earliest date first
    }
    
    // Execute query with sorting
    const showtimes = await Showtime.find(query)
      .populate('movieId')
      .sort(sortOption);
    
    res.render('pages/showtimes', { 
      showtimes,
      search,
      date,
      sort
    });
  } catch (err) {
    console.error('Error in listShowtimes:', err);
    res.status(500).render('pages/error', { 
      error: 'Ett fel uppstod vid hämtning av visningar',
      page: 'error'
    });
  }
};

// GET /visningar/:id
exports.showtimeDetails = async (req, res) => {
  try {
    const showtime = await Showtime.findById(req.params.id).populate('movieId');
    if (!showtime) {
      return res.status(404).render('pages/404', { 
        title: 'Visning ej hittad', 
        page: '404' 
      });
    }
    res.render('pages/showtimeDetails', { 
      showtime,
      page: 'showtimeDetails'
    });
  } catch (err) {
    console.error('Error in showtimeDetails:', err);
    res.status(500).render('pages/error', { 
      error: 'Ett fel uppstod vid hämtning av visningsdetaljer',
      page: 'error'
    });
  }
};
