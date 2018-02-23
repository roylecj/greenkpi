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
      Meteor.subscribe("userAudit"),
      Meteor.subscribe("categoryUse"),
      Meteor.subscribe("myCategoryUse"),
      Meteor.subscribe("myTargets"),
      Meteor.subscribe("myLocations"),
      Meteor.subscribe("myEvents"),
      Meteor.subscribe("feedback"),
      Meteor.subscribe("myStaff"),
      Meteor.subscribe('files.images.all')
    ];
  }
});

Router.route('/', {name: 'login', layoutTemplate: 'layoutBlank'});
// Router.route('/smsEntry', {name: 'smsEntry'});
Router.route('/smsEdit/:_id', {
    name: 'smsEntry',
    data: function() {
      return MyMetrics.findOne(this.params._id);
    }
});

Router.route('/pricing', {name: 'pricing', layoutTemplate: 'layoutSignup'});
Router.route('/signup', {name: 'signup', layoutTemplate: 'layoutSignup'})
// Router.route('/smsEntry/:_id', {name: 'smsEntry'});
Router.route('/dashboard', {name: 'dashboard'});
Router.route('/intents', {name: 'intents'});
Router.route('/gri', {name: 'griReports'});
Router.route('/profile', {name: 'profileItem'});
Router.route("/adminSettings", {name: 'adminSettings'});
Router.route('/organisation', {name: 'organisation'});
Router.route('/plan', {
  name: 'plan'
});
Router.route("/staff", {name: 'staffList'});
Router.route('/feedback', {name: "feedbackList"});

Router.route( "/uploads/:filename", function() {
  // What we'd like to do when a request is made to this path.


}, { where: "server" });
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

var setFeedback = function() {
  Session.set("currentMenu", "FEEDBACK");
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

var setStaff = function() {
  Session.set("currentMenu", "STAFF");
}
Router.onBeforeAction(requireLogin, {except: ['login', 'pricing', 'signup']});
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
Router.onAfterAction(setFeedback, {only: 'feedbackList'});
Router.onAfterAction(setStaff, {only: 'staffList'});

Router.onAfterAction(setClearMenu, {except: ['plan', 'sms', 'myActionList', 'reports', 'userList', 'referenceDataList', 'dashboard', 'intents', 'profileItem', 'adminSettings', 'organisation', 'feedbackList', 'staffList']});

Router.onAfterAction(setShowHeadings, {except: 'login'});
