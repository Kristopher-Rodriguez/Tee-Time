const mongoose = require("mongoose");

const dbName = "tee_time";

mongoose
  .connect(`mongodb://localhost/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`You are connected to the ${dbName} database.`);
  })
  .catch((err) => {
    console.log(`Error! Could not connect to the ${dbName} database.`);
    console.log(err);
  });