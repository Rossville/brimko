const jwt = require("jsonwebtoken");

/**
 * @desc Middleware to generate JWT token.
 */
async function generateToken(req, res, next) {
  try {
    const { username, email } = req.body;
    if (!username && !email)
      return res.status(400).json({
        msg: "User and email are required",
      });
    const token = jwt.sign({ username, email }, process.env.JWT_SECRET, {
      expiresIn: 1000 * 60 * 60 * 24 * 7,
    }); // expiration : 1 week
    req.token = token;
    console.log(token);
    next();
  } catch (err) {
    console.log(err.stack);
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
}

/**
 * @desc Middleware to verify if the token is correct and valid(not expired).
 */
async function verifyToken(req, res, next) {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    if (!token)
      res.status(400).json({
        msg: "Unauthorized user found",
      });
    const {username, email} = jwt.verify(token, process.env.JWT_SECRET);
    req.token = {username, email};
    next();
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
}

module.exports = {
  generateToken,
  verifyToken,
};
