const User = require('../models/User');

exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    const user = new User({ username, password });
    await user.save();
    req.session.userId = user._id;
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    req.session.userId = user._id;
    res.json({ message: 'Login successful' });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    req.session.destroy();
    res.json({ message: 'Logout successful' });
  } catch (error) {
    next(error);
  }
};

exports.checkAuth = async (req, res, next) => {
  try {
    res.json({ isAuthenticated: !!req.session.userId });
  } catch (error) {
    next(error);
  }
};