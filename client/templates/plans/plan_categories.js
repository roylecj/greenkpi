Template.planCategories.helpers({
  catCode: function() {
    return this.categoryDetails.categoryCode;
  },
  subCatCode: function() {
    return this.categoryDetails.subCategoryCode;
  },
  actionCount: function() {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    return MyActions.find({organisationId: orgId, activeFlag: true, categoryId: this.categoryId}).count();
  }
})
