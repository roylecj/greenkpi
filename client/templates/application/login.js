Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});

Template.login.onCreated(function() {
    Session.set('signedIn', false);
    Session.setDefault('sidebarMini', false);
});

Template.login.onRendered(function() {
//    Session.set('headingVisible', false);
//    Session.set('sidebarVisible', false);
});


Template.login.events({
  'click .btnSigningup': function(e, t) {
    e.preventDefault();

    Router.go("pricing");
  },
  'submit form': function(e) {
    e.preventDefault();

    var userId =  $(e.target).find('[name=loginName]').val();
    var password = $(e.target).find('[name=password]').val();

    Meteor.loginWithPassword(userId, password, function(e) {
        console.log("logging in with " + userId);

        if (Roles.userIsInRole(Meteor.userId(), 'DISABLED')) {

          sAlert.error("This user is currently locked out");

          Session.set('signedIn', false);
          Router.go('login');
        } else {
          console.log(e);

            if (!e) {
            Session.set('signedIn', true);
            Router.go('dashboard');
          } else {
        sAlert.error('Error logging in: ' + e.reason);

        Meteor.call('incorrectPassword', userId);
      }}
    });
  },
})
