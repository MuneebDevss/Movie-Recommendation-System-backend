const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
      next();
  } else {
      res.status(403).json({ message: 'Admin Access Required' });
  }
};

module.exports = authorizeAdmin;
