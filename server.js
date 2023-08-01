const mongoose = require("mongoose");

const app = require("./app");

// const { DB_HOST, PORT = 3000 } = process.env;

const DB_HOST =
  "mongodb+srv://kostikuz:S1MMIwKBo1FG9d3t@cluster0.kadyqc9.mongodb.net/contactsDB?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch((error) => console.log(error.message));
