const express = require("express");

const {
    getTrips,
    getTripById,
    createTrip,
    updateTrip
} = require("../controllers/tripController");

const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Public routes
router.get("/", getTrips);
router.get("/:id", getTripById);

// Agent routes
router.post(
    "/",
    protect,
    allowRoles("agent"),
    createTrip
);

router.put(
    "/:id",
    protect,
    allowRoles("agent"),
    updateTrip
);

module.exports = router;