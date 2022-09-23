const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    const options = {
      host: process.env.SERVICE,
      service: process.env.SERVICE,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    }
    const transporter = nodemailer.createTransport(options);
    console.log(options)
    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
    }, (err, info) => {
      if (err) {
        console.log("err");
        console.log(err);
      } else {
        console.log("info");
        console.log(info);
      }
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};

module.exports = sendEmail;