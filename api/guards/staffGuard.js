let { IUserType } = require('../types');

module.exports = async (request, response, next) => {
  if (
    request.user.userType === IUserType.ADMIN ||
    request.user.userType === IUserType.STAFF
  )
    return next();
  return response.status(401);
};
