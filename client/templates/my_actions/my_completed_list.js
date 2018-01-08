Template.myCompletedList.helpers({
  completedItem: function() {
        Session.set("currentMenu", "ACTION");
    return MyActions.find({userId: Meteor.userId(), completeFlag: true}).fetch();
  },
  noneComplete: function() {
    var isCompleted = MyActions.find({userId: Meteor.userId(), completeFlag: true}).count();

    if (isCompleted > 0) {
      return false
    } else {
      return true
    }
  }
});
