const express = require("express");

const router = express.Router();

const {
  register,
  login,
  getCurrentUser,
  logout,
  updateSubscription,
  updateAvatar,
  verify,
  resendVerify,
} = require("../../controllers/users");
const { joiSchema, subscriptionJoiSchema } = require("../../models/user");
const { validation, auth, upload } = require("../../middlewares");

router.post("/register", validation(joiSchema), register);
router.get("/login", validation(joiSchema), login);
router.patch("/", auth, validation(subscriptionJoiSchema), updateSubscription);
router.post("/logout", auth, logout);
router.get("/current", auth, getCurrentUser);
router.get("/verify/:verificationToken", verify);
router.post("/verify", resendVerify);
router.patch("/avatars", auth, upload.single("avatar"), updateAvatar);

module.exports = router;
