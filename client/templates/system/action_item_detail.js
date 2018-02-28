
Template.actionItemDetail.helpers({
  isActive: function() {
    return this.activeFlag
  },
  categoryDesc: function() {
    // This is a concatenation of a number of fields to form the category.

    var catRecord = CategoryUse.findOne({_id: this.categoryId});

    return catRecord.rootCategoryCode + ' / ' + catRecord.categoryCode + ' / ' + catRecord.subCategoryCode
  },
  isEditingItem: function() {
    if (this._id === Session.get("editingActionItem")) {
      return true
    } else {
      return false
    }
  },
  categoryCodes: function() {
    return CategoryUse.find({activeFlag: true}, {sort: {rootCategoryCode: 1, categoryCode: 1, subCategoryCode: 1}}).fetch();
  },
  isSelected: function(option) {
    return option === Session.get("editingCategoryCode") ? 'selected' : '';
  }

});

Template.actionItemDetail.events({
  'click .btnActive': function(e, t) {
    // Update Active Flag

    Meteor.call('updateActionActiveFlag', this._id, true);
  },
  'click .btnInactive': function(e, t) {
    Meteor.call('updateActionActiveFlag', this._id, false);
  },
  'click .btnEditItem': function(e, t) {
    Session.set("editingActionItem", this._id);
    Session.set("editingCategoryCode", this.categoryId);
  },
  'click .btnCancelSave': function(e, t) {
    Session.set("editingActionItem", "");
  },
  'click .btnSaveItem': function(e, t) {
    var categoryCode = $(document).find('[name=editCategoryCode]').val();
    var reportId = $(document).find('[name=editReportId]').val();
    var actionText = $(document).find('[name=editActionText]').val();

    Meteor.call('updateActionItem', this._id, categoryCode, reportId, actionText);

    Session.set("editingActionItem", "");
    sAlert.success("saved");
  }
})
