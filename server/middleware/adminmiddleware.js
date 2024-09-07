// Middleware to check if user is an admin
const adminMiddleware = async (req, res, next) => {
  try{
    console.log(req.user)
    const user = req.user;  // Get the user from the authMiddleware

  if (user.isAdmin) {
    next();  // Allow access if the user is an admin
  } else {
    return res.status(403).json({ msg: "Access denied. Admins only." });
  }
}catch(error){
  next(error);
}
};

module.exports = adminMiddleware;
