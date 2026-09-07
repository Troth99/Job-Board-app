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

/**
 * Blocks the demo account from destructive/mutating actions (delete, update, etc.).
 * Apply after `protect` on routes that should stay read-only for the demo user.
 */
export const blockDemoWrite = (req, res, next) => {
  if (req.user?.isDemo) {
    return res.status(403).json({ message: "This action is disabled for the demo account." });
  }
  next();
};