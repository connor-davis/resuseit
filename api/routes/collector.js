let { Router } = require('express');
let passport = require('passport');
let router = Router();
let { Collector } = require('../data/models');
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

    Collector.find()
      .limit(limit)
      .skip(limit * (page - 1))
      .sort(sortBy)
      .exec((error, collectors) => {
        if (error)
          return response.status(500).json({
            error: 'collectors',
            message: 'Unable to get collectors.',
            errorMessage: error,
          });
        Collector.count().exec((error, count) => {
          if (error)
            return response.status(500).json({
              error: 'Collector',
              message: 'Unable to count collectors.',
              errorMessage: error,
            });
          return response.status(200).json({
            collectors,
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
  async (request, response) => {
    let collector = await Collector.findOne({ id: request.params.id });

    if (!collector)
      return response.status(404).json({
        error: 'collector-not-found',
        message: 'Unable to find the requested collector.',
      });

    return response.status(200).json({
      success: 'collector-found',
      message: 'Found the requested collector.',
      collection: collector.toJSON(),
    });
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  StaffGuard,
  async (request, response) => {
    let newCollector = new Collector(request.body);

    try {
      newCollector.save();

      return response.status(200).json({
        success: 'created-collector',
        message: 'Successfully created a new collector.',
        collector: newCollector.toJSON(),
      });
    } catch (error) {
      return response.status(500).json({
        error: 'create-collector-failed',
        message: 'Unable to create a new collector.',
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
