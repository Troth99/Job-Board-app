import jwt from "jsonwebtoken";
import User from '../models/User.js'


/**
 * Middleware for protecting routes with JWT
 */

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    // Don't log "jwt expired" errors - they're normal during token refresh
    if (error.name !== 'TokenExpiredError') {
      console.error("Auth error:", error.message);
    }
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};