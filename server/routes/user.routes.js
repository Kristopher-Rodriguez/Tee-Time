const UserController = require("../controllers/user.controller");
const { authenticate } = require('../config/jwt.config');


module.exports = (app) => {
    app.post("/api/register", UserController.registerUser);
    app.post("/api/login", UserController.login);
    app.get("/api/user", authenticate, UserController.findUsers);
}