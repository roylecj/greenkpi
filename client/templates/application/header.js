Template.header.onCreated(function() {
  Session.setDefault("showFilter", "");
});

Template.header.helpers({
  energyButtonState: function() {
    if (Session.get("showFilter") === "ENERGY" || Session.get("showFilter") === "") {
      return "btn-success"
    } else {
      return "btn-default"
    }
  },
  waterButtonState: function() {
    if (Session.get("showFilter") === "WATER" || Session.get("showFilter") === "") {
      return "btn-info"
    } else {
      return "btn-default"
    }
  },
  wasteButtonState: function() {
    if (Session.get("showFilter") === "WASTE" || Session.get("showFilter") === "") {
      return "btn-danger"
    } else {
      return "btn-default"
    }
  },
  headingVisible: function() {
    if (Session.get("headingVisible")) {
      return true
    } else {
      return false
    }
  },
  sidebarVisible: function() {
    if (Session.get("sidebarVisible")) {
      return true
    } else {
      return false
    }
  },
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

    e.preventDefault();

    Meteor.logout();

    Session.set("signedIn", false);
    Router.go("login");
  },
  'click .btnSettings': function(e) {

    e.preventDefault();
    Router.go("settings");
  },
  'click .sidebar-toggle': function(e, t) {
    Session.set("sidebarVisible", ! Session.get("sidebarVisible"));
  },
  'click .btnEnergy': function(e, t) {

    e.preventDefault();

    if (Session.get("showFilter") === "ENERGY") {
      Session.set("showFilter", "");
    } else {
      Session.set("showFilter", "ENERGY");
    }
  },
  'click .btnWater': function(e, t) {

    e.preventDefault();

    if (Session.get("showFilter") === "WATER") {
      Session.set("showFilter", "");
    } else {
      Session.set("showFilter", "WATER");
    }

  },
  'click .btnWaste': function(e, t) {
    e.preventDefault();

    if (Session.get("showFilter") === "WASTE") {
      Session.set("showFilter", "");
    } else {
      Session.set("showFilter", "WASTE");
    }

  }
});
