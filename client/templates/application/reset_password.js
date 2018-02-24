Template.resetPassword.events({
  'click .btnSave': function(e, t) {
    // Update password

    // We need to check the ID coming from the reset, and the user that we are reseting.

    Meteor.call('resetUserPassword', this._id, userEmail, newPassword);

    sAlert.success('updated');

    Router.go('login');
  }
});
