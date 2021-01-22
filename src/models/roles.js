const mongoose = require("mongoose");
mongoose.pluralize(null);
const Schema = mongoose.Schema;



const rolSchema = new Schema({
    name: {
        type: String, 
        required: true
    }
});

module.exports = mongoose.model("Rol", rolSchema);