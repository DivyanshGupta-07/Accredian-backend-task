const generateReferralCode = () => {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
};

module.exports = generateReferralCode;
