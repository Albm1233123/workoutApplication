const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Register new user
const registerUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try{

        // Check if user exists
        const userExists = await User.findOne({email});
        if(userExists) {
            return res.status(400).json({message: 'User already exists'});
        }
        
        // Create and save user
        const user = await User.create({
            firstName,
            lastName,
            email,
            password
        })

        if(user) {
            res.status(200).json({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({message: 'Invalid user data'});
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try{

        // Find user
        const user = await User.findOne({email});

        // Bcrypt compare user password
        if(user && (await user.matchPassword(password))) {
            res.status(200).json({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({message: 'Invalid user name or password'});
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    })
}

module.exports = {registerUser, loginUser};