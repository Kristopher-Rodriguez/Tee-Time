const Round = require("../models/round.model");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

module.exports = {
  addNewRound: (req, res) => {
    const newRound = new Round(req.body);

    const decodedJwt = jwt.decode(req.cookies.usertoken, { complete: true });

    newRound.user_id = decodedJwt.payload.id;

    newRound
      .save()
      .then((newRound) => {
        console.log(newRound);
        res.json(newRound);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  getAllRounds: (req, res) => {
    Round.find({})
      .populate("user_id", "userName")
      .then((allRounds) => {
        res.json(allRounds);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getRoundsByUser: (req, res) => {
    if (req.jwtpayload.userName !== req.params.userName) {
      console.log("not user");
      User.findOne({ userName: req.params.userName })
        .then((userNotLoggedIn) => {
          Round.find({ user_id: userNotLoggedIn._id })
            .populate("user_id", "userName")
            .then((allRoundsFromUser) => {
              console.log(allRoundsFromUser);
              res.json(allRoundsFromUser);
            });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
    } else {
      console.log("current user");
      Round.find({ user_id: req.jwtpayload.id })
        .populate("user_id", "userName")
        .then((allRoundsFromLoggedInUser) => {
          console.log(allRoundsFromLoggedInUser);
          res.json(allRoundsFromLoggedInUser);
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
    }
  },

  findOneRound: (req, res) => {
    Round.findOne({ _id: req.params.id })
      .then((oneRound) => {
        console.log(oneRound);
        res.json(oneRound);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  deleteOneRound: (req, res) => {
    Round.deleteOne({ _id: req.params.id })
      .then((deletedRound) => {
        console.log(deletedRound);
        res.json(deletedRound);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  updateOneRound: (req, res) => {
    Round.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((updatedRound) => {
        console.log(updatedRound);
        res.json(updatedRound);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }
};
