const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    author: { type: String },
    price: { type: String}
});

module.exports = mongoose.model('Book', bookSchema);