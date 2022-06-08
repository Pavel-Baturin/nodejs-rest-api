const express = require("express");

const router = express.Router();

const {
  register,
  login,
  getCurrentUser,
  logout,
  updateSubscription,
} = require("../../controllers/users");
const { joiSchema, subscriptionJoiSchema } = require("../../models/user");
const { validation, auth } = require("../../middlewares");

router.post("/register", validation(joiSchema), register);
router.get("/login", validation(joiSchema), login);
router.patch("/", auth, validation(subscriptionJoiSchema), updateSubscription);
router.post("/logout", auth, logout);
router.get("/current", auth, getCurrentUser);

module.exports = router;
