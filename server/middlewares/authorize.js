const authorize = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Super Admin has access to everything
    if (req.user.role === "super_admin") {
      return next();
    }

    // Admin only allowed where explicitly permitted
    if (req.user.role === requiredRole) {
      return next();
    }

    return res.status(403).json({
      message: "Access denied",
    });
  };
};

module.exports = authorize;
