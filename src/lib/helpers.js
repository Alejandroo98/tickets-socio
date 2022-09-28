const bcrypt = require("bcrypt");
const helpers = {};

helpers.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

helpers.matchPassword = async (password, savedPassword) => {
  return await compare(password, savedPassword)
    .then((res) => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

module.exports = helpers;
