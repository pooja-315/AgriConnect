const express = require('express');
const router = express.Router();
const Seed = require('../models/seed');  // Importing the model correctly

// Get all seeds
router.get('/', async (req, res) => {
  try {
    const seeds = await Seed.find();  // Query the 'seeds' collection in 'farmsmart' database
    res.json(seeds);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add bulk data to the seeds collection
router.post('/bulk', async (req, res) => {
  const seedData = req.body;  // Expect an array of seed objects from the request body

  try {
    const insertedSeeds = await Seed.insertMany(seedData);  // Bulk insert the seeds
    res.status(201).json({ message: "Bulk data inserted successfully", data: insertedSeeds });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;


module.exports = router;
