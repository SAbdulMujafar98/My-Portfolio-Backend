const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(bodyParser.json());


const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: "abdulmujafar.1998@gmail.com", 
    pass: "@Sam1998", 
  },
});


app.post("/send-email", (req, res) => {
  const { firstName, lastName, senderEmail, message } = req.body;

  const mailOptions = {
    from: senderEmail,
    to: "abdulmujafar.1998@gmail.com",
    subject: `New Email from :${firstName} ${lastName}`,
    text: `You have received a new email from: ${senderEmail}\n\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).send("Error sending email");
    }
    res.status(200).send("Email sent successfully!");
  });
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});