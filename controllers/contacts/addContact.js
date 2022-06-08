const { Contact } = require("../../models/contact");

const addContact = async (req, res, next) => {
  try {
    const { _id } = req.user;
    console.log(_id);
    const contact = await Contact.create({ ...req.body, owner: _id });
    res.status(201).json({
      status: "success",
      code: 201,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
