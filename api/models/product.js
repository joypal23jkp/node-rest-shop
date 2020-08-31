var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
  id: mongoose.Schema.Types.ObjectId,
  name:  String, // String is shorthand for {type: String}
  price: Number,
  productImage: { type: String, required: true }
});

var product = mongoose.model('Product', productSchema)

module.exports = product