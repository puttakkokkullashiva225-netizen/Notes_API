const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER
const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      phone,
      password: hashedPassword,
    });

    await newUser.save();

    res.redirect("/login");
  } catch (error) {
    res.status(500).send("Error registering user");
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFound = await User.findOne({ email });

    if (!userFound) {
      return res.send("Invalid username or password");
    }

    const passwordMatch = await bcrypt.compare(password, userFound.password);

    if (!passwordMatch) {
      return res.send("Invalid username or password");
    }

    const token = jwt.sign(
      {
        email: userFound.email,
        userID: userFound._id,
      },
      "anykey",
      {
        expiresIn: "3d",
      },
    );

    res.cookie("token", token, {
      maxAge: 3 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    res.redirect("/dashboard");
  } catch (error) {
    res.status(500).send("Error logging in");
  }
};

// LOGOUT
const logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};

module.exports = {
  register,
  login,
  logout,
};
