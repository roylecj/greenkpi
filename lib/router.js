Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return [
      Meteor.subscribe("myActions"),
      Meteor.subscribe("myMetrics"),
      Meteor.subscribe("ecoQuestions"),
      Meteor.subscribe("ecoActions"),
      Meteor.subscribe("myQuestions"),
      Meteor.subscribe("myActionNotes"),
      Meteor.subscribe("userDirectory")
    ];
  }
});

Router.route('/', {name: 'login'});

Router.route('/home', {name: 'home'});

Router.route('/actions', {
  name: 'actionList'
});

Router.route('/myActionList', {
  name: 'myActionList'
});
var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
    this.render('accessDenied');
  }
  }
  else {
    this.next();
  }
};

Router.onBeforeAction(requireLogin, {except: ['login']});
