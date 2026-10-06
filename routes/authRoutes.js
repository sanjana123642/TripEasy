const express = require("express");

const {
    register,
    login
} = require("../controllers/authController");

const validateRequired = require("../middleware/validationMiddleware");

const router = express.Router();

router.post(
    "/register",
    validateRequired(["name", "email", "password"]),
    register
);

router.post(
    "/login",
    validateRequired(["email", "password"]),
    login
);

module.exports = router;