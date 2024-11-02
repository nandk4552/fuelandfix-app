// routes/orders.js
const express = require("express");
const router = express.Router();
const { requireSignIn, setUser } = require("../controllers/user.controller");
const {
  userOrderController,
  createOrderController,
  getAllOrdersForAdminController,
  updateOrderStatus,
  updateUserOrderStatus,
} = require("../controllers/order.controller");
const { roleMiddleware } = require("../middlewares/authMiddleware");

router.post("/", requireSignIn, setUser, createOrderController);
router.get(
  "/all-orders",
  requireSignIn,
  setUser,
  getAllOrdersForAdminController
);

router.get("/my-orders", requireSignIn, setUser, userOrderController);

router.put(
  "/:id/status",
  requireSignIn,
  setUser,
  roleMiddleware(["admin"]),
  updateOrderStatus
);

router.put(
  "/:id/userstatus",
  requireSignIn,
  setUser,
  roleMiddleware(["user"]),
  updateUserOrderStatus
);

module.exports = router;
