
 if (ReferenceData.find().count() === 0) {

   console.log("Loading reference data");

/*
  Roles.createRole('ADMIN');
  Roles.createRole('STANDARD');
  Roles.createRole('DISABLED');
  Roles.createRole('READ_ONLY');
  Roles.createRole('NO ACCESS');
*/

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

  ReferenceData.insert({
    dataType: "ENERGY_TYPE",
    code: "ER",
    description: "Electricity - Renewable",
    createdAt: new Date(),
    activeFlag: true
  });

  ReferenceData.insert({
    dataType: "ENERGY_TYPE",
    code: "ENR",
    description: "Electricity - Non-renewable",
    createdAt: new Date(),
    activeFlag: true
  });

  ReferenceData.insert({
    dataType: "ENERGY_TYPE",
    code: "GAS",
    description: "Natural Gas",
    createdAt: new Date(),
    activeFlag: true
  });

  ReferenceData.insert({
    dataType: "ENERGY_TYPE",
    code: "DIESEL",
    description: "Diesel",
    createdAt: new Date(),
    activeFlag: true
  });

  ReferenceData.insert({
    dataType: "ENERGY_TYPE",
    code: "ULP",
    description: "Unleaded Petrol",
    createdAt: new Date(),
    activeFlag: true
  });

  ReferenceData.insert({
    dataType: "USAGE_TYPE",
    code: "KWH",
    description: "KW/h",
    createdAt: new Date(),
    activeFlag: true
  });

  ReferenceData.insert({
    dataType: "USAGE_TYPE",
    code: "GJ",
    description: "Gigajoules",
    createdAt: new Date(),
    activeFlag: true
  });

  ReferenceData.insert({
    dataType: "USAGE_TYPE",
    code: "CUBM",
    description: "Cubic Metres",
    createdAt: new Date(),
    activeFlag: true
  });

  ReferenceData.insert({
    dataType: "USAGE_TYPE",
    code: "L",
    description: "Litres",
    createdAt: new Date(),
    activeFlag: true
  });

  ReferenceData.insert({
    dataType: "USAGE_TYPE",
    code: "KL",
    description: "Kilolitres",
    createdAt: new Date(),
    activeFlag: true
  });

  ReferenceData.insert({
    dataType: "USAGE_TYPE",
    code: "ML",
    description: "Megalitres",
    createdAt: new Date(),
    activeFlag: true
  });

  ReferenceData.insert({
    dataType: "USAGE_TYPE",
    code: "GL",
    description: "Gigalitres",
    createdAt: new Date(),
    activeFlag: true
  });

  ReferenceData.insert({
    dataType: "TARIFF_TYPE",
    code: "P",
    description: "Peak",
    createdAt: new Date(),
    activeFlag: true
  });

  ReferenceData.insert({
    dataType: "TARIFF_TYPE",
    code: "OP",
    description: "Off-peak",
    createdAt: new Date(),
    activeFlag: true
  });

  ReferenceData.insert({
    dataType: "VENDOR",
    code: "ENERGEX",
    description: "Energex",
    createdAt: new Date(),
    activeFlag: true
  });

  ReferenceData.insert({
    dataType: "VENDOR",
    code: "ERGON",
    description: "Ergon",
    createdAt: new Date(),
    activeFlag: true
  });

}
