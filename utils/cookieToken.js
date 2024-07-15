const getJwtTokens = require("../helper/getJwtToken");

const cookieToken = async (user, res) => {
  const token = await getJwtTokens(user.id);
  const options = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  user.password = undefined;
  res.status(200).cookie("token", options).json({
    sucess: true,
    token,
    user,
  });
};

module.exports = cookieToken;
