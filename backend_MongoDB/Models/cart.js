const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    products: [{ productId: mongoose.Schema.Types.ObjectId, quantity: Number, price: Number }],
});

module.exports = mongoose.model("Cart", cartSchema);