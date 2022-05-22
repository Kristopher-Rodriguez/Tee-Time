require('dotenv').config();
const bcrypt = require("bcrypt")
const { secret } = require('../config/jwt.config');
const User = require("../models/user.model");

module.exports = {
    registerUser: (req, res) => { 
        User.create(req.body)
            .then(user => {
                const userToken = jwt.sign({
                    id: user._id
                }, process.env.Token_Key);
                
                res
                    .cookie("usertoken", userToken, secret, {
                        httpOnly: true
                    })
                    .json({ msg: "Success", user: user});
            })
            .catch(err => res.json(err));
    },

    login: async(req, res) => {
        const user = await User.findOne({ email: req.body.email});

        if(user === null) {
            return res.sendStatus(400);
        }

        const correctPassword = await bcrypt.compare(req.body.password, user.password);
        if(!correctPassword) {
            return res.sendStatus(400);
        }

        const userToken = jwt.sign({
            id: user._id
        }, process.env.Token_Key);

        res
            cookie("usertoken", userToken, secret, {
                httpOnly: true
            })
            .json({ msg: "Success"})
    },


    findUsers: (req,res) => {
        User.find({})
            .then((allUsers) => res.json(allUsers))
            .catch((err) => {
                console.log(err);
            });
    }
}