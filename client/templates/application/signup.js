Template.signup.events({
  'click .btnCancelSignup': function(e, t) {
    e.preventDefault();
    Router.go('login');
  }
})
