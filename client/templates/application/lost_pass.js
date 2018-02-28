Template.lostPass.onCreated(function() {
  Session.setDefault("resetClicked", false);
});

Template.lostPass.helpers({
  isResetClicked: function() {
    return Session.get("resetClicked");
  }
})
Template.lostPass.events({
  'click .btnSendReset': function(e, t) {
    e.preventDefault();

    var userEmail =  $(document).find('[name=emailAddress]').val();

    Meteor.call("sendEmailForgotPassword", userEmail);
    Session.set("resetClicked", true);
  }
})
