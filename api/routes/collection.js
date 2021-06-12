let { Router } = require('express');
let passport = require('passport');
let router = Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (request, response) => {
    return response.status(200).json({
      success: 'authenticated',
    });
  }
);

module.exports = router;
