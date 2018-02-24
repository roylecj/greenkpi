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
});

Template.categoryUseItem.events({
  'click .btnAddToUse': function(e, t) {
    Meteor.call("addMyCategoryUse", this._id);
  },
  'click .btnRemoveFromUse': function(e, t) {
    Meteor.call("removeMyCategoryUse", this._id);
  }
});
