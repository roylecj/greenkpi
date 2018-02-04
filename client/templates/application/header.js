Template.header.helpers({
  currentUserName: function() {
    return Meteor.user().profile.name;
  },
  signedIn: function() {
    return Session.get("signedIn");
  },
  actionCount: function() {
    var userId = Meteor.userId();

    return MyActions.find({userId: userId, completeFlag: false}).count()
  },
  incompleteActions: function() {
    var a;

    a = MyActions.find({userId: Meteor.userId(), completeFlag: false}).count();

    if (a === 0) {
      return false
    } else {
      return true
    }
  },
  isAdminRole: function() {
    if (Roles.userIsInRole(Meteor.userId(), 'ADMIN')) {
      return true
    } else {
      return false
    }
  },
  isCurrent: function(thisMenu) {
    if (Session.get("currentMenu") === thisMenu) {
      return true
    } else {
      return false
    }
  },
  isCurrentMenu: function(thisMenu) {
    if (Session.get("currentMenu") === thisMenu) {
      return '<span class="sr-only">(current)</span>'
    } else {
      return ''
    }
  },
  isActions: function() {
    if (Session.get("currentMenu") === "ACTIONS") {
      return true
    } else {
      return false
    }
  },
  isPlan: function() {
    if (Session.get("currentMenu") === "PLAN") {
      return true
    } else {
      return false
    }
  }
});

Template.header.events({
  'click .btnLogout': function(e) {

    Meteor.logout();

    Session.set("signedIn", false);
    Router.go("login");
  },
  'click .btnSettings': function(e) {

    e.preventDefault();
    Router.go("settings");
  }
});
