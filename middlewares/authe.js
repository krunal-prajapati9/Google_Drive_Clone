const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.cookies.jsontoken;

  if (!token) {
    return res.status(401).json({
      message: "unauthorized",
    });
  }

  try {
    const decod = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decod;
    return next();
  } catch (err) {
    return res.status(401).json({
      message: "unauthorized",
    });
  }
}

module.exports = auth;
