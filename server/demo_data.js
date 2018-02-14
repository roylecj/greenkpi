
 if (EcoQuestions.find().count() === 0) {

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

/*
  var q1;
  var q2;
  var q3;
  var q4;

  q1 = EcoQuestions.insert({
    greenkpiId: "3020112",
    questionText: "Has an investigation been carried out to ensure the most effective tariffs are used?",
    greenCategory: "30201",
    categoryCode: "ENERGY",
    startDate: Date("2017-01-01"),
    createDate: new Date(),
    activeFlag: true
  });

  q2 = EcoQuestions.insert({
    greenkpiId: "3020113",
    questionText: "Has the company had an electricity audit carried out to check efficiency?",
    greenCategory: "30201",
    categoryCode: "ENERGY",
    startDate: Date("2017-01-01"),
    createDate: new Date(),
    activeFlag: true
  });

  q3 = EcoQuestions.insert({
      greenkpiId: "3020114",
      questionText: "Does the company encourage energy efficient practises by staff?",
      greenCategory: "30201",
      categoryCode: "ENERGY",
      startDate: Date("2017-01-01"),
      createDate: new Date(),
      activeFlag: true
    });

  q4 = EcoQuestions.insert({
      greenkpiId: "3020115",
      questionText: "Does the company have efficiency policies for non-specific appliances?",
      greenCategory: "30201",
      categoryCode: "ENERGY",
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
*/


var q3020112 = EcoQuestions.insert({'greenkpid':'3020112', 'questionText': 'Has an investigation been carried out to ensure the most effective tariffs are used?', 'greenCategory': '30201', 'categoryCode' : 'ENERGY', 'startDate': Date('2017-01-01'), 'createdAt' : new Date(), 'activeFlag': true});
var q3020113 = EcoQuestions.insert({'greenkpid':'3020113', 'questionText': 'Has the company had an electricity audit carried out to check efficiency?', 'greenCategory': '30201', 'categoryCode' : 'ENERGY', 'startDate': Date('2017-01-01'), 'createdAt' : new Date(), 'activeFlag': true});
var q3020114 = EcoQuestions.insert({'greenkpid':'3020114', 'questionText': 'Does the company encourage energy efficient practises by staff?', 'greenCategory': '30201', 'categoryCode' : 'ENERGY', 'startDate': Date('2017-01-01'), 'createdAt' : new Date(), 'activeFlag': true});
var q3020115 = EcoQuestions.insert({'greenkpid':'3020115', 'questionText': 'Does the company have efficiency policies for non-specific appliances?', 'greenCategory': '30201', 'categoryCode' : 'ENERGY', 'startDate': Date('2017-01-01'), 'createdAt' : new Date(), 'activeFlag': true});
var q3020116 = EcoQuestions.insert({'greenkpid':'3020116', 'questionText': 'Does the company have efficiency policies for specific appliances?', 'greenCategory': '30201', 'categoryCode' : 'ENERGY', 'startDate': Date('2017-01-01'), 'createdAt' : new Date(), 'activeFlag': true});
var q3020117 = EcoQuestions.insert({'greenkpid':'3020117', 'questionText': 'Does the company have an overall energy efficiency policy?', 'greenCategory': '30201', 'categoryCode' : 'ENERGY', 'startDate': Date('2017-01-01'), 'createdAt' : new Date(), 'activeFlag': true});
var q3020118 = EcoQuestions.insert({'greenkpid':'3020118', 'questionText': 'Does the company have an energy efficiency policy for the motors?', 'greenCategory': '30201', 'categoryCode' : 'ENERGY', 'startDate': Date('2017-01-01'), 'createdAt' : new Date(), 'activeFlag': true});
var q3020119 = EcoQuestions.insert({'greenkpid':'3020119', 'questionText': 'Does the company have an energy efficiency policy for lighting?', 'greenCategory': '30201', 'categoryCode' : 'ENERGY', 'startDate': Date('2017-01-01'), 'createdAt' : new Date(), 'activeFlag': true});
var q3020120 = EcoQuestions.insert({'greenkpid':'3020120', 'questionText': 'Does the company have an energy efficiency policy for HVAC systems?', 'greenCategory': '30201', 'categoryCode' : 'ENERGY', 'startDate': Date('2017-01-01'), 'createdAt' : new Date(), 'activeFlag': true});
var q3020121 = EcoQuestions.insert({'greenkpid':'3020121', 'questionText': 'Does the company have an energy efficiency policy for IT systems?', 'greenCategory': '30201', 'categoryCode' : 'ENERGY', 'startDate': Date('2017-01-01'), 'createdAt' : new Date(), 'activeFlag': true});
var q3020122 = EcoQuestions.insert({'greenkpid':'3020122', 'questionText': 'Dose the company have an energy efficiency policy for refrigeration?', 'greenCategory': '30201', 'categoryCode' : 'ENERGY', 'startDate': Date('2017-01-01'), 'createdAt' : new Date(), 'activeFlag': true});
var q3020123 = EcoQuestions.insert({'greenkpid':'3020123', 'questionText': 'Does the company have an energy efficiency policy for air compressors?', 'greenCategory': '30201', 'categoryCode' : 'ENERGY', 'startDate': Date('2017-01-01'), 'createdAt' : new Date(), 'activeFlag': true});
var q3020124 = EcoQuestions.insert({'greenkpid':'3020124', 'questionText': 'Dose the company have an energy efficiency policy for hot water use?', 'greenCategory': '30201', 'categoryCode' : 'ENERGY', 'startDate': Date('2017-01-01'), 'createdAt' : new Date(), 'activeFlag': true});
var q3020125 = EcoQuestions.insert({'greenkpid':'3020125', 'questionText': 'Does the company have a transport efficiency policy?', 'greenCategory': '30201', 'categoryCode' : 'ENERGY', 'startDate': Date('2017-01-01'), 'createdAt' : new Date(), 'activeFlag': true});
var q3020126 = EcoQuestions.insert({'greenkpid':'3020126', 'questionText': 'Does the company encourage fuel-efficient driving techniques?', 'greenCategory': '30201', 'categoryCode' : 'ENERGY', 'startDate': Date('2017-01-01'), 'createdAt' : new Date(), 'activeFlag': true});
var q3020127 = EcoQuestions.insert({'greenkpid':'3020127', 'questionText': 'Does the company have an energy efficiency policy for the kitchen?', 'greenCategory': '30201', 'categoryCode' : 'ENERGY', 'startDate': Date('2017-01-01'), 'createdAt' : new Date(), 'activeFlag': true});
var q3020128 = EcoQuestions.insert({'greenkpid':'3020128', 'questionText': 'Does the company have an energy efficiency policy for pools?', 'greenCategory': '30201', 'categoryCode' : 'ENERGY', 'startDate': Date('2017-01-01'), 'createdAt' : new Date(), 'activeFlag': true});
var q3020129 = EcoQuestions.insert({'greenkpid':'3020129', 'questionText': 'Does the company have a energy efficiency policy for laundries?', 'greenCategory': '30201', 'categoryCode' : 'ENERGY', 'startDate': Date('2017-01-01'), 'createdAt' : new Date(), 'activeFlag': true});

EcoActions.insert({'questionId': q3020112, 'jkId': '302011201', 'actionText' : 'Change to most efficient tariff for energy use and time of use', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020112, 'jkId': '302011202', 'actionText' : 'Ensure energy meters are read regularly, not estimated', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020112, 'jkId': '302011203', 'actionText' : 'Bulk purchasing of energy may be possible through collaboration with other organisations', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020112, 'jkId': '302011204', 'actionText' : 'Switch energy providers if able to negotiate a better tariff', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020112, 'jkId': '302011205', 'actionText' : 'If using more than 100MWh, consider an energy consultant to ensure most efficient contract', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020112, 'jkId': '302011206', 'actionText' : 'Ask energy supplier for: advice on energy reduction, free audit, online energy monitoring, packages for installing efficient equipment.', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020112, 'jkId': '302011207', 'actionText' : 'Scrutinise bills for possible errors and utilise advise available for comparisons', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020112, 'jkId': '302011208', 'actionText' : 'investigate advantages of solar tariffs', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020112, 'jkId': '302011209', 'actionText' : 'Upgrade meters to smart meters', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020112, 'jkId': '302011210', 'actionText' : 'Enquire about time of use pricing', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020113, 'jkId': '302011301', 'actionText' : 'Engage an energy auditor or perform an internal audit', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020114, 'jkId': '302011401', 'actionText' : 'Ensure the Energy Reduction Plan is available for all staff', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020114, 'jkId': '302011402', 'actionText' : 'Educate all staff on ways to reduce energy consumption', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020114, 'jkId': '302011403', 'actionText' : 'Promote energy saving competitions', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020114, 'jkId': '302011404', 'actionText' : 'Encourage engagement and initiative on energy saving ideas', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020114, 'jkId': '302011405', 'actionText' : 'Educate staff and management about the importance reducing energy consumption', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020114, 'jkId': '302011406', 'actionText' : 'Allow time for a keen staff member to be the Green Officer, working with staff to engage on cost savings', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020114, 'jkId': '302011407', 'actionText' : 'Use signage around workplace e.g turn off lights, sleep mode for computers and close fridge doors', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020115, 'jkId': '302011501', 'actionText' : 'Incorporate efficiency policies in Energy Reduction Plan', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020115, 'jkId': '302011502', 'actionText' : 'Consolidate existing equipment where possible, eg, reduce number of fridges', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020115, 'jkId': '302011503', 'actionText' : 'Replace older items with energy efficient models of high Energy Ratings', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020115, 'jkId': '302011504', 'actionText' : 'Carry out maintenance to improve efficiencies', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020115, 'jkId': '302011505', 'actionText' : 'Place heat producing equipment in areas with natural cooling where possible', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020115, 'jkId': '302011506', 'actionText' : 'Use plug timers for vending machines, drink fridges and water coolers', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020115, 'jkId': '302011507', 'actionText' : 'Consider going paperless to reduce printer requirements', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020115, 'jkId': '302011508', 'actionText' : 'Blade style hand dryers may be more efficient, depending on employee numbers and situation', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020115, 'jkId': '302011509', 'actionText' : 'Investigate best charging practices for all rechargeable batteries to maximise life and reduce charging times', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020115, 'jkId': '302011510', 'actionText' : 'Thoroughly investigate the need for new equipment with regard to need, energy use, size, quality, second-hand, leasing and superseded', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020115, 'jkId': '302011511', 'actionText' : 'Check running cost of equipment: watts (1000 watts = 1KWh) X time in use per week X cents per KWh X 52 for yearly energy cost', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020116, 'jkId': '302011601', 'actionText' : 'Incorporate efficiency policy in Energy Reduction Plan', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020116, 'jkId': '302011602', 'actionText' : 'Use equipment only when needed and turn off all that are not required', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020116, 'jkId': '302011603', 'actionText' : 'Utilise energy efficient options and settings', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020117, 'jkId': '302011701', 'actionText' : 'Write an Energy Reduction Plan based on the supplied Energy Reduction Template', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020117, 'jkId': '302011702', 'actionText' : 'Research and purchase energy efficient equipment and supplies', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020117, 'jkId': '302011703', 'actionText' : 'Purchase energy monitoring displays and/or system to quantify energy reduction initiatives', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020117, 'jkId': '302011704', 'actionText' : 'Local council may have monitoring appliances available for loan', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020117, 'jkId': '302011705', 'actionText' : 'Energy provider may have option for online energy monitoring', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020117, 'jkId': '302011706', 'actionText' : 'Investigate tablet and smartphone apps for monitoring electricity', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020117, 'jkId': '302011707', 'actionText' : 'Install smart meter/s for detailed reporting', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020117, 'jkId': '302011708', 'actionText' : 'Plug in appliance monitors provide energy use for comparison for replacement decisions and management policies', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020117, 'jkId': '302011709', 'actionText' : 'Sub meters provide measurements for equipment that are subject to high use, providing data for effecient management', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020117, 'jkId': '302011710', 'actionText' : 'Quantify initiatives where possible', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020117, 'jkId': '302011711', 'actionText' : 'Benchmark results', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020117, 'jkId': '302011712', 'actionText' : 'Set realistic targets to reduce energy consumption, record in SMS', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020117, 'jkId': '302011713', 'actionText' : 'Incorporate measures to turn off equipment when not in use including: smartphone apps, remote-controlled power boards, timers and isolation switches', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020118, 'jkId': '302011801', 'actionText' : 'Incorporate efficiency policies in Energy Reduction Plan', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020118, 'jkId': '302011802', 'actionText' : 'Purchase efficient variable speed motors', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020118, 'jkId': '302011803', 'actionText' : 'Check belt tensions regularly', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020118, 'jkId': '302011804', 'actionText' : 'Turn off after use especially overnight', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020118, 'jkId': '302011805', 'actionText' : 'Maintain as per manufacturers requirements', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020119, 'jkId': '302011901', 'actionText' : 'Incorporate efficiency policies in Energy Reduction Plan', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020119, 'jkId': '302011902', 'actionText' : 'Retrofit with energy efficient lighting e.g. LED lighting produces less heat while being extremely energy and maintenance efficient', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020119, 'jkId': '302011903', 'actionText' : 'Reduce the number of lights where appropriate', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020119, 'jkId': '302011904', 'actionText' : 'Clean light fittings for best performance', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020119, 'jkId': '302011905', 'actionText' : 'Maximise daylight use', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020119, 'jkId': '302011906', 'actionText' : 'Consider zone lighting', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020119, 'jkId': '302011907', 'actionText' : 'investigate financial assistance for switching to energy efficient lighting', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020119, 'jkId': '302011908', 'actionText' : 'Install photsensors and dimmers to reduce energy consumption', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020119, 'jkId': '302011909', 'actionText' : 'Install motion detectors and timers in rooms not constantly used', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020119, 'jkId': '302011910', 'actionText' : 'Use task lighting for single person use to reduce overhead lighting', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020119, 'jkId': '302011911', 'actionText' : 'Line translucent signs with reflective material or install LED signage', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020119, 'jkId': '302011912', 'actionText' : 'Replaced T8 fluorescent tubes with LED tubes and T5 fluorescent tubes that use the same fixtures and fittings', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020119, 'jkId': '302011913', 'actionText' : 'Replace halogen downlights with LED downlights to reduce energy use, heat production and fire risk', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020119, 'jkId': '302011914', 'actionText' : 'Upgrade high and low-bay lighting to latest energy efficient options', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020119, 'jkId': '302011915', 'actionText' : 'Daylight and motion detectors assist reduce outdoor lighting, along with solar lights for pathways', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020119, 'jkId': '302011916', 'actionText' : 'Retrofit exit signs with LED exit signs', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020119, 'jkId': '302011917', 'actionText' : 'Research how to carry out a room-by-room lighting audit', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020120, 'jkId': '302012001', 'actionText' : 'Incorporate efficiency policies in Energy Reduction Plan', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020120, 'jkId': '302012002', 'actionText' : 'Source as much cooling, heating and ventilation from natural sources as possible', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020120, 'jkId': '302012003', 'actionText' : 'Service HVAC equipment regularly', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020120, 'jkId': '302012004', 'actionText' : 'Program temperature thermostat to around 25C in summer and 19C in winter', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020120, 'jkId': '302012005', 'actionText' : 'Consider using zones in your HVAC system', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020120, 'jkId': '302012006', 'actionText' : 'Keep areas around cooling vents and heaters clear', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020120, 'jkId': '302012007', 'actionText' : 'Install and set timers to turn off when not required', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020120, 'jkId': '302012008', 'actionText' : 'Position thermostat away from heat emissions, sunlight, draught or external walls', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020120, 'jkId': '302012009', 'actionText' : 'Retrofit with energy efficient technology that is the correct size for the room using information available (government and experts)', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020120, 'jkId': '302012010', 'actionText' : 'Keep doors, windows and vents closed when air-conditioner in use', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020120, 'jkId': '302012011', 'actionText' : 'When exceptionally hot days forecast turn air conditioners on earlier than normal', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020120, 'jkId': '302012012', 'actionText' : 'Work in smaller offices when possible', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020120, 'jkId': '302012013', 'actionText' : 'Use fans to eliminate air conditioning use, or allow thermostat to be set at higher temperature', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020120, 'jkId': '302012014', 'actionText' : 'In cooler times set fans to winter setting, to send warm air down', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020120, 'jkId': '302012015', 'actionText' : 'Use clothing for personal heating or cooling', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020120, 'jkId': '302012016', 'actionText' : 'For high ceilings consider installing thermal destratification fans or a hanging ceiling', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020120, 'jkId': '302012017', 'actionText' : 'Extraction fans, vents and chimney balloons may provide efficiency gains (must be closed when not is use) to manage temperature', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020120, 'jkId': '302012018', 'actionText' : 'Floor mat heaters are efficient for single person use', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020120, 'jkId': '302012019', 'actionText' : 'Investigate the option of using heat recovery technology', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020120, 'jkId': '302012020', 'actionText' : 'External shading on exposed sides of buildings and air conditioning units improves efficiencies', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020120, 'jkId': '302012021', 'actionText' : 'Plant life in appropriate positions can provide a range of benefits', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020120, 'jkId': '302012022', 'actionText' : 'Insulate roofing, walls, floors, hot water storage and ducts.', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020120, 'jkId': '302012023', 'actionText' : 'Install energy efficient windows', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020120, 'jkId': '302012024', 'actionText' : 'Draught proof all rooms', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020120, 'jkId': '302012025', 'actionText' : 'Install roof ventilation', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020120, 'jkId': '302012026', 'actionText' : 'Paint rooftops white or with reflective paint to reduce heat', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020120, 'jkId': '302012027', 'actionText' : 'Install air curtains, revolving doors and automated doors where appropriate to control temperature', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020120, 'jkId': '302012028', 'actionText' : 'Clean and maintain fans regularly', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020120, 'jkId': '302012029', 'actionText' : 'Ensure fans have variable speed controls', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020120, 'jkId': '302012030', 'actionText' : 'Open windows for natural ventilation where possible', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020121, 'jkId': '302012101', 'actionText' : 'Turn off non-critical equipment at the power point when not is use', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020121, 'jkId': '302012102', 'actionText' : 'Consider using a remote-controlled plug, EcoSwitch, foot switch power board or smart power board', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020121, 'jkId': '302012103', 'actionText' : 'Set equipment such as fax machines, photocopiers and computer servers with energy saving settings to eco', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020121, 'jkId': '302012104', 'actionText' : 'Set monitors to sleep after minutes inactivity', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020121, 'jkId': '302012105', 'actionText' : 'Turn off monitors at lunch and end of day', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020121, 'jkId': '302012106', 'actionText' : 'Reduce monitor brightness as appropriate', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020121, 'jkId': '302012107', 'actionText' : 'Set computers to sleep after 30 minutes or less inactivity', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020121, 'jkId': '302012108', 'actionText' : 'Ensure IT equipment cooling fans are clean', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020121, 'jkId': '302012109', 'actionText' : 'Ensure IT equipment is placed in well ventilated areas', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020121, 'jkId': '302012110', 'actionText' : 'Consolidate IT equipment, eg the number of printers required', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020121, 'jkId': '302012111', 'actionText' : 'Utilise energy efficient printer cartridges', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020121, 'jkId': '302012112', 'actionText' : 'Consider cloud storage over server or hard drive options', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020121, 'jkId': '302012113', 'actionText' : 'File sharing software enables staff collaboration online', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020121, 'jkId': '302012114', 'actionText' : 'Software solutions for emailing scanned documents and legal agreements eliminate the need for couriers, pastage, paper and printers', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020121, 'jkId': '302012115', 'actionText' : 'Contracts can be signed digitally on notebooks such as the iPad etc using software', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020121, 'jkId': '302012116', 'actionText' : 'Consider leasing equipment with options to recycle and roll over to more energy efficient models', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020121, 'jkId': '302012117', 'actionText' : 'Laptops are more energy efficient than desktops', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020121, 'jkId': '302012118', 'actionText' : 'LED flat screen monitors are more energy efficient than LCD screens', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020121, 'jkId': '302012119', 'actionText' : 'Portable monitors powered by USB 3.0 port are an efficient option for a second screen', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020121, 'jkId': '302012120', 'actionText' : 'Smaller efficient monitors are cost effective compared to larger inefficient monitors (check star ratings)', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020121, 'jkId': '302012121', 'actionText' : 'Consider contracting a virtual server to reduce energy and cooling costs', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020121, 'jkId': '302012122', 'actionText' : 'Incorporate efficiency policies in Energy Reduction Plan', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020122, 'jkId': '302012201', 'actionText' : 'Incorporate efficiency policies in Energy Reduction Plan', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020122, 'jkId': '302012202', 'actionText' : 'Set temperature of fridge to 4C degrees when storing animal products, otherwise set higher temperature as appropriate', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020122, 'jkId': '302012203', 'actionText' : 'Set freezer temperature to -18C degrees when storing animal products, otherwise set higher temperatures as appropriate', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020122, 'jkId': '302012204', 'actionText' : 'Turn off refrigeration when not required, consider using timer where appropriate', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020122, 'jkId': '302012205', 'actionText' : 'Check seals, hinges, catches and door gaskets regularly', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020122, 'jkId': '302012206', 'actionText' : 'Clean condensers regularly', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020122, 'jkId': '302012207', 'actionText' : 'Position fridges away from heat sources such as ovens and environmental factors e.g. sunlight', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020122, 'jkId': '302012208', 'actionText' : 'Use thermometer to check correct temperature settings', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020122, 'jkId': '302012209', 'actionText' : 'Reduce number of fridges/freezers where possible', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020122, 'jkId': '302012210', 'actionText' : 'Maintain and/or replace faulty or old compressors with energy efficient units', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020122, 'jkId': '302012211', 'actionText' : 'Increase insulation to improve efficiency', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020122, 'jkId': '302012212', 'actionText' : 'Install glass doors on displays', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020122, 'jkId': '302012213', 'actionText' : 'Upgrade to energy efficient refrigeration', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020122, 'jkId': '302012214', 'actionText' : 'Ensure refrigeration is level', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020122, 'jkId': '302012215', 'actionText' : 'Defrosting maximises efficiency and reduces running costs', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020122, 'jkId': '302012216', 'actionText' : 'Periodically clean condenser coils where possible', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020122, 'jkId': '302012217', 'actionText' : 'Encourage staff and customers to close doors as quickly as possible', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020122, 'jkId': '302012218', 'actionText' : 'Consider variable speed motors to fridge and freezer fans to reduce power spikes and reduce energy consumption', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020122, 'jkId': '302012219', 'actionText' : 'Ensure at least 50-80mm of clear space between walls and back of refrigeration units', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020122, 'jkId': '302012220', 'actionText' : 'Evenly fill fridges 2/3 full and freezers 3/4 full to achieve maximum efficiency. Fill space with airtight bottles as required.', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020122, 'jkId': '302012221', 'actionText' : 'Stack refrigeration units to allow for circulation of air for maximum efficiency', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020122, 'jkId': '302012222', 'actionText' : 'Reduce or remove heat producing refrigeration lighting with LED or CFL lights attached to door open sensors', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020122, 'jkId': '302012223', 'actionText' : 'Consider installing insulation blankets, curtains and/or thermo-rollers', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020122, 'jkId': '302012224', 'actionText' : 'Consider retrofitting to natural refrigerants', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020122, 'jkId': '302012225', 'actionText' : 'investigate point-of-sale refrigeration units using energy efficient natural refrigerants', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020122, 'jkId': '302012226', 'actionText' : 'Chest freezers are more efficient than upright freezers', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020122, 'jkId': '302012227', 'actionText' : 'Ensure thermostats and refrigeration equipment are kept away from heat sources, including direct sunlight', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020123, 'jkId': '302012301', 'actionText' : 'Incorporate efficiency policies in Energy Reduction Plan', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020123, 'jkId': '302012302', 'actionText' : 'Ensure coolest air is extracted at intake point', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020123, 'jkId': '302012303', 'actionText' : 'Service for leaks regularly', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020123, 'jkId': '302012304', 'actionText' : 'Optimise pressure', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020123, 'jkId': '302012305', 'actionText' : 'Switch off after use (especially nightime)', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020123, 'jkId': '302012306', 'actionText' : 'Minimise distance between air compressors and appliances', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020124, 'jkId': '302012401', 'actionText' : 'Incorporate efficiency policies in Energy Reduction Plan', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020124, 'jkId': '302012402', 'actionText' : 'Set HWS thermostat at minimum temperature of 60C degrees, maximum 65C degrees to avoid disease, unless instant hot water system then 50C degrees is acceptable', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020124, 'jkId': '302012403', 'actionText' : 'Check hot water taps and pipes for leaks', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020124, 'jkId': '302012404', 'actionText' : 'Utilise heat from wasted hot water to preheat incoming cold water', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020124, 'jkId': '302012405', 'actionText' : 'Turn off hot water systems when not required, although turn on 2 hours before required use to avoid disease', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020124, 'jkId': '302012406', 'actionText' : 'Hire a hot water expert for cost effective innovation options', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020124, 'jkId': '302012407', 'actionText' : 'Use cold water where appropriate', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020124, 'jkId': '302012408', 'actionText' : 'Use eco settings on equipment where possible', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020124, 'jkId': '302012409', 'actionText' : 'Set electric hot water system heating times to off peak times', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020124, 'jkId': '302012410', 'actionText' : 'Install flow regulator or sensor on hot water taps', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020124, 'jkId': '302012411', 'actionText' : 'Replace urns with a jug/kettle and fill only enough for purpose if possible, or put a timer on the urn', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020124, 'jkId': '302012412', 'actionText' : 'Switch off instant water boilers and urns, install timers to automate on/off times', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020124, 'jkId': '302012413', 'actionText' : 'Minimise the distance between hot water tanks and discharge points', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020124, 'jkId': '302012414', 'actionText' : 'Regular maintenance, including drain and flush of hot water systems reduces energy use and optimises lifespan', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020124, 'jkId': '302012415', 'actionText' : 'Install water-efficient showerheads and encourage four minute showers', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020124, 'jkId': '302012416', 'actionText' : 'Insulate hot water pipes with R1 rated insulation at least 10mm thick, 100mm flanged valve and external pipes with 100mm insulation', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020124, 'jkId': '302012417', 'actionText' : 'Should your hot water system break down unexpectedly, choose an installer that will provide a temporary water heater to provide time to choose an appropriate replacement', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020124, 'jkId': '302012418', 'actionText' : 'Consider replacement with solar hot water or heat pump system, right size for needs and consider separate systems for varied needs across operations', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020124, 'jkId': '302012419', 'actionText' : 'Retrofit equipment and systems using hot water supply', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020124, 'jkId': '302012420', 'actionText' : 'Utilise instant hot water system/s where most efficient and appropriate', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020125, 'jkId': '302012501', 'actionText' : 'Incorporate efficiency policies in Energy Reduction Plan', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020125, 'jkId': '302012502', 'actionText' : 'Schedule regular vehicle serving', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020125, 'jkId': '302012503', 'actionText' : 'Check wheel alignment every 6 months/10,000km', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020125, 'jkId': '302012504', 'actionText' : 'Check coolant and motor oil regularly, using recommended oil grades', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020125, 'jkId': '302012505', 'actionText' : 'Check tyre pressures and service tread regularly', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020125, 'jkId': '302012506', 'actionText' : 'Consider low-rolling resistance tyres for fuel efficiency gains', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020125, 'jkId': '302012507', 'actionText' : 'Organise travel into geographical zones for time and fuel efficiency gains', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020125, 'jkId': '302012508', 'actionText' : 'Consider car-sharing when appropriate', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020125, 'jkId': '302012509', 'actionText' : 'Consider telecommunication technology to improve staff travel requirements', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020125, 'jkId': '302012510', 'actionText' : 'Offer employees amenities to enable cycling to and from work, such as secure storage, shower and change rooms', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020125, 'jkId': '302012511', 'actionText' : 'Purchase or lease smallest appropriate fuel efficient vehicle for task', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020126, 'jkId': '302012601', 'actionText' : 'Incorporate efficiency policies in Energy Reduction Plan', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020126, 'jkId': '302012602', 'actionText' : 'Do not leave vehicles running when stationery', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020126, 'jkId': '302012603', 'actionText' : 'Avoid hard acceleration and braking by watching traffic patterns ahead', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020126, 'jkId': '302012604', 'actionText' : 'Operate vehicles gently rather harshly to reduce wear and tear on engine, tyres, transmission and brakes', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020126, 'jkId': '302012605', 'actionText' : 'Avoid peak hour driving when possible', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020126, 'jkId': '302012606', 'actionText' : 'Close sunroofs and windows where possible to reduce wind resistance', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020126, 'jkId': '302012607', 'actionText' : 'Turn off air conditioning unless driving over 80km/h, otherwise close windows and turn on air conditioning if required', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020126, 'jkId': '302012608', 'actionText' : 'In warm weather, open doors and/or windows to allow hot air to escape before operating air conditioning', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020126, 'jkId': '302012609', 'actionText' : 'Minimise loads where possible to carry required equipment only', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020126, 'jkId': '302012610', 'actionText' : 'Consider eco-driving courses for staff', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020127, 'jkId': '302012701', 'actionText' : 'Incorporate efficiency policies in Energy Reduction Plan', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020127, 'jkId': '302012702', 'actionText' : 'Use LPG or renewable energy', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020127, 'jkId': '302012703', 'actionText' : 'Clean all equipment to allow for better heat transfer', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020127, 'jkId': '302012704', 'actionText' : 'Calibrate all thermostats', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020127, 'jkId': '302012705', 'actionText' : 'Utilise variable speed settings on exhaust fans', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020127, 'jkId': '302012706', 'actionText' : 'Turn off equipment when not in use', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020127, 'jkId': '302012707', 'actionText' : 'Minimise opening oven doors', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020127, 'jkId': '302012708', 'actionText' : 'Preheat ovens only when required', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020127, 'jkId': '302012709', 'actionText' : 'Turn on equipment as late as possible and off as early as possible', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020127, 'jkId': '302012710', 'actionText' : 'Set equipment to low settings as often as possible', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020127, 'jkId': '302012711', 'actionText' : 'Keep lids on pots filled with just enough water to required', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020127, 'jkId': '302012712', 'actionText' : 'Use smaller appliances when possible', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020127, 'jkId': '302012713', 'actionText' : 'Maintain equipment regularly including oven seals', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020127, 'jkId': '302012714', 'actionText' : 'Maintain pots and pans with flat bases and correctly fitting lids', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020127, 'jkId': '302012715', 'actionText' : 'Set exhaust hoods to low settings or off during quieter periods', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020127, 'jkId': '302012716', 'actionText' : 'Use insulated equipment where possible', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020127, 'jkId': '302012717', 'actionText' : 'Use modern energy efficient dishwashers', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020127, 'jkId': '302012718', 'actionText' : 'Stay up-to-date on energy efficient options for the kitchen', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020128, 'jkId': '302012801', 'actionText' : 'Incorporate efficiency policies in Energy Reduction Plan', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020128, 'jkId': '302012801', 'actionText' : 'Set filter on timer at low tarrif periods', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020128, 'jkId': '302012801', 'actionText' : 'Cover when not in use', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020128, 'jkId': '302012801', 'actionText' : 'Allow natural light to heat if possible', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020129, 'jkId': '302012901', 'actionText' : 'Incorporate efficiency policies in Energy Reduction Plan', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020129, 'jkId': '302012902', 'actionText' : 'Full loads only', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020129, 'jkId': '302012903', 'actionText' : 'Investigate energy efficient equipment options', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020129, 'jkId': '302012904', 'actionText' : 'Natural drying where possible', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020129, 'jkId': '302012905', 'actionText' : 'Turn off all equipment when not in use', 'createDate': new Date(), 'activeFlag': true});
EcoActions.insert({'questionId': q3020129, 'jkId': '302012906', 'actionText' : 'Investigate alternatives e.g. out sourcing', 'createDate': new Date(), 'activeFlag': true});

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

  CategoryUse.insert({
    rootcategory: "Energy",
    category: "Electricity",
    subcategory: "Heating",
    activeFlag: true
  });

  CategoryUse.insert({
    rootcategory: "Energy",
    category: "Electricity",
    subcategory: "Lighting",
    activeFlag: true
  });

  CategoryUse.insert({
    rootcategory: "Energy",
    category: "Electricity",
    subcategory: "Office Equipment",
    activeFlag: true
  });

  CategoryUse.insert({
    rootcategory: "Energy",
    category: "Electricity",
    subcategory: "Refrigeration",
    activeFlag: true
  });

  CategoryUse.insert({
    rootcategory: "Energy",
    category: "Electricity",
    subcategory: "HVAC",
    activeFlag: true
  });

  CategoryUse.insert({
    rootcategory: "Energy",
    category: "Electricity",
    subcategory: "IT Systems",
    activeFlag: true
  });

  CategoryUse.insert({
    rootcategory: "Energy",
    category: "Electricity",
    subcategory: "Air compressors",
    activeFlag: true
  });

  CategoryUse.insert({
    rootcategory: "Energy",
    category: "Electricity",
    subcategory: "Hot Water",
    activeFlag: true
  });

  CategoryUse.insert({
    rootcategory: "Energy",
    category: "Electricity",
    subcategory: "Pool",
    activeFlag: true
  });

  CategoryUse.insert({
    rootcategory: "Energy",
    category: "Electricity",
    subcategory: "Appliances",
    activeFlag: true
  });

  CategoryUse.insert({
    rootcategory: "Energy",
    category: "Fuel",
    subcategory: "Production Motors",
    activeFlag: true
  });
  CategoryUse.insert({
    rootcategory: "Energy",
    category: "Fuel",
    subcategory: "Motor Vehicle",
    activeFlag: true
  });

}
