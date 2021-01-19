const Rol = require("../models/roles");

exports.setRoles = async (req, res, next) => {
  try {
    const count = await Rol.estimatedDocumentCount();
    if (count > 0) {
      return;
    } else {
      const roles = await Promise.all([
        new Rol({ name: "user" }).save(),
        new Rol({ name: "admin" }).save(),
        new Rol({ name: "moderator" }).save(),
      ]);
      console.log(roles);
    }
  } catch (err) {
    console.error(err);
  }
};
