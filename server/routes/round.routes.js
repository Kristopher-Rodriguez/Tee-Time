const RoundController = require("../controllers/round.controller");
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.post("/api/rounds/new", authenticate, RoundController.addNewRound);
    app.get("/api/rounds/all", RoundController.getAllRounds);
    app.get("/api/rounds/:userName", authenticate, RoundController.getRoundsByUser);
}