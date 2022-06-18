const { BadRequest } = require("http-errors");
const { v4 } = require("uuid");
const { User } = require("../../models/user");
const { sendEmail } = require("../../helpers");

const resendVerify = async (req, res, next) => {
  const { email } = req.body;
  try {
    if (!email) {
      throw new BadRequest("missing required field email");
    }
    const user = await User.findOne({ email });
    if (user.verify) {
      throw new BadRequest("Verification has already been passed");
    }
    const verificationToken = v4();
    const mail = {
      to: email,
      subject: "Підтвердження email",
      html: `<a target="_blank" href="http:localhost:3000/api/users/verify/${verificationToken}">Підтвердіть email</a>`,
    };
    await sendEmail(mail);
    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });
    res.json({
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resendVerify;
