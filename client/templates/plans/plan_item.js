Template.planItem.helpers({
  isActive: function() {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    return MyQuestions.find({activeFlag: true, questionId: this.questionId, organisationId: orgId}).fetch();
  },
  plannedPressed: function(){
    if (Session.get("plannedPressed") === this._id) {
        return true
    } else {
      return false
    }
  },
  donePressed: function() {
    if (Session.get("donePressed") === this._id) {
        return true
    } else {
      return false
    }
  },
  actionItemList: function() {
    // debugger
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    return MyActions.find({organisationId: orgId, actionId: this._id}).fetch();
  },
  isinMyAction: function() {
    var countAction;

    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    countAction = MyActions.find({organisationId: orgId, actionId: this._id}).count();

    if (countAction === 0) {
      return false
    } else {
      return true
    }
  }
});

Template.planItem.events({
  'click .btnPlan': function(e, t) {
    Session.set("plannedPressed", this._id);
    Session.set("donePressed", "");
  },
  'click .btnDone': function(e, t) {
    Session.set("donePressed", this._id);
    Session.set("plannedPressed", "");
  },
  'click .btnDoneCancel': function(e, t) {
    Session.set("donePressed", "");
    Session.set("plannedPressed", "");
  },
  'click .btnDoneSave': function(e, t) {

    // Meteor.call("saveActionCompleted", this._id);

    Session.set("donePressed", "");
    Session.set("plannedPressed", "");
    sAlert.success('Saved');
  },
  'click .btnPlanCancel': function(e, t) {
    Session.set("donePressed", "");
    Session.set("plannedPressed", "");

  },
  'click .btnPlanSave': function(e, t) {
    Session.set("donePressed", "");
    Session.set("plannedPressed", "");

    sAlert.success('Saved');
  }
})
