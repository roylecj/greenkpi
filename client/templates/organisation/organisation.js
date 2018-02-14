Template.organisation.helpers({
  isConnecting: function() {
    return Session.get("connectingToOtherOrg")
  },
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

    return Organisation.findOne({_id: org.organisationId}).organisationName;
  },
  orgDescription: function() {
    var org = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true});

    return Organisation.findOne({_id: org.organisationId}).description;
  },
  orgAddr1: function() {
    var org = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true});

    return Organisation.findOne({_id: org.organisationId}).address.line1;
  },
  orgAddr2: function() {
    var org = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true});

    return Organisation.findOne({_id: org.organisationId}).address.line2;
  },
  orgAddrSuburb: function() {
    var org = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true});

    return Organisation.findOne({_id: org.organisationId}).address.suburb;
  },
  orgAddrPostcode: function() {
    var org = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true});

    return Organisation.findOne({_id: org.organisationId}).address.postcode;
  },
  companyLogoPath: function() {
    var org = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true});

    Session.set("companyImage", Organisation.findOne({_id: org.organisationId}).logoPath);
    return Organisation.findOne({_id: org.organisationId}).logoPath;

  }

});

Template.organisation.events({
  'click .btnSaveSettings': function(e, t) {

    e.preventDefault();

    var userId = Meteor.userId();
    var orgName = $(e.target.parentNode.parentNode.parentNode).find('[name=companyName]').val();
    var orgDescription = $(e.target.parentNode.parentNode.parentNode).find('[name=companyBrief]').val();
    var orgSector = $(e.target.parentNode.parentNode.parentNode).find('[name=companySector]').val();
    var orgEmployees = $(e.target.parentNode.parentNode.parentNode).find('[name=companyEmployees]').val();
    var orgLogoPath = Session.get("companyImage");
    var orgAddr1 = $(e.target.parentNode.parentNode.parentNode).find('[name=companyAddr1]').val();
    var orgAddr2 = $(e.target.parentNode.parentNode.parentNode).find('[name=companyAddr2]').val();
    var orgSuburb = $(e.target.parentNode.parentNode.parentNode).find('[name=companyAddrSuburb]').val();
    var orgState = $(e.target.parentNode.parentNode.parentNode).find('[name=companyAddrState]').val();
    var orgPostcode = $(e.target.parentNode.parentNode.parentNode).find('[name=companyAddrPCODE]').val();

    Meteor.call('saveOrganisation', userId, orgName, orgDescription, orgSector, orgEmployees, orgLogoPath, orgAddr1, orgAddr2, orgSuburb, orgState, orgPostcode);

    sAlert.success("Saved");
  },
  'change .myFileInput': function(event, template) {

      FS.Utility.eachFile(event, function(file) {
        Images.insert(file, function (err, fileObj) {
          if (err){
             // handle error
          } else {
             // handle success depending what you need to do
            var userId = Meteor.userId();
            var imagesURL = {
              "profile.image": "/cfs/files/images/" + fileObj._id
            };
            Meteor.users.update(userId, {$set: imagesURL});
            Session.set("companyImage", "/cfs/files/images/" + fileObj._id);

          }
        });

     });

      Session.set("companyChange", true);
      
     Router.go("organisation");
   },
})
