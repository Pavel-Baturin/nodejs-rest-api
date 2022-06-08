const express = require("express");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts");

const { validation, auth } = require("../../middlewares");
const { joiSchema, favoriteJoiSchema } = require("../../models/contact");

const router = express.Router();

router.get("/", auth, listContacts);

router.get("/:contactId", auth, getContactById);

router.post("/", auth, validation(joiSchema), addContact);

router.put("/:contactId", auth, validation(joiSchema), updateContact);

router.delete("/:contactId", auth, removeContact);

router.patch(
  "/:contactId/favorite",
  validation(favoriteJoiSchema),
  updateStatusContact
);

module.exports = router;
