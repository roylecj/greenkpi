Template.actionSetupList.onCreated(function() {
    Session.setDefault("newActionItem", false);
});

Template.actionSetupList.helpers({
  actionItems: function() {
    return EcoActions.find().fetch();
  },
  newActionItem: function() {
    return Session.get("newActionItem")
  },
  newActive: function() {
    return Session.get("newActiveAction")
  },
  categoryCodes: function() {
    return CategoryUse.find({activeFlag: true}, {sort: {rootCategoryCode: 1, categoryCode: 1, subCategoryCode: 1}}).fetch();
  },

});

Template.actionSetupList.events({
  'click .btnAddNew': function(e, t) {
    Session.set("newActionItem", true);
    Session.set("newActiveAction", true);
  },
  'click .btnCancelAddNew': function(e, t) {
    Session.set("newActionItem", false);
  },
  'click .btnSaveAddNew': function(e, t) {
    // Save this new question.

    // We need to check all of the fields that they contain data.

    var categoryCode =  $(document).find('[name=categoryCode]').val();
    var reportId =  $(document).find('[name=reportId]').val();
    var actionText =  $(document).find('[name=actionText]').val();

    var isActive = Session.get("newActiveAction");

    $(document).find('[name=categoryCode]').val("");
    $(document).find('[name=reportId]').val("");
    $(document).find('[name=actionText]').val("");

    Session.set("newActionItem", false);

    Meteor.call('saveNewAction', categoryCode, reportId, actionText, isActive );

    sAlert.success('Saved');
  }
})
