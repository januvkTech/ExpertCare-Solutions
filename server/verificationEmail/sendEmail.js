const nodemailer = require("nodemailer");
import React from "react";

module.exports = async (recieverEmail) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "angelpriyapapakipari9192@gmail.com",
        pass: "ancs esuy omoj xknn",
      },
    });
    const details = {
      from: "angelpriyapapakipari9192@gmail.com",
      to: "vikasjanu@jklu.edu.in",
      subject: "Email varification link.",
      text: "hello varification mail.",
    };
   transporter.sendMail(details);
    console.log("email sent successfully");
  } catch (err) {
    console.log("emailnot sent");
  }
};
