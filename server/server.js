require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser');
const port = process.env.Port;

app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    credentials: true, origin: process.env.Client_Url
}));

require("./config/mongoose.config");
require("./routes/user.routes")(app);

app.listen(port, () => console.log("Listening on port",port));
