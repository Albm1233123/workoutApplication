const User = require('../models/userModel');

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
                password: user.password
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
            });
        } else {
            res.status(400).json({message: 'Invalid user name or password'});
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

module.exports = {registerUser, loginUser};