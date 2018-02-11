Template.myOutstandingList.helpers({
  outstandingItem: function() {
    Session.set("currentMenu", "ACTION");

    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    return MyActions.find({organisationId: orgId, completeFlag: false, planFlag: false}).fetch();
  },
  noneOutstanding: function() {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    var isOutstanding = MyActions.find({organisationId: orgId, completeFlag: false, planFlag: false}).count();

    if (isOutstanding > 0) {
      return false
    } else {
      return true
    }
  }
});
