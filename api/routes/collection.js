let { Router } = require('express');
let passport = require('passport');
let { Collection } = require('../data/models');
let router = Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (request, response) => {
    let limit = 10;
    let page = request.headers.page;
    let sortBy = request.headers.sortBy;

    page = Math.max(0, page);

    Collection.find()
      .limit(limit)
      .skip(limit * (page - 1))
      .sort(sortBy)
      .exec((error, collections) => {
        if (error)
          return response.status(500).json({
            error: 'collections',
            message: 'Unable to get collections.',
            errorMessage: error,
          });
        Collection.count().exec((error, count) => {
          if (error)
            return response.status(500).json({
              error: 'collections',
              message: 'Unable to count collections.',
              errorMessage: error,
            });
          return response.status(200).json({
            collections,
            page,
            pages: count / limit,
          });
        });
      });
  }
);

module.exports = router;
