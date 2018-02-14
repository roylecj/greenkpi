Template.sideMenu.helpers({
  loggedIn: function() {
    if (Meteor.loggedIn) {
      Session.set("sidebarVisible", true)
    } else {
      Session.set("sidebarVisible", false)
    }
  },
  imageProfile: function() {

    if (Session.get("companyChange")) {
      debugger
      
      Session.set("companyChange", false);
      return false
    } else {
      if (! Meteor.user().profile.image) {
        return false
      } else {
        return true
      }
    }
  },
  profileImage: function() {
    if (Session.get("companyImage")) {
      // do stuff
    }
    return Meteor.user().profile.image
  },
  organisationName: function() {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    return Organisation.findOne({_id: orgId}).organisationName
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
Template.sideMenu.events({
  'click .btnOpenAdmin': function(e, t) {
    Session.set("openAdminMenu", ! Session.get("openAdminMenu"));
  }
})
