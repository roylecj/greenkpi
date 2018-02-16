Template.planItems.helpers({
  actionItemsInList: function() {

    // Check if core actions are there yet, if not add them

    Meteor.call('addCoreActions');
    
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    return MyActions.find({organisationId: orgId, activeFlag: true, categoryId: this.categoryId}).fetch();

  }
});
