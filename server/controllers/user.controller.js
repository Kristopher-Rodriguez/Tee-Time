const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

module.exports = {
  registerUser: (req, res) => {
    User.create(req.body)
      .then((user) => {
        const userToken = jwt.sign(
          {
            id: user._id,
          },
          process.env.Token_Key
        );

        res
          .cookie("usertoken", userToken, process.env.Token_Key, {
            httpOnly: true,
          })
          .json({ msg: "Success", user: user });
      })
      //added res.status(400) to show validation errors on the frontend -KR
      .catch((err) => res.status(400).json(err));
  },

  login: async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user === null) {
      return res.status(400).json({ message: "Invalid Login Attempt!" });
    }

    const correctPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!correctPassword) {
      return res.status(400).json({ message: "Invalid Login Attempt!" });
    }

    const userToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.Token_Key
    );

    res
      .cookie("usertoken", userToken, process.env.Token_Key, {
        httpOnly: true,
      })
      .json({ msg: "Success" });
  },

  logout: (req, res) => {
    res.clearCookie("usertoken");
    res.json({ msg: "Successful Logout." });
    res.sendStatus(200);
  },

  findUsers: (req, res) => {
    User.find({})
      .then((allUsers) => res.json(allUsers))
      .catch((err) => {
        console.log(err);
      });
  },

  findLoggedInUser: (req, res) => {
    // const decodedJWT = jwt.decode(req.cookies.usertoken,{complete: true});

    User.findOne({ _id: req.jwtpayload.id })
      .then((oneUser) => {
        console.log(oneUser);
        res.json(oneUser);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
