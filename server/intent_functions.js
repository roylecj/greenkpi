Meteor.methods({
  saveIntent: function(intentType, intentContent) {

    if (! Meteor.userId()) {
        throw new Meteor.Error('saveIntent.unauthorised');
    } else {
      if (Roles.userIsInRole(Meteor.userId(), "READ_ONLY")) {
        sAlert.error("Unable to save reduction plan");
      } else {
        var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

        // Update the previously active intent to inactive

        MyIntents.update({organisationId: orgId, intentType: intentType, activeFlag: true}, {$set: {activeFlag: false, modifiedAt: new Date(), modifiedBy: Meteor.userId()}});

        // Now add a new one.

        MyIntents.insert(
          {
            organisationId: orgId,
            intentType: intentType,
            description: intentContent,
            createdAt: new Date(),
            createdBy: Meteor.userId(),
            activeFlag: true
          }
        )
      }

    }

  },
});
