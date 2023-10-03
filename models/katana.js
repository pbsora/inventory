const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const KatanaSchema = new Schema({
  name: { type: String, required: true },
  imageUrl: {
    type: String,
    default:
      "https://tozandoshop.com/cdn/shop/products/1_000000005587_840x.jpg?v=1648192654",
  },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  inStock: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
});

KatanaSchema.virtual("url").get(function () {
  return `/catalog/katana/${this.id}`;
});

module.exports = mongoose.model("Katana", KatanaSchema);
