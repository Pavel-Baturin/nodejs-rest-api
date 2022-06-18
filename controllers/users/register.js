const { User } = require("../../models/user");
const { Conflict } = require("http-errors");
const { v4 } = require("uuid");
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../../helpers");

const register = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict("Email in use");
    }
    const verificationToken = v4();
    const avatarURL = gravatar.url(email);
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    await User.create({
      email,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });
    const mail = {
      to: email,
      subject: "Підтвердження email",
      html: `<a target="_blank" href="http:localhost:3000/api/users/verify/${verificationToken}">Підтвердіть email</a>`,
    };
    await sendEmail(mail);
    res.status(201).json({
      user: {
        email,
        subscription: "starter",
        avatarURL,
        verificationToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
