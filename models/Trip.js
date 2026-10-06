const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        destination: {
            type: String,
            required: true
        },

        date: {
            type: Date,
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        totalSeats: {
            type: Number,
            required: true
        },

        availableSeats: {
            type: Number,
            required: true
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Trip", tripSchema);