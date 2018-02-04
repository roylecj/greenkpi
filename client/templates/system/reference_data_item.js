Template.referenceItem.helpers({
  editThisItem: function() {
    if (Session.get("editReferenceItem") === this._id) {
      return true
    } else {
      return false
    }
  },
  isActive: function() {
    if (Session.get("isActiveReferenceItem") === true) {
      return true
    } else {
      return false
    }
  }
})
Template.referenceItem.events({
  'click .btnEditItem': function(e, t) {
      Session.set("editReferenceItem", this._id);
      Session.set("isActiveReferenceItem", this.activeFlag);
  },
  'click .btnDeleteItem': function(e, t) {
      // Deleting this item.

      Meteor.call("removeReferenceItem", this._id);
      sAlert.error("Removed");
  },
  'click .btnSaveItem': function(e, t) {
      // Save the Reference item
      var cat =  $(e.target.parentNode.parentNode.parentNode).find('[name=dataType]').val();
      var description = $(e.target.parentNode.parentNode.parentNode).find('[name=description]').val();
      var code = $(e.target.parentNode.parentNode.parentNode).find('[name=code]').val();
      var isActive = Session.get("isActiveReferenceItem")

      Meteor.call('updateReferenceItem', this._id, cat, code, description, isActive);
      Session.set("editReferenceItem", "");
      sAlert.success("Saved");
  },
  'click .btnCancelEditItem': function(e, t) {
      Session.set("editReferenceItem", "");
  },
  'click .btnActive': function(e, t) {
      Session.set("isActiveReferenceItem", false);
  },
  'click .btnInactive': function(e, t) {
      Session.set("isActiveReferenceItem", true);
  }
})
