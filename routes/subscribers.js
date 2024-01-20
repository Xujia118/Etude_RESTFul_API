const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscriber");

// Get all
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one
router.get("/:id", async (req, res) => {
  try {
    // This is the same for all :id
    const subscriber = await Subscriber.findOne({
      _id: req.params.id,
    });

    if (subscriber) {
      res.json(subscriber);
    } else {
      res.status(404).json({ message: "Subscriber not found" });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// Post
router.post("/", async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel,
  });

  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const subscriber = await Subscriber.deleteOne({ _id: req.params.id });
    if (subscriber) {
      res.json("Subscriber deleted");
    } else {
      res.status(404).json({ message: "Subscriber not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update
router.patch("/:id", async (req, res) => {
  try {
    const subscriber = await Subscriber.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );

    if (subscriber) {
      res.json("Subscriber updated");
    } else {
      res.status(404).json({ message: "Subscriber not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.mess });
  }
});

module.exports = router;
