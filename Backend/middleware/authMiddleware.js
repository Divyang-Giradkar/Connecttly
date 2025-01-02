const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace("Bearer ", "") ;
  if (!token){
   return res.status(403).json({ message: 'Access denied' });  
  }
    

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user  = verified ;
    req.userId = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
  next();
};

module.exports = { verifyToken, isAdmin };
