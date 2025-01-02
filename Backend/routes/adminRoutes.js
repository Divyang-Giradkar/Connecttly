const express = require('express');
const { signup, login } = require('../Controller/AdminController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.get('/dashboard', verifyToken, isAdmin, (req, res) => {
  res.status(200).json({ message: 'Welcome to the Admin Dashboard!' });
});

module.exports = router;
