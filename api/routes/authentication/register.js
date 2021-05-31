let { Router } = require('express');
let { Collector } = require('../../data/models');
let router = Router();
let uuid = require('uuid');
let bcrypt = require('bcrypt');

router.post('/collector', async (request, response) => {
  let { body } = request;

  let collector = new Collector({
    // Personal Details
    collectorId: uuid.v4(),
    collectorFirstName: body.firstName,
    collectorLastName: body.lastName,
    collectorUsername: body.username,
    collectorPassword: await bcrypt.hashSync(body.password, 1024),
    collectorPhoneNumber: body.phoneNumber,
    // Bank Details
    collectorAccountNumber: body.accountNumber,
    collectorBranchCode: body.branchCode,
    collectorBankName: body.bankName,
    // Location Details
    collectorStreetAddress: body.streetAddress,
    collectorCity: body.city,
    collectorAreaCode: body.areaCode,
    collectorProvince: body.province,
    collectorCountry: body.country,
  });

  try {
    collector.save();

    return response.status(200).json({
      success: 'collector-created',
      data: collector.toJSON(),
    });
  } catch (error) {
    return response.status(500).json({
      error,
    });
  }
});

module.exports = router;
