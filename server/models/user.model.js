const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: email => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(email),
            message: "Enter a vaild Email"
        }
    },
    userName: {
        type: String,
        required: [true, "Username is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be aleast 8 characters!!!"]
    }
}, {timestamps: true})

UserSchema.virtual('confirmPassword')
    .get( () => this._confirmPassword )
    .set( value => this._confirmPassword = value);

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm Password');
    }
    next();
});

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

const User = mongoose.model("User", UserSchema)
module.exports = User;