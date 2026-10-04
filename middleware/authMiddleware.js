const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token; //acess the token

    if (!token) {
      return res.status(401).send("Please login"); //check the token
    }

    const decoded = jwt.verify(token, "anykey"); //verify the token key

    req.user = decoded; //asinging that it decoded

    next();
  } catch (error) {
    res.status(401).send("Invalid or expired token");
  }
};

module.exports = authMiddleware;
