const http = require("http");

function sendPasswordResetEmail(email, OTP) {
  const data = {
    email: email,
    otp: OTP,
  };

  const options = {
    hostname: "127.0.0.1",
    port: 5001,
    path: "/sendmail",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(JSON.stringify(data)),
    },
  };

  const req = http.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on("data", (d) => {
      process.stdout.write(d);
    });
  });

  req.on("error", (error) => {
    console.error(error);
  });

  req.write(JSON.stringify(data));
  req.end();
}

module.exports = sendPasswordResetEmail;
