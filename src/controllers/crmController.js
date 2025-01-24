import mongoose from "mongoose";
import { ContactSchema } from "../models/crmModel";

const Contact = mongoose.model("Contact", ContactSchema);

export const addNewContact = async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    const contact = await newContact.save();
    res.json(contact);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getContacts = async (req, res) => {
  try {
    const contact = await Contact.find();
    res.json(contact);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getContactWithId = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.contactId);
    res.json(contact);
  } catch (error) {
    res.send(error);
  }
};

export const updateContact = async (req, res) => {
  try {
    const contactId = req.params.contactId;
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedContact) {
      return res.status(404).send({ message: "Contact not found" });
    }

    res.json(updatedContact);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.contactId;

    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    const deletedContact = await Contact.findByIdAndDelete(contactId);
    if (deletedContact) {
      res.json({
        message: `Successfully deleted Contact`,
        deletedContact: {
          id: contact._id,
          firstName: contact.firstName,
          lastName: contact.lastName,
        },
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
