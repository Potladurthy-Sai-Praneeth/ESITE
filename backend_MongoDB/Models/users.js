const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name: String,
    userid: { type: String, unique: true, validate: validator.isEmail },
    password: String,
    orders: Number,
    items: Array,
    cart: mongoose.Schema.Types.ObjectId,
    wishlist: mongoose.Schema.Types.ObjectId,
}, { strict: false });

// userSchema.pre("save", function(next) {
//     return next();
// });

module.exports = mongoose.model("Users", userSchema);