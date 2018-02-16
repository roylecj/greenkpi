
 if (Organisation.find().count() === 0) {

   console.log("Loading Demo Data");

  var thisid;
  var userId = Accounts.createUser({
    username: 'demouser',
    password: 'greenkpi',
    email: 'roylecj@gmail.com',
    profile: { name: 'Demo User'}
  });

  var orgId = Organisation.insert({organisationName: "Test Org"});

  MyOrganisation.insert({organisationId: orgId, userId: userId, activeFlag: true});

  Roles.createRole('ADMIN');
  Roles.createRole('STANDARD');
  Roles.createRole('DISABLED');
  Roles.createRole('READ_ONLY');
  Roles.createRole('NO ACCESS');

  Roles.addUsersToRoles(userId, 'ADMIN');

  MyLocations.insert({
    description: "1 Sheridan Street, Cairns",
    organisationId: orgId,
    activeFlag: true,
    createdAt: new Date()
  });

  MyLocations.insert({
    description: "Truck 11A",
    organisationId: orgId,
    activeFlag: true,
    createdAt: new Date()
  });
  MyLocations.insert({
    description: "Truck 32B",
    organisationId: orgId,
    activeFlag: true,
    createdAt: new Date()
  });

  Vendors.insert({
    code: "ERGON",
    description: "Ergon Energy",
    createdAt: new Date(),
    activeFlag: true
  });

  MyMetrics.insert({
    userId: userId,
    billDate: new Date(),
    billCategory: 'Energy',
    billTypeCode: 'ELECT',
    billVendorCode: 'ERGON',
    billStartDate: '2017-09-01',
    billEndDate: '2017-12-31',
    billDetails: [
      {
      itemNumber: 1,
      itemDescription: 'Tarrif 1',
      isSustainable: true,
      percentageSustainable: 100,
      itemQuantity: 40,
      itemUOM: 'KW',
      itemPrice: "0"
    },
    {
      itemNumber: 2,
      itemDescription: 'Tarrif 31',
      isSustainable: false,
      percentageSustainable: 0,
      itemQuantity: 20,
      itemUOM: 'KW',
      itemPrice: "200.50"
    }
  ],
    createDate: new Date(),
    activeFlag: true
  });

  MyMetrics.insert({
    userId: userId,
    billDate: new Date(),
    billCategory: 'Energy',
    billTypeCode: 'ELECT',
    billVendorCode: 'ERGON',
    billStartDate: '2017-06-01',
    billEndDate: '2017-08-31',
    billDetails: [
      {
      itemNumber: 1,
      itemDescription: 'Tarrif 1',
      isSustainable: true,
      percentageSustainable: 100,
      itemQuantity: 12,
      itemUOM: 'KW',
      itemPrice: "0"
    },
    {
      itemNumber: 2,
      itemDescription: 'Tarrif 31',
      isSustainable: false,
      percentageSustainable: 0,
      itemQuantity: 60,
      itemUOM: 'KW',
      itemPrice: "200.50"
    }
  ],
    createDate: new Date(),
    activeFlag: true
  });

}
