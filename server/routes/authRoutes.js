const express = require("express");
const authorize = require("../middlewares/authorize");
const { getMe, login, logout, registerAdmin } = require("../controllers/authController");
const { protect } = require("../middlewares/auth");
const router = express.Router();


router.get("/me", protect, getMe);
router.post("/login", login);
router.post("/logout", logout);

// Super Admin only
router.post(
    "/register-admin",
    protect,
    authorize("super_admin"),
    registerAdmin
);

module.exports = router;
