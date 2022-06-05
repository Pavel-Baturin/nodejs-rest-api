const { Contact } = require("../../models/contact");
const { NotFound } = require("http-errors");

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const remoteContact = await Contact.findByIdAndRemove(contactId);
    if (!remoteContact) {
      throw new NotFound("Not found");
    }
    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
      data: remoteContact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeContact;
