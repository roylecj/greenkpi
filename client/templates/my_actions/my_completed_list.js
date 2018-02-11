Template.myCompletedList.helpers({
  completedItem: function() {
    Session.set("currentMenu", "ACTION");

    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    return MyActions.find({organisationId: orgId, completeFlag: true}).fetch();
  },
  noneComplete: function() {

    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    var isCompleted = MyActions.find({organisationId: orgId, completeFlag: true}).count();

    if (isCompleted > 0) {
      return false
    } else {
      return true
    }
  }
});
