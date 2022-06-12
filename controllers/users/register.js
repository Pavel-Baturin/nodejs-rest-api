const { User } = require("../../models/user");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict("Email in use");
    }
    const avatarURL = gravatar.url(email);
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    await User.create({ email, password: hashPassword, avatarURL });
    res.status(201).json({
      user: {
        email,
        subscription: "starter",
        avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
