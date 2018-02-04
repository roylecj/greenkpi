Template.referenceDataList.helpers({
  referenceDataItems: function() {
    return ReferenceData.find({}, {sort: {dataType: 1, code: 1}}).fetch();
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

    var cat =  $(e.target.parentNode.parentNode.parentNode).find('[name=dataType]').val();
    var description = $(e.target.parentNode.parentNode.parentNode).find('[name=description]').val();
    var code = $(e.target.parentNode.parentNode.parentNode).find('[name=code]').val();
    var isActive = Session.get("newActive")

    Meteor.call("addReferenceItem", cat, code, description, isActive);
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
