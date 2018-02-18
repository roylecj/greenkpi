Template.timeline.helpers({
  eventItems: function() {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    return MyEvents.find({organisationId: orgId, activeFlag: true}, {limit : 5}).fetch();
  }
})
