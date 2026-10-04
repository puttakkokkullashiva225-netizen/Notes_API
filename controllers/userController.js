const User = require("../models/users");

// GET PROFILE
const getProfile = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.user.email,
    });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.render("profile", { user });
  } catch (error) {
    res.status(500).send("Error fetching profile");
  }
};

// UPDATE PROFILE
const updateProfile = async (req, res) => {
  try {
    const { username, email, phone } = req.body;

    const profile = await User.findOneAndUpdate(
      {
        email: req.user.email,
      },
      {
        username,
        email,
        phone,
      },
      {
        new: true,
      },
    );

    if (!profile) {
      return res.status(404).send("User not found");
    }

    res.redirect("/profile");
  } catch (error) {
    res.status(500).send("Error updating profile");
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
