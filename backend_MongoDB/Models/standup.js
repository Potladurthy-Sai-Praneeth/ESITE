const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: String,
  prodname: String,
  price: Number,
  content: String,
  image: String,
  popularity: String,
  category: String,
});

module.exports = mongoose.model("Products", productSchema);
