// Import Models
const User = require("../models/user");
const Rol = require("../models/roles");

// Controller

exports.signUp = async (req, res, next) => {
  const { email, password, roles } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    res.status(500).json({ message: "Email bussy.", email });
  } else {
    try {
      const hashPass = await User.encryptPass(password);
      const newUser = new User({
        email: email,
        password: hashPass,
      });
      const savedUser = await newUser.save();
      res.status(200).json({ message: "Signed!!", user: savedUser });
    } catch (err) {
      res.status(500).json({ message: "Something went wrong!!", error: err });
    }
  }
};
