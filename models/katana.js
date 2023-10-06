const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const KatanaSchema = new Schema({
  name: { type: String, required: true },
  imageUrl: {
    type: String,
  },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  inStock: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
});

KatanaSchema.virtual("url").get(function () {
  return `/katana/${this.id}`;
});

module.exports = mongoose.model("Katana", KatanaSchema);
