const Book = require('../models/Book');
const getBooks = async (req, res) => {
try {
const books = await Book.find({ userId: req.user.id });
res.json(books);
} catch (error) {
res.status(500).json({ message: error.message });
}
};

const addBook = async (req, res) => {
    const { title, author, price } = req.body;
    try {
    const book = await Book.create({ userId: req.user.id, title, author,
    price });
    res.status(201).json(book);
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
    };

const updateBook = async (req, res) => {
    const { title, author, price } = req.body;
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        book.title = title || book.title;
        book.author = author || book.author;
        book.price = price || book.price;
        const updatedBook = await book.save();
        res.json(updatedBook);
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
};

const deleteBook = async (req, res) => {
    try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    await book.remove();
    res.json({ message: 'Book deleted' });
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
};

module.exports = { getBooks, addBook, updateBook, deleteBook };