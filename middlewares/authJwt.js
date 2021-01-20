// Packages
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Rol = require("../models/roles");

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    const SECRET = process.env.SECRET;

    if (!token) {
      return res.status(403).json({ message: "Token not found." });
    }
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.id;

    const user = await User.findById(req.userId, { password: 0 });
    if (!user) {
      return res.status(404).json({ message: "No user found." });
    }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized." });
  }
};

/* Terminar de ajustar los roles */

exports.isModerator = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Rol.find({ _id: { $in: user.roles } });
    console.log(roles);

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "moderator") {
        next();
        return;
      }
    }

    return res.status(403).json({ message: "Require moderator role." });
  } catch (err) {
    console.log(err);
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Rol.find({ _id: { $in: user.roles } });
    console.log(roles);

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        next();
        return;
      }
    }

    return res.status(403).json({ message: "Require Admin role." });
  } catch (err) {
    console.log(err);
  }
};
