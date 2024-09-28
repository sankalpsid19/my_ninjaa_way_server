const mongoose = require("mongoose");

// Define the schema
const customerOrderProductSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => new mongoose.Types.ObjectId(), // Equivalent to uuid()
  },
  customerOrderId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to CustomerOrder model
    ref: "CustomerOrder",
    required: true, // Assuming each product must be associated with an order
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to Product model
    ref: "Product",
    required: true, // Assuming each entry must refer to a product
  },
  quantity: {
    type: Number, // Prisma's `Int` is a `Number` in JavaScript
    required: true, // Quantity should be mandatory
  },
});

// Create the model
const CustomerOrderProduct = mongoose.model(
  "CustomerOrderProduct",
  customerOrderProductSchema
);

module.exports = CustomerOrderProduct;
