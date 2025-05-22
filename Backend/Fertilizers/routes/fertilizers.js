const mongoose = require('mongoose');
require('dotenv').config();

const Fertilizer = require('../models/fertilizer');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const fertilizers = [
  { name: "Urea", amt: 300, pic: "https://res.cloudinary.com/demo/image/upload/v1716350001/urea.jpg" },
  { name: "DAP (Diammonium Phosphate)", amt: 450, pic: "https://res.cloudinary.com/demo/image/upload/v1716350001/dap.jpg" },
  { name: "MOP (Muriate of Potash)", amt: 400, pic: "https://res.cloudinary.com/demo/image/upload/v1716350001/mop.jpg" },
  { name: "NPK 20-20-0", amt: 420, pic: "https://res.cloudinary.com/demo/image/upload/v1716350001/npk20200.jpg" },
  { name: "Compost", amt: 150, pic: "https://res.cloudinary.com/demo/image/upload/v1716350001/compost.jpg" },
  { name: "Vermicompost", amt: 180, pic: "https://res.cloudinary.com/demo/image/upload/v1716350001/vermicompost.jpg" },
  { name: "Cow Manure", amt: 130, pic: "https://res.cloudinary.com/demo/image/upload/v1716350001/cowmanure.jpg" },
  { name: "Bone Meal", amt: 250, pic: "https://res.cloudinary.com/demo/image/upload/v1716350001/bonemeal.jpg" },
  { name: "Seaweed Extract", amt: 500, pic: "https://res.cloudinary.com/demo/image/upload/v1716350001/seaweed.jpg" },
  { name: "Fish Emulsion", amt: 470, pic: "https://res.cloudinary.com/demo/image/upload/v1716350001/fishemulsion.jpg" }
];

const insertData = async () => {
  try {
    await Fertilizer.deleteMany(); // Optional: clear old data
    await Fertilizer.insertMany(fertilizers);
    console.log("Fertilizers inserted successfully!");
    mongoose.disconnect();
  } catch (err) {
    console.error("Insert error:", err);
  }
};

insertData();
