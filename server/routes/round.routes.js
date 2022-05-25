const RoundController = require("../controllers/round.controller");
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.post("/api/rounds/new", authenticate, RoundController.addNewRound);
    app.get("/api/rounds/all", RoundController.getAllRounds);
    app.get("/api/rounds/user/:id", authenticate, RoundController.getRoundsByUser);
    app.get("/api/rounds/:id", authenticate, RoundController.findOneRound);
    app.delete("/api/rounds/:id", authenticate, RoundController.deleteOneRound);
    app.put("/api/rounds/:id", authenticate, RoundController.updateOneRound);
}