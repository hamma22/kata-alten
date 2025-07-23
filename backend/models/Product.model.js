const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const productSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    category: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 0 },
    internalReference: { type: String },
    shellId: { type: Number },
    inventoryStatus: {
      type: String,
      enum: ["INSTOCK", "LOWSTOCK", "OUTOFSTOCK"],
      default: "INSTOCK",
    },
    rating: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

// Automatically set inventoryStatus based on quantity
productSchema.pre("save", function (next) {
  if (this.quantity === 0) {
    this.inventoryStatus = "OUTOFSTOCK";
  } else if (this.quantity < 10) {
    this.inventoryStatus = "LOWSTOCK";
  } else {
    this.inventoryStatus = "INSTOCK";
  }

  next();
});

productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Product", productSchema);
