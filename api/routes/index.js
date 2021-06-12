let express = require('express');
let router = express.Router();

router.get('/', async (_, response) => {
  response.status(200).send('Welcome to the API.');
});

router.use('/authentication/login', require('./authentication/login'));
router.use('/authentication/register', require('./authentication/register'));
router.use('/collections', require('./collection'));

module.exports = router;
