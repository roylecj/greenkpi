Template.myPlannedList.helpers({
  plannedItem: function() {
        Session.set("currentMenu", "ACTION");

    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    return MyActions.find({organisationId: orgId, planFlag: true}).fetch();
  },
  nonePlanned: function() {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    var isPlanned = MyActions.find({organisationId: orgId, planFlag: true}).count();

    if (isPlanned > 0) {
      return false
    } else {
      return true
    }
  }
});
