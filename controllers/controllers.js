const prisma = require("../prisma/index");
const sendReferralEmail = require("../utils/sendEmail");

const createReferral = async (req, res) => {
  const { referrerName, referrerEmail, refereeName, refereeEmail } = req.body;

  if (!referrerName || !referrerEmail || !refereeName || !refereeEmail) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: referrerEmail },
    });
    const referral = await prisma.referral.create({
      data: {
        referrerName,
        referrerEmail,
        refereeName,
        refereeEmail,
        referralCode: existingUser.referralCode,
      },
    });
    await sendReferralEmail(
      referrerEmail,
      refereeEmail,
      existingUser.referralCode
    );
    res.status(201).json(referral);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createReferral };
