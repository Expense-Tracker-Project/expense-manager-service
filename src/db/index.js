const mongoose = require("mongoose")
mongoose.connect("mongodb://0.0.0.0:27017/expense-tracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to the database");
})
.catch((error) => {
    console.error("Error connecting to the database:", error);
});
