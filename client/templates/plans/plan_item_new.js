Template.planItemNew.helpers({
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

    return MyActions.find({organisationId: orgId, actionId: this._id, activeFlag: true}).fetch();
  },
  isinMyAction: function() {
    var countAction;

    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    countAction = MyActions.find({organisationId: orgId, actionId: this._id, activeFlag: true}).count();

    if (countAction === 0) {
      return false
    } else {
      return true
    }
  },
  isCompleteChecked: function() {
    if (Session.get("completeItem") === this._id) {
      return true
    } else {
      return false
    }
  },
  isPlannedChecked: function() {
    if (Session.get("plannedItem") === this._id) {
      return true
    } else {
      return false
    }
  },
  showNotes: function() {
    if (Session.get("completeItem") === this._id || Session.get("plannedItem") === this._id) {
      return true
    } else {
      return false
    }
  }
});

Template.planItemNew.events({
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
  'click .btnComplete': function(e, t) {
    Session.set("completeItem", this._id);
    Session.set("plannedItem", "");
//    Meteor.call('completeAction', this._id);
  },
  'click .btnPlan': function(e, t) {
    Session.set("plannedItem", this._id);
    Session.set("completeItem", "");
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
