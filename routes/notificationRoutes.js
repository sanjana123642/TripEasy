const express = require("express");

const {
    sendNotification
} = require("../controllers/notificationController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
    "/send",
    protect,
    sendNotification
);

module.exports = router;