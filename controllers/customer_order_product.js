const CustomerOrderProduct = require("../models/CustomerOrderProduct");
const connectToDatabase = require("../lib/mongodb");

async function createOrderProduct(req, res) {
  await connectToDatabase();
  try {
    const { customerOrderId, productId, quantity } = req.body;
    const orderProduct = await CustomerOrderProduct.create({
      customerOrderId,
      productId,
      quantity,
    });
    return res.status(201).json(orderProduct);
  } catch (error) {
    console.error("Error creating product order:", error);
    return res.status(500).json({ error: "Error creating product order" });
  }
}
async function updateProductOrder(req, res) {
  await connectToDatabase();
  try {
    const { id } = req.params;
    const { customerOrderId, productId, quantity } = req.body;

    const existingOrder = await CustomerOrderProduct.findById(id);
    if (!existingOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    existingOrder.customerOrderId = customerOrderId;
    existingOrder.productId = productId;
    existingOrder.quantity = quantity;
    const updatedOrder = await existingOrder.save();

    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    return res.status(500).json({ error: "Error updating order" });
  }
}
async function deleteProductOrder(req, res) {
  await connectToDatabase();
  try {
    const { id } = req.params;
    await CustomerOrderProduct.deleteMany({ customerOrderId: id });
    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting product orders:", error);
    return res.status(500).json({ error: "Error deleting product orders" });
  }
}
async function getProductOrder(req, res) {
  await connectToDatabase();
  try {
    const { id } = req.params;
    const order = await CustomerOrderProduct.find({
      customerOrderId: id,
    }).populate("productId");
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    return res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching product order:", error);
    return res.status(500).json({ error: "Error fetching product order" });
  }
}
async function getAllProductOrders(req, res) {
  await connectToDatabase();
  try {
    const productOrders = await CustomerOrderProduct.find({})
      .populate("productId")
      .populate("customerOrderId");

    const ordersMap = new Map();

    for (const order of productOrders) {
      const { customerOrderId, productId, quantity } = order;

      if (ordersMap.has(customerOrderId._id)) {
        ordersMap
          .get(customerOrderId._id)
          .products.push({ ...productId.toObject(), quantity });
      } else {
        ordersMap.set(customerOrderId._id, {
          customerOrderId: customerOrderId._id,
          customerOrder: customerOrderId.toObject(),
          products: [{ ...productId.toObject(), quantity }],
        });
      }
    }

    const groupedOrders = Array.from(ordersMap.values());
    return res.json(groupedOrders);
  } catch (error) {
    console.error("Error fetching all product orders:", error);
    return res.status(500).json({ error: "Error fetching all product orders" });
  }
}

module.exports = {
  getAllProductOrders,
  getProductOrder,
  deleteProductOrder,
  updateProductOrder,
  createOrderProduct,
};
