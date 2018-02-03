Template.userList.helpers({
  allUsers: function() {
    return Meteor.users.find().fetch();
  }
});
