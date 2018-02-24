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

    var userEmail =  $(e.target.parentNode.parentNode.parentNode).find('[name=emailAddress]').val();

    Meteor.call("sendEmailForgotPassword", userEmail);
    Session.set("resetClicked", true);
  }
})
