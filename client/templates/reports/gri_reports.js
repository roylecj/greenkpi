Template.griReports.helpers({
  companyName: function() {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    return Organisation.findOne({_id: orgId}).organisationName;
  },
  energyType: function() {
    // Select all of the energy types that we have bills for.

    return ReferenceData.find({dataType: "ENERGY_BILL", activeFlag: true}).fetch();
  },
  companyLogo: function() {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    return Organisation.findOne({_id: orgId}).logoPath;
  },
  companyDescription: function() {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    return Organisation.findOne({_id: orgId}).description;
  },
  companyAddress: function() {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    var addr = Organisation.findOne({_id: orgId}).address;
    var addrString = "";

    addrString = addrString + addr.line1 + '<br/>';
    if (addr.line2 !== "") {
        addrString = addrString + addr.line2 + '<br/>';
    }
    addrString = addrString + addr.suburb + ' ' + addr.stateCode + ' ' + addr.postcode;

    return addrString
  },
  companySector: function() {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    var sectorCode = Organisation.findOne({_id: orgId}).sector;

    var sectorDescription = ReferenceData.findOne({dataType: "GRI_SECTORS", code: sectorCode}).description;

    return sectorDescription;
  },
  companyEmployees: function() {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    var employeeCount = Organisation.findOne({_id: orgId}).employees;

    return  ReferenceData.findOne({dataType: "EMPLOYEE_COUNT", code: employeeCount}).description;

  },
  completedAction: function() {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    return MyActions.find({organisationId: orgId, completeFlag: true, activeFlag: true}).fetch();
  },
  plannedAction: function() {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    return MyActions.find({organisationId: orgId, planFlag: true, activeFlag: true}).fetch();
  },
  startDate: function() {
    // Get the start date that was returned

    return moment(Router.current().params.startDate).format("DD MMM YYYY");
  },
  endDate: function() {
    // Get the end date that was sent through

    return moment(Router.current().params.endDate).format("DD MMM YYYY");
  },
  energyIntent: function() {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    return MyIntents.findOne({intentType: "ENERGY", organisationId: orgId, activeFlag: true}).description
  }
});

Template.griReports.events({
  'click .btnPrintReport': function(e, t) {
    window.print();
  }
})
