
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
    var personName =  $(document).find('[name=myName]').val();
    var emailAddress = $(document).find('[name=myEmail]').val();
    var password = $(document).find('[name=myPasswd]').val();

    Meteor.call('updateAccount', personName, emailAddress, password);

    sAlert.success("Saved");

  },
})
