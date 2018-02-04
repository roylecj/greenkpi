Template.userItem.helpers({
    userRole: function() {
      var roles = Roles.getRolesForUser(this._id);

      var currentRole = roles[0];

      return currentRole;

    }
});

Template.userItem.events({
  'click .btnEditUser': function(e, t) {
    e.preventDefault();
  },
  'click .btnDeleteUser': function(e, t) {
    e.preventDefault();

    sAlert.error("User removed");
    Meteor.call('removeUser', this._id);
  }
});
