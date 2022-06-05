const { User } = require("../../models/user");
const { Unauthorized } = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Unauthorized("Email or password is wrong");
    }

    const passCompare = bcrypt.compareSync(password, user.password);

    if (!passCompare) {
      throw new Unauthorized("Email or password is wrong");
    }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY);
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
      token,
      user: {
        email,
        subscription: "starter",
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
