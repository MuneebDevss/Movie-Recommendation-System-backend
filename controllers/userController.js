const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const alreadyRegisterd=await User.findOne({email});
        if(alreadyRegisterd)
            res.status(500).json({ message: "User is Already registered" });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword,role });
        await user.save();
        res.status(201).json({ message: "SuccessFully Register" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate the token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    // Send the token in the response
    res.json({ token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
;

// Get user profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
    try {
        const updatedData = req.body;
        const user = await User.findByIdAndUpdate(req.user.id, updatedData, { new: true }).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a movie to wishlist
exports.addToWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.wishlist.push(req.params.movieId);
        await user.save();
        res.json({ message: 'Movie added to wishlist' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove a movie from wishlist
exports.removeFromWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.wishlist = user.wishlist.filter(movieId => movieId.toString() !== req.params.movieId);
        await user.save();
        res.json({ message: 'Movie removed from wishlist' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
