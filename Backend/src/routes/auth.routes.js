const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

// POST: Register API
router.post("/register", authController.register);

// POST: Login API 
router.post("/login", authController.login);

module.exports = router;
