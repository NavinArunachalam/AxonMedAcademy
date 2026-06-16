const mongoose = require('mongoose');

const contactDetailSchema = new mongoose.Schema({
  phone:   { type: String, default: '' },
  email:   { type: String, default: '' },
  hours:   { type: String, default: '' },
  address: { type: String, default: '' }
}, {
  timestamps: true
});

module.exports = mongoose.model('ContactDetail', contactDetailSchema);
