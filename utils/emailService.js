const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "SignersAcademy@gmail.com",
    pass: "tfzuloscfeiqquyr",
  },
});

function sendPasswordResetEmail(email, OTP) {
  const mailOptions = {
    from: "SignersAcademy@gmail.com",
    to: email,
    subject: "Password Reset",
    html: `<p>Your OTP is : ${OTP}</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = sendPasswordResetEmail;
