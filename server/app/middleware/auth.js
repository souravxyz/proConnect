import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    // ✅ Check cookie first (from browser)
    if (req.cookies?.token) {
      token = req.cookies.token;
    }
    // ✅ Fallback to Bearer token (for API tools like Postman)
    else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
