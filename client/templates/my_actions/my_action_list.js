Template.myActionList.helpers({
  outstandingCount: function() {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    return MyActions.find({organisationId: orgId, activeFlag: true, completeFlag: false, planFlag: false}).count()
  },
  plannedCount: function() {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    return MyActions.find({organisationId: orgId, activeFlag: true, completeFlag: false, planFlag: true}).count()
  },
  completedCount: function() {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    return MyActions.find({organisationId: orgId, activeFlag: true, planFlag: false, completeFlag: true}).count()
  }
})
