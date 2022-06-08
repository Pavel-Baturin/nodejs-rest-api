const { User } = require("../../models/user");
const { NotFound } = require("http-errors");

const updateSubscription = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { subscription } = req.body;
    const user = await User.findByIdAndUpdate(
      _id,
      { subscription },
      {
        new: true,
      }
    );
    if (!user) {
      throw new NotFound("Not found");
    }
    res.json({
      status: "success",
      code: 200,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateSubscription;
