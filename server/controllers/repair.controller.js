const repairModel = require("../models/repair.model");

// Get repair services
const getRepairOptions = async (req, res) => {
  try {
    const repairOptions = await repairModel.find();
    res.json(repairOptions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create repair entry
const createRepair = async (req, res) => {
  const { price, location } = req.body;
  try {
    const newRepair = new repairModel({ price, location });
    await newRepair.save();
    res.json(newRepair);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getRepairOptions, createRepair };
