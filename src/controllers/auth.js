// ********************************************* JSONWebToken
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

// ******************************************* Import Models
const User = require("../models/user");
const Rol = require("../models/roles");

// *************************************** Import validators
const { validationResult } = require("express-validator");

// ********************************************* Controllers
exports.signUp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ message: "Something went wrong", errors });
  }
  const { email, password, roles } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) return res.status(401).json({ message: "Email bussy.", email });

    const hashPass = await User.encryptPass(password);
    const newUser = new User({
      email: email,
      password: hashPass,
    });
    if (roles) {
      const foundRoles = await Rol.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((rol) => rol._id);
    } else {
      const defaultRol = await Rol.findOne({ name: "user" });
      newUser.roles = defaultRol._id;
    }
    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, SECRET, {
      expiresIn: 14400,
    });

    return res.status(201).json({ message: "User created!", token: token });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong!!", error: err });
  }
};

exports.signIn = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ message: "Something went wrong", errors });
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email }).populate("roles");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const passEquals = await User.comparePass(password, user.password);
    if (!passEquals) {
      return res.status(401).json({ message: "Password must match!." });
    }

    const token = jwt.sign({ id: user._id }, SECRET, {
      expiresIn: 14400,
    });

    return res.status(200).json({ message: " Your user!!", token: token });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong!!", error: err });
  }
};
