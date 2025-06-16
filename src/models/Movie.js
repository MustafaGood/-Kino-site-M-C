const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Titel är obligatorisk'],
    trim: true,
    minlength: [2, 'Titeln måste vara minst 2 tecken'],
    maxlength: [100, 'Titeln får inte vara längre än 100 tecken']
  },
  description: { 
    type: String, 
    required: [true, 'Beskrivning är obligatorisk'],
    trim: true,
    minlength: [10, 'Beskrivningen måste vara minst 10 tecken'],
    maxlength: [2000, 'Beskrivningen får inte vara längre än 2000 tecken']
  },
  genre: [{ 
    type: String, 
    required: [true, 'Minst en genre krävs'],
    enum: {
      values: ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller'],
      message: '{VALUE} är inte en giltig genre'
    }
  }],
  director: { 
    type: String,
    trim: true,
    maxlength: [100, 'Regissörens namn får inte vara längre än 100 tecken']
  },
  actors: [{ 
    type: String,
    trim: true,
    maxlength: [100, 'Skådespelarens namn får inte vara längre än 100 tecken']
  }],
  duration: { 
    type: Number,
    min: [1, 'Filmen måste vara minst 1 minut lång'],
    max: [300, 'Filmen får inte vara längre än 300 minuter']
  },
  releaseDate: { 
    type: Date,
    validate: {
      validator: function(v) {
        return v <= new Date();
      },
      message: 'Utgivningsdatumet kan inte vara i framtiden'
    }
  },
  rating: { 
    type: String,
    enum: {
      values: ['Barntillåten', '7+', '11+', '15+'],
      message: '{VALUE} är inte en giltig åldersgräns'
    }
  },
  posterUrl: { 
    type: String,
    validate: {
      validator: function(v) {
        return !v || v.startsWith('http');
      },
      message: 'Poster URL måste börja med http'
    }
  },
  trailer: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || v.startsWith('http');
      },
      message: 'Trailer URL måste börja med http'
    }
  },
  averageRating: {
    type: Number,
    min: [0, 'Betyget kan inte vara lägre än 0'],
    max: [5, 'Betyget kan inte vara högre än 5'],
    default: 0
  },
  reviewCount: {
    type: Number,
    min: 0,
    default: 0
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Update the updatedAt timestamp before saving
MovieSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Movie', MovieSchema);
