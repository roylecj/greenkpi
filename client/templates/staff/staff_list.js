Template.staffList.onCreated(function() {
  Session.setDefault("addingStaff", false);

});

Template.staffList.helpers({
  staffItems: function() {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    return MyStaff.find({organisationId: orgId, activeFlag: true}).fetch();
  },
  addingStaff: function() {
    return Session.get("addingStaff");
  }
});

Template.staffList.events({
  'click .btnAdd': function(e, t) {
    e.preventDefault();
    Session.set("addingStaff", true);
  },
  'click .btnCancelAddStaff': function(e, t) {
    e.preventDefault();
    Session.set("addingStaff", false);
  },
  'click .btnSaveAddStaff': function(e, t) {
    e.preventDefault();

    var nodeItem;

    nodeItem = $(e.target).closest('tr');

    var firstName = $(nodeItem).find('[name=firstName]').val();
    var lastName = $(nodeItem).find('[name=lastName]').val();
    var emailAddress = $(nodeItem).find('[name=emailAddress]').val();

    Meteor.call("saveNewStaff", firstName, lastName, emailAddress);

    sAlert.success("Saved");

    Session.set("addingStaff", false);
  }
})
