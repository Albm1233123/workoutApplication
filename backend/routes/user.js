const express = require('express');
const {registerUser, loginUser, getProfile} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleWare');

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

// Will get users own profile
router.get('/profile', protect, getProfile);

module.exports = router;