Template.layout.helpers({
  loggedIn: function() {
    if (Meteor.loggedIn) {
      return true
    } else {
      return false
    }
  },
  sidebarVisible: function() {
    if (Session.get("sidebarVisible") === true) {
      return ""
    } else {
      return "sidebar-collapse"
    }
  }
})
