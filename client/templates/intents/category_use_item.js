Template.categoryUseItem.helpers({
    isInUse: function() {
      // See if this action is in the myCategoryUse List

      var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

      var cnt = MyCategoryUse.find({organisationId: orgId, activeFlag: true, categoryId: this._id}).count();

      if (cnt > 0) {
        return true
      } else {
        return false
      }
    },
    targetDate: function() {
      var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

      var myTargetInfo = MyTargets.findOne({categoryId: this._id, activeFlag: true, organisationId: orgId});

      return myTargetInfo.targetDate;
    },
    targetReduction: function() {
      var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

      var myTargetInfo = MyTargets.findOne({categoryId: this._id, activeFlag: true, organisationId: orgId});

      return myTargetInfo.targetReduction;
    },
    targetRenewables: function() {
      var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

      var myTargetInfo = MyTargets.findOne({categoryId: this._id, activeFlag: true, organisationId: orgId});

      return myTargetInfo.targetRenewables;
    }
});

Template.categoryUseItem.events({
  'click .btnCancelTarget': function(e, t) {
  },
  'click .btnSaveTarget': function(e, t) {

    var targetDate = $(e.target.parentNode.parentNode.parentNode).find("[name=targetDate]").val();
    var targetReduction = $(e.target.parentNode.parentNode.parentNode).find("[name=targetReduction]").val();
    var targetRenewables = $(e.target.parentNode.parentNode.parentNode).find("[name=targetRenewables]").val();

    Meteor.call("addTargetDetails", this._id, targetDate, targetReduction, targetRenewables);

    sAlert.success("Saved");
  },
  'click .btnAddToUse': function(e, t) {
    Meteor.call("addMyCategoryUse", this._id);
  },
  'click .btnRemoveFromUse': function(e, t) {
    Meteor.call("removeMyCategoryUse", this._id);
  }
});
