const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");

function sendPasswordResetEmail(email, OTP) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email,
    from: "SignersAcademy@gmail.com",
    subject: "Reset Password",
    text: "test",
    html: `<strong>OTP: ${OTP}</strong>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
}

module.exports = sendPasswordResetEmail;
