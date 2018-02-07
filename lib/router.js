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
      Meteor.subscribe("userDirectory"),
      Meteor.subscribe("mySettings"),
      Meteor.subscribe("referenceData"),
      Meteor.subscribe("vendor"),
      Meteor.subscribe("myIntents"),
      Meteor.subscribe("myOrganisation"),
      Meteor.subscribe("auditInfo")
    ];
  }
});

Router.route('/', {name: 'login'});
Router.route('/charts', {name: 'charts'});
Router.route('/home', {name: 'home'});
Router.route('/intents', {name: 'intents'});
Router.route('/gri', {name: 'griReports'});

Router.route('/actions', {
  name: 'actionList'
});

Router.route('/sms', {name: 'sms'});
Router.route('/reports', {name: 'reports'});
Router.route('/settings', {name: 'settings'});
Router.route('/opReports', {name: 'operationalReports'})
Router.route('/myActionList', {
  name: 'myActionList'
});

Router.route('/users', {name: 'userList'});
Router.route('/referenceValues', {name: 'referenceDataList'});

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

var setAction = function() {
  Session.set("currentMenu", "ACTIONS")
};

var setPlan = function() {
  Session.set("currentMenu", "PLAN")
};

var setSMS = function() {
  Session.set("currentMenu", "SMS")
};

var setReports = function() {
  Session.set("currentMenu", "REPORTS");
};

var setIntents = function() {
  Session.set("currentMenu", "INTENTS");
};

var setClearMenu = function() {
  Session.set("currentMenu", "");
}

Router.onBeforeAction(requireLogin, {except: ['login']});
Router.onAfterAction(setAction, {only: 'actions'});
Router.onAfterAction(setSMS, {only: 'sms'});
Router.onAfterAction(setPlan, {only: 'myActionList'});
Router.onAfterAction(setReports, {only: 'reports'});
Router.onAfterAction(setIntents, {only: 'intents'});

Router.onAfterAction(setClearMenu, {except: ['actions', 'sms', 'myActionList', 'reports']});
