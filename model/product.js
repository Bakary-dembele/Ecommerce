const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  price: mongoose.Decimal128,
  stock: Number,
  picture: String
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
