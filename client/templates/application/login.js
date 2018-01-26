Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});

Template.login.onCreated(function() {
    Session.set('signedIn', false);
});

Template.login.events({
  'submit form': function(e) {
    e.preventDefault();

    var userId =  $(e.target).find('[name=loginName]').val();
    var password = $(e.target).find('[name=password]').val();

    Meteor.loginWithPassword(userId, password, function(e) {
        console.log("logging in with " + userId);

        console.log(e);

        if (!e) {
        Session.set('signedIn', true);
        Router.go('home');
      } else {
        sAlert.error('Error logging in: ' + e.reason);
      }
    });
  },
  'click .btnSignup': function(e, t) {
    e.preventDefault();
  }
})
