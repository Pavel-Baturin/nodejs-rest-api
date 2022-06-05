const { Contact } = require("../../models/contact");
const { NotFound } = require("http-errors");

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      {
        new: true,
      }
    );
    if (!contact) {
      throw new NotFound("Not found");
    }
    res.json({
      status: "success",
      code: 200,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatusContact;
