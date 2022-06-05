const { User } = require("../../models/user");
const { Conflict } = require("http-errors");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict("Email in use");
    }
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    await User.create({ email, password: hashPassword });
    res.status(201).json({
      user: {
        email,
        subscription: "starter",
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
