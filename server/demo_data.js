
 if (EcoQuestions.find().count() === 0) {

  var thisid;
  var userId = Accounts.createUser({
    username: 'croyle',
    password: '08board',
    email: 'roylecj@gmail.com',
    profile: { name: 'Chris Royle'}
  });

  Roles.createRole('ADMIN');
  Roles.createRole('STANDARD');
  Roles.createRole('NO ACCESS');

  Roles.addUsersToRoles(userId, 'ADMIN');

  ReferenceData.insert({
    dataType: "ENERGY_BILL",
    code: "ELECT",
    description: "Electricity",
    createdAt: new Date(),
    activeFlag: true
  });

  ReferenceData.insert({
    dataType: "ENERGY_BILL",
    code: "GAS",
    description: "Gas",
    createdAt: new Date(),
    activeFlag: true
  });

  ReferenceData.insert({
    dataType: "UOM",
    code: "KW",
    description: "Kilowatts",
    createdAt: new Date(),
    activeFlag: true
  });

  ReferenceData.insert({
    dataType: "EMPLOYEE_COUNT",
    code: "1_10",
    description: "1 - 10",
    createdAt: new Date(),
    activeFlag: true
  });

  ReferenceData.insert({
    dataType: "EMPLOYEE_COUNT",
    code: "11_50",
    description: "11 - 50",
    createdAt: new Date(),
    activeFlag: true
  });

  ReferenceData.insert({
    dataType: "EMPLOYEE_COUNT",
    code: "51_100",
    description: "51 - 100",
    createdAt: new Date(),
    activeFlag: true
  });

  ReferenceData.insert({
    dataType: "EMPLOYEE_COUNT",
    code: "101_200",
    description: "101 - 200",
    createdAt: new Date(),
    activeFlag: true
  });

  ReferenceData.insert({
    dataType: "EMPLOYEE_COUNT",
    code: "201_500",
    description: "201 - 500",
    createdAt: new Date(),
    activeFlag: true
  });

  ReferenceData.insert({
    dataType: "EMPLOYEE_COUNT",
    code: "501",
    description: "Greater than 500",
    createdAt: new Date(),
    activeFlag: true
  });

  ReferenceData.insert({
    dataType: "GRI_SECTORS",
    code: "OTHER",
    description: "Other",
    createdAt: new Date(),
    activeFlag: true
  });

  ReferenceData.insert({
    dataType: "STATE_CODES",
    code: "QLD",
    description: "Queensland",
    createdAt: new Date(),
    activeFlag: true
  });

  ReferenceData.insert({
    dataType: "STATE_CODES",
    code: "NSW",
    description: "New South Wales",
    createdAt: new Date(),
    activeFlag: true
  });

  ReferenceData.insert({
    dataType: "STATE_CODES",
    code: "ACT",
    description: "Australian Capital Territory",
    createdAt: new Date(),
    activeFlag: true
  });

  ReferenceData.insert({
    dataType: "STATE_CODES",
    code: "VIC",
    description: "Victoria",
    createdAt: new Date(),
    activeFlag: true
  });

  ReferenceData.insert({
    dataType: "STATE_CODES",
    code: "TAS",
    description: "Tasmania",
    createdAt: new Date(),
    activeFlag: true
  });

  ReferenceData.insert({
    dataType: "STATE_CODES",
    code: "WA",
    description: "Western Australia",
    createdAt: new Date(),
    activeFlag: true
  });

  ReferenceData.insert({
    dataType: "STATE_CODES",
    code: "NT",
    description: "Northern Territory",
    createdAt: new Date(),
    activeFlag: true
  });

  ReferenceData.insert({
    dataType: "STATE_CODES",
    code: "SA",
    description: "South Australia",
    createdAt: new Date(),
    activeFlag: true
  });

  var q1;
  var q2;
  var q3;
  var q4;

  q1 = EcoQuestions.insert({
    greenkpiId: "3020112",
    questionText: "Has an investigation been carried out to ensure the most effective tariffs are used?",
    greenCategory: "30201",
    startDate: Date("2017-01-01"),
    createDate: new Date(),
    activeFlag: true
  });

  q2 = EcoQuestions.insert({
    greenkpiId: "3020113",
    questionText: "Has the company had an electricity audit carried out to check efficiency?",
    greenCategory: "30201",
    startDate: Date("2017-01-01"),
    createDate: new Date(),
    activeFlag: true
  });

  q3 = EcoQuestions.insert({
      greenkpiId: "3020114",
      questionText: "Does the company encourage energy efficient practises by staff?",
      greenCategory: "30201",
      startDate: Date("2017-01-01"),
      createDate: new Date(),
      activeFlag: true
    });

  q4 = EcoQuestions.insert({
      greenkpiId: "3020115",
      questionText: "Does the company have efficiency policies for non-specific appliances?",
      greenCategory: "30201",
      startDate: Date("2017-01-01"),
      createDate: new Date(),
      activeFlag: true
    });

  EcoActions.insert({
    questionId: q1,
    jkId: "302011201",
    actionText: "Change to most efficient tariff for energy use and time of use",
    createDate: new Date(),
    activeFlag: true
  });

  EcoActions.insert({
    questionId: q1,
    jkId: "302011202",
    actionText: "Ensure energy meters are read regularly, not estimated",
    createDate: new Date(),
    activeFlag: true
  });

  EcoActions.insert({
    questionId: q1,
    jkId: "302011203",
    actionText: "Bulk purchasing of energy may be possible through collaboration with other organisations",
    createDate: new Date(),
    activeFlag: true
  });

  EcoActions.insert({
    questionId: q1,
    jkId: "302011204",
    actionText: "Switch energy providers if able to negotiate a better tariff",
    createDate: new Date(),
    activeFlag: true
  });

  EcoActions.insert({
    questionId: q1,
    jkId: "302011205",
    actionText: "If using more than 100MWh, consider an energy consultant to ensure most efficient contract",
    createDate: new Date(),
    activeFlag: true
  });

  EcoActions.insert({
    questionId: q2,
    jkId: "302011301",
    actionText: "Engage an energy auditor or perform an internal audit",
    createDate: new Date(),
    activeFlag: true
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
  })

}
