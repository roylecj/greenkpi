Template.staffItem.helpers({
  isEditingStaff: function() {
    if (Session.get("editingStaffId") === this._id) {
      return true
    } else {
      return false
    }
  }
});
Template.staffItem.events({
  'click .btnEditStaff': function(e, t) {
    e.preventDefault();
    Session.set("editingStaffId", this._id);
  },
  'click .btnDeleteStaff': function(e, t) {
    e.preventDefault();
    Meteor.call("removeStaff", this._id);
  },
  'click .btnCancelSave': function(e, t) {
    e.preventDefault();
    Session.set("editingStaffId", "");
  },
  'click .btnSaveStaff': function(e, t) {
    e.preventDefault();
    var firstName = $(e.target.parentNode.parentNode.parentNode).find('[name=firstName]').val();
    var lastName = $(e.target.parentNode.parentNode.parentNode).find('[name=lastName]').val();
    var emailAddress = $(e.target.parentNode.parentNode.parentNode).find('[name=emailAddress]').val();

    Meteor.call("saveStaff", this._id, firstName, lastName, emailAddress);

    Session.set("editingStaffId", "");
  }
});
