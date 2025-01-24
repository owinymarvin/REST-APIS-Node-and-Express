// Schema (DB Rules)
import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const ContactSchema = new Schema({
  firstName: {
    type: String,
    required: "Enter a first name",
  },
  lastName: {
    type: String,
    required: "Enter a last name",
  },
  email: {
    type: String,
  },
  company: {
    type: String,
  },
  phone: {
    type: Number,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
}, {collection: "contacts"});