Template.actionItem.onRendered(function() {
    Session.set("currentMenu", "PLAN");
});
Template.actionItem.helpers({
  isActive: function() {
    return MyQuestions.find({activeFlag: true, questionId: this.questionId, userId: Meteor.userId()}).fetch();
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
    return MyActions.find({userId: Meteor.userId(), actionId: this._id}).fetch();
  },
  isinMyAction: function() {
    var countAction;

    countAction = MyActions.find({userId: Meteor.userId(), actionId: this._id}).count();

    if (countAction === 0) {
      return false
    } else {
      return true
    }
  }
});

Template.actionItem.events({
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

    // Save this one as done.

    debugger

    console.log(this._id);
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
