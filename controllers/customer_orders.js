const CustomerOrder = require("../models/CategoryModel");
const connectToDatabase = require("../lib/mongodb");

async function createCustomerOrder(req, res) {
  await connectToDatabase();
  try {
    const {
      name,
      lastname,
      phone,
      email,
      company,
      address,
      apartment,
      postalCode,
      status,
      city,
      country,
      orderNotice,
      total,
    } = req.body;

    const customerOrder = new CustomerOrder({
      name,
      lastname,
      phone,
      email,
      company,
      address,
      apartment,
      postalCode,
      status,
      city,
      country,
      orderNotice,
      total,
    });

    const savedOrder = await customerOrder.save();
    return res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ error: "Error creating order" });
  }
}
async function updateCustomerOrder(req, res) {
  await connectToDatabase();
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedOrder = await CustomerOrder.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    return res.status(500).json({ error: "Error updating order" });
  }
}
async function deleteCustomerOrder(req, res) {
  await connectToDatabase();
  try {
    const { id } = req.params;

    const deletedOrder = await CustomerOrder.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting order:", error);
    return res.status(500).json({ error: "Error deleting order" });
  }
}
async function getCustomerOrder(req, res) {
  await connectToDatabase();
  try {
    const { id } = req.params;

    const order = await CustomerOrder.findById(id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    return res.status(500).json({ error: "Error fetching order" });
  }
}
async function getAllOrders(req, res) {
  await connectToDatabase();
  try {
    const orders = await CustomerOrder.find({});
    return res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ error: "Error fetching orders" });
  }
}

module.exports = {
  updateCustomerOrder,
  createCustomerOrder,
  deleteCustomerOrder,
  getAllOrders,
  getCustomerOrder,
};
