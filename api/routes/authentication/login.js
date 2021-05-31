let { Router } = require('express');
let { readFileSync } = require('fs');
let { User } = require('../../data/models');
let router = Router();
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

router.post('/', async (request, response) => {
  let { body } = request;

  if (
    body.username === 'admin' &&
    body.password === process.env.ADMIN_PASSWORD
  ) {
    let admin = await User.findOne({ username: 'admin' });

    if (!admin) {
      let userPassword = await bcrypt.hashSync(
        process.env.ADMIN_PASSWORD,
        1024
      );

      let newAdmin = new User({
        userFirstName: 'Admin',
        userLastName: '',
        username: 'admin',
        userPhoneNumber: '',
        userPassword,
      });

      try {
        newAdmin.save();

        console.log(newAdmin);

        let adminData = newAdmin.toJSON();

        let userAuthenticationToken = jwt.sign(
          { sub: adminData.id },
          readFileSync('certs/privateKey.pem')
        );

        return response.status(200).json({
          success: 'admin-authenticated',
          data: {
            userFirstName: adminData.userFirstName,
            userLastName: adminData.userLastName,
            username: adminData.username,
            userPhoneNumber: adminData.userPhoneNumber,
            userAuthenticationToken,
          },
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      admin = admin.toJSON();

      let userAuthenticationToken = jwt.sign(
        { sub: admin.id },
        readFileSync('certs/privateKey.pem')
      );

      return response.status(200).json({
        success: 'admin-authenticated',
        data: {
          userFirstName: admin.userFirstName,
          userLastName: admin.userLastName,
          username: admin.username,
          userPhoneNumber: admin.userPhoneNumber,
          userAuthenticationToken,
        },
      });
    }
  } else {
  }
});

module.exports = router;
