Template.planItemNew.helpers({
  hideActions: function() {
    if (!Session.get("donePressed") && !Session.get("plannedPressed")) {
      return true
    } else {
      if (Session.get("donePressed") === "" && Session.get("plannedPressed") === "") {
        return true
      } else {
        return false
      }

    }
  },
  currentStatus: function() {
    // Lookup the current status of the item and record it.

    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    var qStatus = MyActions.findOne({activeFlag: true, actionId: this._id, organisationId: orgId});

    if (!qStatus) {
      return ""
    } else {
      if (qStatus.completeFlag) {
        return "Complete"
      } else {
        if (qStatus.planFlag) {
          return "Planned"
        } else {
          return "Outstanding"
        }
      }
    }
  },
  currentStatusColour: function() {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    var qStatus = MyActions.findOne({activeFlag: true, actionId: this._id, organisationId: orgId});

    if (!qStatus) {
      return ""
    } else {
      if (qStatus.completeFlag) {
        return "label-success"
      } else {
        if (qStatus.planFlag) {
          return "label-primary"
        } else {
          return "label-danger"
        }
      }
    }

  },
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
    if (Session.get("donePressed") === this._id) {
      return true
    } else {
      return false
    }
  },
  isPlannedChecked: function() {
    if (Session.get("plannedPressed") === this._id) {
      return true
    } else {
      return false
    }
  },
  showNotes: function() {
    if (Session.get("donePressed") === this._id || Session.get("plannedPressed") === this._id) {
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
  'click .btnDoneSave': function(e, t) {
    Session.set("donePressed", "");
    Session.set("plannedPressed", "");

    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    var action = MyActions.findOne({organisationId: orgId, actionId: this._id, activeFlag: true})

    if (action) {
      Meteor.call("saveActionCompleted", action._id);
      sAlert.success('Saved');
    } else {
      sAlert.danger("Problem saving action");
    }
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
