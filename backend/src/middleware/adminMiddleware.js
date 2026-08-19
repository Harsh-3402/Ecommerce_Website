const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    const error = new Error(
      "Access denied. Admin only."
    );

    error.statusCode = 403;

    throw error;
  }
};

module.exports = adminMiddleware;