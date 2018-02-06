
Template.settings.helpers({
  employeeCountTypes: function() {
    return ReferenceData.find({dataType: "EMPLOYEE_COUNT", activeFlag: true}).fetch();
  },
  sectorTypes: function() {
    return ReferenceData.find({dataType: "GRI_SECTORS", activeFlag: true}).fetch();
  },
  stateCodes: function() {
    return ReferenceData.find({dataType: "STATE_CODES", activeFlag: true}).fetch();
  },
  myName: function() {
    return Meteor.user().profile.name;
  },
  myEmail: function() {
    return Meteor.user().emails[0].address;
  },
  orgName: function() {
    var org = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true});

    return org.organisationName;
  },
  orgDescription: function() {
    var org = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true});

    return org.description;
  },
  orgAddr1: function() {
    var org = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true});

    return org.address.line1;
  },
  orgAddr2: function() {
    var org = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true});

    return org.address.line2;
  },
  orgAddrSuburb: function() {
    var org = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true});

    return org.address.suburb;
  },
  orgAddrPostcode: function() {
    var org = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true});

    return org.address.postcode;
  }
});

Template.settings.events({
  'click .btnSaveGeneral': function(e, t) {

    // Check that person name, email address and password are valid
    var personName =  $(e.target.parentNode.parentNode.parentNode).find('[name=myName]').val();
    var emailAddress = $(e.target.parentNode.parentNode.parentNode).find('[name=myEmail]').val();
    var password = $(e.target.parentNode.parentNode.parentNode).find('[name=myPasswd]').val();

    Meteor.call('updateAccount', personName, emailAddress, password);

    sAlert.success("Saved");
  },
  'click .btnSaveAccount': function(e, t) {

debugger

    var userId = Meteor.userId();
    var orgName = $(e.target.parentNode.parentNode.parentNode).find('[name=companyName]').val();
    var orgDescription = $(e.target.parentNode.parentNode.parentNode).find('[name=companyBrief]').val();
    var orgSector = $(e.target.parentNode.parentNode.parentNode).find('[name=companySector]').val();
    var orgEmployees = $(e.target.parentNode.parentNode.parentNode).find('[name=companyEmployees]').val();
    var orgLogoPath = "";
    var orgAddr1 = $(e.target.parentNode.parentNode.parentNode).find('[name=companyAddr1]').val();
    var orgAddr2 = $(e.target.parentNode.parentNode.parentNode).find('[name=companyAddr2]').val();
    var orgSuburb = $(e.target.parentNode.parentNode.parentNode).find('[name=companyAddrSuburb]').val();
    var orgState = $(e.target.parentNode.parentNode.parentNode).find('[name=companyAddrState]').val();
    var orgPostcode = $(e.target.parentNode.parentNode.parentNode).find('[name=companyAddrPCODE]').val();

    Meteor.call('saveOrganisation', userId, orgName, orgDescription, orgSector, orgEmployees, orgLogoPath, orgAddr1, orgAddr2, orgSuburb, orgState, orgPostcode);

    sAlert.success("Saved");
  }
})
