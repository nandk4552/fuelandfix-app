const orderModel = require("../models/order.model");

const userOrderController = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    // Find all orders for the logged-in user
    const orders = await orderModel
      .find({ userId: req.user._id })
      .sort({ createdAt: -1 });
    if (!orders) {
      return res.status(404).send({
        success: true,
        message: "No orders found for this user.",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Orders fetched successfully!",
      totalLength: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders." });
  }
};

const createOrderController = async (req, res) => {
  try {
    const { type, liters, location, latitude, longitude, totalCost } = req.body;

    // Check if the user ID is available
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Create a new order
    const order = new orderModel({
      userId: req.user._id,
      type,
      liters,
      location,
      latitude,
      longitude,
      totalCost,
    });

    await order.save();

    res.status(201).json({ message: "Order placed successfully!", order });
  } catch (error) {
    console.error("Order saving error:", error);
    res.status(500).json({ message: "Failed to place order", error });
  }
};
const getAllOrdersForAdminController = async (req, res) => {
  try {
    const orders = await orderModel
      .find()
      .populate("userId", "name phone")
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};
const updateOrderStatus = async (req, res) => {
  const { id } = req.params; // Get the order ID from the URL
  const { status } = req.body; // Get the new status from the request body

  try {
    // Validate the new status
    const validStatuses = ["completed", "canceled", "pending", "accepted"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status provided" });
    }

    // Find and update the order
    const updatedOrder = await orderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated document
    );

    // Check if order was found and updated
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Respond with the updated order
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const updateUserOrderStatus = async (req, res) => {
  const { id } = req.params; // Get the order ID from the URL
  const { status } = req.body; // Get the new status from the request body
  const userId = req.user?._id; // Assume user ID is available in req.user

  try {
    // Validate the new status
    const validStatuses = ["canceled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status provided" });
    }

    // Find the order by ID
    const order = await orderModel.findById(id);

    // Check if order was found
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to cancel this order" });
    }

    // Update the order status
    order.status = status; // Set the new status
    const updatedOrder = await order.save(); // Save the updated order

    // Respond with the updated order
    return res.status(200).send({
      success: true,
      message: "Order status updated successfully",
      updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = {
  userOrderController,
  createOrderController,
  getAllOrdersForAdminController,
  updateOrderStatus,
  updateUserOrderStatus,
};
