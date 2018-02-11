Template.planListItems.helpers({
  actionCount: function() {
    return EcoActions.find({activeFlag: true, questionId: this._id}).count();
  },
  isExpanded: function() {
    if (Session.get("expanded_" + this._id)) {
      return true
    } else {
      return false
    }
  },
  isButtonYes: function() {
    var yesCount;

    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    yesCount = MyQuestions.find({organisationId: orgId, questionId: this._id, activeFlag: true}).count();

    if (yesCount > 0) {
      return "btn-success"
    } else {
      return "btn-outline-success"
    }
  },
  isButtonNo: function() {
    var yesCount;

    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    yesCount = MyQuestions.find({organisationId: orgId, questionId: this._id, activeFlag: true}).count();

    if (yesCount === 0) {
      return "btn-primary"
    } else {
      return "btn-outline-primary"
    }

  }
});

Template.planListItems.events({
  'click .liItem': function(e, t) {

    if (Session.get("expanded_" + this._id)) {
      Session.set("expanded_" + this._id, false);
    } else {
      Session.set("expanded_" + this._id, true);
    }
  },
  'click .btnYes': function(e, t) {
    Session.set("expanded_" + this._id, false);

    // Now that this relates to the customer, we can add them to the list.
    Meteor.call('addToMyActions', Meteor.userId(), this._id);
  },
  'click .btnNo': function(e, t) {
    Session.set("expanded_" + this._id, true);
    // Now that it doesn't relate, remove them from the list.

    Meteor.call('removeFromMyActions', Meteor.userId(), this._id);
  }
})
