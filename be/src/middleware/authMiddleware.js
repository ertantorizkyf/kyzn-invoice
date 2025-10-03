// be/src/middleware/authMiddleware.js
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

/**
 * API Key Authentication Middleware
 * Checks if the X-API-KEY header matches the STATIC_API_KEY from environment
 */
export const apiKeyAuth = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  const staticApiKey = process.env.STATIC_API_KEY;

  // Check if API key is provided
  if (!apiKey) {
    return res.status(401).json({
      success: false,
      message: "API key is required. Please provide X-API-KEY header."
    });
  }

  // Check if STATIC_API_KEY is configured
  if (!staticApiKey) {
    console.error("❌ STATIC_API_KEY is not configured in environment variables");
    return res.status(500).json({
      success: false,
      message: "Server configuration error"
    });
  }

  // Compare API keys
  if (apiKey !== staticApiKey) {
    return res.status(403).json({
      success: false,
      message: "Invalid API key"
    });
  }

  // API key is valid, proceed to next middleware/route
  next();
};
