const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        trip: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Trip",
            required: true
        },

        day: {
            type: Number,
            required: true
        },

        activity: {
            type: String,
            required: true
        },

        location: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Itinerary", itinerarySchema);