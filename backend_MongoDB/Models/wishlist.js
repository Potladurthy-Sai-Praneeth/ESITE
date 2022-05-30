const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
    products: [{ productId: mongoose.Schema.Types.ObjectId }],
});

module.exports = mongoose.model("Wishlist", wishlistSchema);