// Import Models
const User = require("../models/user");
const Rol = require("../models/roles");

// Controller

exports.signUp = async (req, res, next) => {
  const { email, password, roles } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) return res.status(500).json({ message: "Email bussy.", email });

    const hashPass = await User.encryptPass(password);
    const newUser = new User({
      email: email,
      password: hashPass,
    });
    if (roles) {
       const foundRoles = await Rol.find({name: {$in: roles }});
       newUser.roles = foundRoles.map(rol => rol._id);
    } else {
        const defaultRol = await Rol.findOne({name: "user"});
        newUser.roles = defaultRol._id;
    }
    const savedUser = await newUser.save();
    res.status(200).json({ message: "Signed!!", user: savedUser });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!!", error: err });
  }
};
