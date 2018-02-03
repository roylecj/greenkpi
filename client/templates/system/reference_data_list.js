Template.referenceDataList.helpers({
  referenceDataItems: function() {
    return ReferenceData.find().fetch();
  },
  newReferenceItem: function() {
    return Session.get("addReferenceData");
  },
  newActive: function() {
    return Session.get("newActive");
  }
});

Template.referenceDataList.events({
  'click .btnAddNew': function(e, t) {
    e.preventDefault();
    Session.set("addReferenceData", true);
    Session.set("newActive", true);
  },
  'click .btnSaveAddNew': function(e, t) {
    e.preventDefault();
    Session.set("addReferenceData", false);

    sAlert.success("Saved");
  },
  'click .btnCancelAddNew': function(e, t) {
    e.preventDefault();
    Session.set("addReferenceData", false);
  },
  'click .btnActive': function(e, t) {
    e.preventDefault();
    Session.set("newActive", true);
  },
  'click .btnInactive': function(e, t) {
    e.preventDefault();
    Session.set("newActive", false);
  }
})
