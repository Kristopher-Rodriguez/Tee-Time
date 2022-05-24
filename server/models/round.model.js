const mongoose = require("mongoose");

const RoundSchema = mongoose.Schema(
    {
        date: {
            type: Date,
            required: [true, "Date of round is required."]
        },
        course: {
            type: String,
            required: [true, "Course name is required."]
        },
        courseRating: {
            type: Number,
            required: [true, "Course rating required."],
            min: [0, "Course rating can't be negative!"],
            max: [10, "Course rating can't be higher than 10."]
        },
        slopeRating: {
            type: Number,
            required: [true, "Slope rating required."]
        },
        holesPlayed: {
            type: Number,
            required: [true, "Holes played is required."],
            min: [9, "Holes played can't be less than 9"],
            max: [18, "Holes played can't be greater than 18"]
        },
        par: {
            type: Number,
            required: [true, "Course par score is required."],
            min: [3, "Par can't be lower than 3"]
        },
        score: {
            type: Number,
            required: [true, "Your round score is required"]
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {timestamps: true}
);

const Round = mongoose.model("Round", RoundSchema);

module.exports = Round;