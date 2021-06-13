let { Router } = require('express');
let passport = require('passport');
let { Collection } = require('../data/models');
let router = Router();
let { StaffGuard } = require('../guards');

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  StaffGuard,
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

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  StaffGuard,
  async (request, response) => {
    let collection = await Collection.findOne({ id: request.params.id });

    if (!collection)
      return response.status(404).json({
        error: 'collection-not-found',
        message: 'Unable to find the requested collection.',
      });

    return response.status(200).json({
      success: 'collection-found',
      message: 'Found the requested collection.',
      collection: collection.toJSON(),
    });
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  StaffGuard,
  async (request, response) => {
    let newCollection = new Collection(request.body);

    try {
      newCollection.save();

      return response.status(200).json({
        success: 'created-collection',
        message: 'Successfully created a new collection.',
        collection: newCollection.toJSON(),
      });
    } catch (error) {
      return response.status(500).json({
        error: 'create-collection-failed',
        message: 'Unable to create a new collection.',
        errorMessage: error,
      });
    }
  }
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  StaffGuard,
  async (request, response) => {}
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  StaffGuard,
  async (request, response) => {}
);

module.exports = router;
