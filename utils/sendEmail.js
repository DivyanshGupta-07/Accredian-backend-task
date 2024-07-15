const nodemailer = require("nodemailer");

const sendReferralEmail = async (referrerEmail, refereeEmail, referCode) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });
  console.log("h5");
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: refereeEmail,
    subject: "Course Referral",
    text: `Hi, you have been referred to a course by ${referrerEmail}. You can use ${referCode} to signup. and get discount`,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendReferralEmail;
