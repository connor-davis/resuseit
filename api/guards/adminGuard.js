let { IUserType } = require('../types');

module.exports = async (request, response, next) => {
  if (request.user.userType === IUserType.ADMIN) return next();
  return response.status(401);
};
