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
      Meteor.subscribe("organisation"),
      Meteor.subscribe("auditInfo"),
      Meteor.subscribe("userAudit")
    ];
  }
});

Router.route('/', {name: 'login'});
Router.route('/dashboard', {name: 'dashboard'});
Router.route('/intents', {name: 'intents'});
Router.route('/gri', {name: 'griReports'});
Router.route('/profile', {name: 'profileItem'});
Router.route("/adminSettings", {name: 'adminSettings'});
Router.route('/organisation', {name: 'organisation'});
Router.route('/plan', {
  name: 'plan'
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

    if (Roles.userIsInRole(Meteor.userId(), "DISABLED")) {
      this.render('accessDenied');
    } else {
      this.next();
    }
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

var setUsers = function() {
  Session.set("currentMenu", "USERS");
};

var setHome = function() {
  Session.set("currentMenu", "HOME");
};

var setReferenceData = function() {
  Session.set("currentMenu", "REFDATA");
};

var setProfile = function() {
  Session.set("currentMenu", "PROFILE");
}

var setAdminSettings = function() {
  Session.set("currentMenu", "ADMINSETTINGS");
}

var setClearMenu = function() {
  Session.set("currentMenu", "");
};

var setShowHeadings = function() {
  Session.set("sidebarVisible", true);
  Session.set("headingVisible", true);
}

var setOrganisation = function() {
  Session.set("currentMenu", "ORGANISATION");
}
Router.onBeforeAction(requireLogin, {except: ['login']});
Router.onAfterAction(setPlan, {only: 'plan'});
Router.onAfterAction(setSMS, {only: 'sms'});
Router.onAfterAction(setAction, {only: 'myActionList'});
Router.onAfterAction(setReports, {only: 'reports'});
Router.onAfterAction(setIntents, {only: 'intents'});
Router.onAfterAction(setUsers, {only: 'userList'});
Router.onAfterAction(setReferenceData, {only: 'referenceDataList'});
Router.onAfterAction(setHome, {only: 'dashboard'});
Router.onAfterAction(setProfile, {only: 'profileItem'});
Router.onAfterAction(setAdminSettings, {only: 'adminSettings'});
Router.onAfterAction(setOrganisation, {only: 'organisation'});

Router.onAfterAction(setClearMenu, {except: ['plan', 'sms', 'myActionList', 'reports', 'userList', 'referenceDataList', 'dashboard', 'intents', 'profileItem', 'adminSettings', 'organisation']});

Router.onAfterAction(setShowHeadings, {except: 'login'});
