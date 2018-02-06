Template.userList.helpers({
  allUsers: function() {
    return Meteor.users.find().fetch();
  },
  userGroupTypes: function() {
//    return ReferenceData.find({dataType: "USER_GROUP", activeFlag: true}).fetch();
    return Meteor.roles.find().fetch();
  },
  newUser: function() {
    return Session.get("newUser");
  },
  newActiveUser: function() {
    return Session.get("newActiveUser");
  }
});

Template.userList.events({
  'click .btnAddNew': function(e, t) {
    Session.set("newUser", true);
    Session.set("newActiveUser", true);
  },
  'click .btnSaveAddNew': function(e, t) {

    e.preventDefault();
    var userId =  $(e.target.parentNode.parentNode.parentNode).find('[name=userName]').val();
    var userName = $(e.target.parentNode.parentNode.parentNode).find('[name=personName]').val();
    var emailAddress = $(e.target.parentNode.parentNode.parentNode).find('[name=emailAddress]').val();
    var userGroup = $(e.target.parentNode.parentNode.parentNode).find('[name=userGroup]').val();
    var isActive = Session.get("newActive")

    Meteor.call('addUser', userId, userName, emailAddress, userGroup, isActive, function(e, result) {
      if (! e) {
        sAlert.error(e);
      }
      var uId = "";

      uId = Meteor.users.findOne({username: userId})._id;
      Meteor.call('addUserRole', uId, userGroup);
    });

    Session.set("newUser", false);

  },
  'click .btnCancelAddNew': function(e, t) {
    Session.set("newUser", false);
  },
  'click .btnInactiveUser': function(e, t) {
    Session.set("newActiveUser", true);
  },
  'click .btnActiveUser': function(e, t) {
    Session.set("newActiveUser", false);
  }
});
