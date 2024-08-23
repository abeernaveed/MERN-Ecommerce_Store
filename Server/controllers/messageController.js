const Contact = require("../models/messageModel");

exports.createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json({ message: "Contact saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving contact" });
  }
};

exports.getMessage = async (req, res) => {
  try {
    const mails = await Contact.find();
    await res.json(mails);
  } catch (error) {
    res.status(500).json({ message: "Error fetching mails" });
  }
};
exports.deleteMessage = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
