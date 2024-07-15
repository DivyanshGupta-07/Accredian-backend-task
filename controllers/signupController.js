const prisma = require("../prisma/index");
const bcrypt = require("bcryptjs");
const cookieToken = require("../utils/cookieToken");
const generateReferralCode = require("../helper/generateUniqueReferalCode");

const signUp = async (req, res) => {
  const { email, password, referralCode } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let referredBy = null;
    if (referralCode) {
      const validReferral = await prisma.referral.findUnique({
        where: { referralCode },
      });

      if (!validReferral) {
        return res.status(400).json({ error: "Invalid referral code" });
      }
      console.log("validReferral = ", validReferral);
      referredBy = referralCode;
    }

    let uniqueReferralCode;
    while (true) {
      uniqueReferralCode = generateReferralCode();
      const existingReferral = await prisma.referral.findUnique({
        where: { referralCode: uniqueReferralCode },
      });

      if (!existingReferral) break;
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        referralCode: uniqueReferralCode,
        referredBy,
      },
    });

    console.log("newUser = ", newUser);
    cookieToken(newUser, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { signUp };
