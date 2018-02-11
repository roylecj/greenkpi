Template.planItems.helpers({
  actionItemsInList: function() {
    return EcoActions.find({activeFlag: true, questionId: this._id}).fetch();
  }
});
