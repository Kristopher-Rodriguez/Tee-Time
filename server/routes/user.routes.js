const UserController = require("../controllers/user.controller");
const { authenticate } = require('../config/jwt.config');


module.exports = (app) => {
    app.post("/api/users/register", UserController.registerUser);
    app.post("/api/users/login", UserController.login);
    app.post("/api/users/logout", UserController.logout);
    app.get("/api/users/one", authenticate, UserController.findLoggedInUser);
    app.get("/api/users/all", authenticate, UserController.findUsers);
}