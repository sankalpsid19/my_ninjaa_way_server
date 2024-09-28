const mongoose = require("mongoose");

// Define the schema
const customerOrderSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => new mongoose.Types.ObjectId(), // Equivalent to uuid()
  },
  name: {
    type: String,
    required: true, // Assuming name is required
  },
  lastname: {
    type: String,
    required: true, // Assuming lastname is required
  },
  phone: {
    type: String,
    required: true, // Assuming phone is required
  },
  email: {
    type: String,
    required: true, // Assuming email is required
  },
  company: {
    type: String,
    required: true, // Assuming company is required
  },
  adress: {
    type: String,
    required: true, // Assuming address is required
  },
  apartment: {
    type: String, // Optional field for apartment
  },
  postalCode: {
    type: String,
    required: true, // Assuming postal code is required
  },
  dateTime: {
    type: Date,
    default: Date.now, // Default value as current time
  },
  status: {
    type: String,
    required: true, // Assuming status is required
  },
  city: {
    type: String,
    required: true, // Assuming city is required
  },
  country: {
    type: String,
    required: true, // Assuming country is required
  },
  orderNotice: {
    type: String, // Optional field for order notes
  },
  total: {
    type: Number, // Prisma `Int` maps to JavaScript `Number`
    required: true, // Assuming total is required
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId, // Reference to the customer_order_product model
      ref: "CustomerOrderProduct", // Refers to another schema for the products
    },
  ],
});

// Create the model
const CustomerOrder = mongoose.model("CustomerOrder", customerOrderSchema);

module.exports = CustomerOrder;
