Template.sideMenu.helpers({
  loggedIn: function() {
    if (Meteor.loggedIn) {
      Session.set("sidebarVisible", true)
    } else {
      Session.set("sidebarVisible", false)
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
  isCurrentMenu: function(thisMenu) {
    if (Session.get("currentMenu") === thisMenu) {
      return 'active'
    } else {
      return ''
    }
  },

});
