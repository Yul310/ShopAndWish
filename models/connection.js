require("dotenv").config(); // Load ENV Variables
const mongoose = require("mongoose")


/////////////////////////////////////////////
// Database Connection
/////////////////////////////////////////////

// Setup inputs for our connect function

const MONGODB_URI = process.env.MONGODB_URI;
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};


//Establish Connection
mongoose.connect(MONGODB_URI,CONFIG);


// Events for when connection opens/disconnects/errors
mongoose.connection
  .on("open", () => console.log(`Mongoose connected to ${mongoose.connection.host}:${mongoose.connection.port}`))
  .on("close", () => console.log("Disconnected from Mongoose"))
  .on("error", (error) => console.log("Could not connect to MongoDB!"));

  
////////////////////////////////////////////////////
// Export the Connection
////////////////////////////////////////////////////

module.exports = mongoose;