Template.categoryUseReduction.helpers({
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

Template.categoryUseReduction.events({
  'click .btnCancelTarget': function(e, t) {
  },
  'click .btnSaveTarget': function(e, t) {

    var targetDate = $(e.target.parentNode.parentNode.parentNode).find("[name=targetDate]").val();
    var targetReduction = $(e.target.parentNode.parentNode.parentNode).find("[name=targetReduction]").val();
    var targetRenewables = $(e.target.parentNode.parentNode.parentNode).find("[name=targetRenewables]").val();

    Meteor.call("addTargetDetails", this._id, targetDate, targetReduction, targetRenewables);

    sAlert.success("Saved");
  }
})
