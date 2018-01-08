Template.myPlannedList.helpers({
  plannedItem: function() {
        Session.set("currentMenu", "ACTION");
    return MyActions.find({userId: Meteor.userId(), planFlag: true}).fetch();
  },
  nonePlanned: function() {
    var isPlanned = MyActions.find({userId: Meteor.userId(), planFlag: true}).count();

    if (isPlanned > 0) {
      return false
    } else {
      return true
    }
  }
});
