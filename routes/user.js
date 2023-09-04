const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Address = require("../models/Address");

router.post("/register", async (req, res) => {
  try {
    const { name, street, city } = req.body;

    const user = new User({ name });
    await user.save();

    const address = new Address({ street, city });
    await address.save();

    user.address = address;
    await user.save();

    res.status(201).json({ user, address });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
