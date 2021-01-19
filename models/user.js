const mongoose = require("mongoose");
mongoose.pluralize(null);
const Schema = mongoose.Schema;

const bcrypt = require("bcrypt");

const userSchema = new Schema({
    email: {
        type: String, 
        required: true,
    }, 
    password: {
        type: String, 
        required: true,
    }, 
    roles: [
        {
            ref: "Rol", 
            type: Schema.Types.ObjectId
        }
    ]
});

userSchema.statics.encryptPass = (password) => {
    const hashedPass = bcrypt.hash(password, 12);
    return hashedPass;
};

module.exports = mongoose.model("User", userSchema);