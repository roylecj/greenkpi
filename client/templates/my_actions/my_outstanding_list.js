Template.myOutstandingList.helpers({
  outstandingItem: function() {
    Session.set("currentMenu", "ACTION");
    return MyActions.find({userId: Meteor.userId(), completeFlag: false, planFlag: false}).fetch();
  },
  noneOutstanding: function() {
    var isOutstanding = MyActions.find({userId: Meteor.userId(), completeFlag: false, planFlag: false}).count();

    if (isOutstanding > 0) {
      return false
    } else {
      return true
    }
  }
});
