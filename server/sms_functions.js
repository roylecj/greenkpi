Meteor.methods({
  saveLocation(locationName) {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;
    cntLocation = MyLocations.find({organisationId: orgId, description: locationName, activeFlag: true}).count();

    if (cntLocation === 0) {
      var myId = MyLocations.insert({organisationId: orgId, description: locationName, activeFlag: true, createdAt: new Date(), createdBy: Meteor.userId()});
      return myId
    } else {
      throw new Meteor.Error('location already exists');
      return -1
    }
  },
  saveProvider(providerName) {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;
    cntVendor = ReferenceData.find({dataType: "VENDOR", description: providerName, activeFlag: true}).count();

console.log("cnt=" + cntVendor);

    if (cntVendor === 0) {

      // Check if there is a local one next

      cntVendor = ReferenceData.find({dataType: "VENDOR", description: providerName, organisationId: orgId, activeFlag: true}).count();

      console.log("cnt=" + cntVendor);

      if (cntVendor === 0) {

        console.log("INSERTING VENDOR");

        var myId = ReferenceData.insert({dataType: "VENDOR", code: providerName, organisationId: orgId, description: providerName, activeFlag: true, createdAt: new Date(), createdBy: Meteor.userId()});
        return myId
      } else {
        throw new Meteor.Error("local provider already exists");
      }
    } else {
      throw new Meteor.Error('provider already exists');
      return -1
    }
  },
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

// See if the location exists

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
