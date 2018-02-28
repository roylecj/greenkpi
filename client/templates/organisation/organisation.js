Template.organisation.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
});

Template.organisation.helpers({
  currentUpload() {
    return Template.instance().currentUpload.get();
  },
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

    var nodeItem;

    nodeItem = $(e.target).closest('tr');

    var userId = Meteor.userId();
    var orgName = $(nodeItem).find('[name=companyName]').val();
    var orgDescription = $(nodeItem).find('[name=companyBrief]').val();
    var orgSector = $(nodeItem).find('[name=companySector]').val();
    var orgEmployees = $(nodeItem).find('[name=companyEmployees]').val();
    var orgLogoPath = Session.get("companyImage");
    var orgAddr1 = $(nodeItem).find('[name=companyAddr1]').val();
    var orgAddr2 = $(nodeItem).find('[name=companyAddr2]').val();
    var orgSuburb = $(nodeItem).find('[name=companyAddrSuburb]').val();
    var orgState = $(nodeItem).find('[name=companyAddrState]').val();
    var orgPostcode = $(nodeItem).find('[name=companyAddrPCODE]').val();

    Meteor.call('saveOrganisation', userId, orgName, orgDescription, orgSector, orgEmployees, orgLogoPath, orgAddr1, orgAddr2, orgSuburb, orgState, orgPostcode);

    // Now that we have a user id, and an org, we can link the two, and add them as staff members.
    Meteor.call('addUserStaff', userId);

    sAlert.success("Saved");
  },
  'change #fileInput'(e, template) {
     if (e.currentTarget.files && e.currentTarget.files[0]) {
       // We upload only one file, in case
       // multiple files were selected
       const upload = Images.insert({
         file: e.currentTarget.files[0],
         streams: 'dynamic',
         chunkSize: 'dynamic'
       }, false);

       upload.on('start', function () {
         template.currentUpload.set(this);
       });

       upload.on('end', function (error, fileObj) {
         if (error) {
           sAlert.error('Error during upload: ' + error);
         } else {
           sAlert.success('File "' + fileObj.name + '" successfully uploaded');
         }
         template.currentUpload.set(false);

         var logoPath = 'cdn/server/' + fileObj._id + '.' + fileObj.extension;

         Meteor.user().profile.image = logoPath;

         Meteor.call('saveOrganisationLogo', logoPath )
       });

       upload.start();
     }
   }
})
