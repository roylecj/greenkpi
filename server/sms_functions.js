Meteor.methods({
  updateSMSEntry(id, entryType, usageType, location, provider, startDate, endDate, li) {

    if (! Meteor.userId()) {
        throw new Meteor.Error('updateSMSEntry.unauthorised');
    } else {
      var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

      MyMetrics.update({_id: id}, {$set: {
        entryType: entryType,
        usageType: usageType,
        organisationId: orgId,
        location: location,
        provider: provider,
        startDate: startDate,
        endDate: endDate,
        items: li,
        modifiedAt: new Date(),
        modifiedBy: Meteor.userId(),
        activeFlag: true

      } });

    }
  },
  deleteSMSEntry(id) {

    if (! Meteor.userId()) {
      throw new Meteor.Error('deleteSMSEntry.unauthorised');
    } else {
      var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

      MyMetrics.update({_id: id}, {$set: {
        modifiedAt: new Date(),
        modifiedBy: Meteor.userId(),
        activeFlag: false
      }
      });
    }
  },
  saveSMSEntry(entryType, usageType, location, provider, startDate, endDate, li) {

    if (! Meteor.userId()) {
      throw new Meteor.Error('saveSMSEntry.unauthorised');
    } else {
      var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

      MyMetrics.insert({
          entryType: entryType,
          usageType: usageType,
          organisationId: orgId,
          location: location,
          provider: provider,
          startDate: startDate,
          endDate: endDate,
          items: li,
          createdAt: new Date(),
          modifiedAt: new Date(),
          createdBy: Meteor.userId(),
          modifiedBy: Meteor.userId(),
          activeFlag: true
      });
    }
  },

});
