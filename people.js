const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/shopApp")
  .then(() => {
    console.log("CONNECTION OPEN!!!!");
  })
  .catch((err) => {
    console.log("Oh no error!!!!!");
    console.log(err);
  });

// Define a schema
const personSchema = mongoose.Schema({
  first: String,
  last: String,
});

// Define a virtual function that connect first & last name
// It will behave as an actual property (called Virtual)
// This is on Mongoose (in JS)
personSchema.virtual("fullName").get(function () {
  return `${this.first} ${this.last}`;
});

// Define a pre-async-middleware for Schema
personSchema.pre("save", async function () {
  this.first = "YO";
  this.last = "Mama";
  console.log("About to save!!!");
});
// Define a post-async-middleware for Schema
personSchema.post("save", async function () {
  console.log("Just saved!!!!!!!!");
});

const Person = mongoose.model("Person", personSchema);
