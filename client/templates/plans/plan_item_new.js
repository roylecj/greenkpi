Template.planItemNew.onRendered(function() {
  console.log("render -" + this._id);
    if (Session.get("plannedPressed") === this._id) {
      var planDate =  $(e.target.parentNode.parentNode).find('[name=planDate]').val();

      debugger

      var mDate = moment(planDate);

      if (mDate.isValid()) {
        if (mDate.isBefore(moment())) {
          Session.set("dateValid", false)
        } else {
          Session.set("dateValid", true)
        }
      } else {
        Session.set("dateValid", false)
      }
    }
});

Template.planItemNew.helpers({
  noteRecording: function() {
    if (Session.get("noteRecording") === this._id) {
      return true
    } else {
      return false
    }
  },
  isQuestionInMyList: function() {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;
    var cntItems = MyActions.find({activeFlag: true, actionId: this._id, organisationId: orgId}).count();

    if (cntItems > 0) {
      return true
    } else {
      return false
    }
  },
  defaultDoneDate: function() {
    // Default to today
    return moment().format("YYYY-MM-DD");
  },
  defaultDate: function() {

    var numberOfMonths = MySettings.findOne({scope: "GLOBAL", key: "NUMBER_OF_MONTHS", activeFlag: true});
    var numberOfMonthsValue;

    if (! numberOfMonths) {
      numberOfMonthsValue = 1;
    }

    return moment().add(numberOfMonthsValue, "month").format("YYYY-MM-DD");
  },
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
  },
  hasNotes: function() {
    var noteCount;

    var thisAction = MyActions.findOne({actionId: this._id, activeFlag: true});
    noteCount = MyActionNotes.find({actionId: thisAction._id, activeFlag: true}).count();

    if (noteCount > 0) {
      return true
    } else {
      return false
    }
  },
  actionNotes: function() {

    var thisAction = MyActions.findOne({actionId: this._id, activeFlag: true});

    return MyActionNotes.find({actionId: thisAction._id, activeFlag: true},  {sort: {noteDate: -1}}).fetch();
  },
  isDateValid: function() {
    if (Session.get("dateValid") === false) {
      return "has-error"
    } else {
      return ""
    }
  }
});

Template.planItemNew.events({
  'click .btnPlan': function(e, t) {
    Session.set("plannedPressed", this._id);
    Session.set("donePressed", "");
    Session.set("noteRecording", "");

  },
  'click .btnDone': function(e, t) {
    Session.set("donePressed", this._id);
    Session.set("plannedPressed", "");
    Session.set("noteRecording", "");

  },
  'click .btnDoneCancel': function(e, t) {
    Session.set("donePressed", "");
    Session.set("plannedPressed", "");
    Session.set("noteRecording", "");

  },
  'click .btnDoneSave': function(e, t) {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    var action = MyActions.findOne({organisationId: orgId, actionId: this._id, activeFlag: true})

    if (action) {
      var completeDate = $(e.target.parentNode.parentNode.parentNode).find('[name=doneDate]').val();

      var mDate = moment(completeDate);
      var dateValid = true;

      if (mDate.isValid()) {
        if (mDate.isAfter(moment())) {
          dateValid = false
        } else {
          dateValid = true
        }
      } else {
        dateValid = false
      }

      if (dateValid === true) {
        Meteor.call("saveActionCompleted", action._id, completeDate);

        var doneDate = moment(completeDate).format("DD MMM YYYY");
        var noteText = "Completed on " + doneDate;

        Meteor.call('addActionNote', action._id, noteText);

        sAlert.success('Saved');

        Session.set("donePressed", "");
        Session.set("plannedPressed", "");
        Session.set("noteRecording", "");

      } else {
        sAlert.error("Invalid date - date must not be in the future");
      }
    } else {
      sAlert.error("Problem saving action");
    }
  },
  'click .btnPlanCancel': function(e, t) {
    Session.set("donePressed", "");
    Session.set("plannedPressed", "");
  },
  'click .btnPlanSave': function(e, t) {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    var action = MyActions.findOne({organisationId: orgId, actionId: this._id, activeFlag: true})

    var planDate =  $(e.target.parentNode.parentNode.parentNode).find('[name=planDate]').val();

    var mDate = moment(planDate);
    var dateValid = true;

    if (mDate.isValid()) {
      if (mDate.isBefore(moment())) {
        dateValid = false
      } else {
        dateValid = true
      }
    } else {
      dateValid = false
    }

    if (dateValid === true ) {
      Meteor.call("saveActionPlanned", action._id, planDate);

      var planDateFormat = moment(planDate).format("DD MMM YYYY");
      var noteText = "Planned for completion on " + planDateFormat;

      Meteor.call('addActionNote', action._id, noteText);

      sAlert.success('Saved');

      Session.set("donePressed", "");
      Session.set("plannedPressed", "");

    } else {
      sAlert.error("Invalid date - date needs to be in the future");
    }
  },
  'click .btnDoneNote': function(e, t) {

    if (Session.get("noteRecording") === this._id) {
        Session.set("noteRecording", "");
    } else {
      Session.set("noteRecording", this._id);
    }
  },
  'click .btnPlannedNote': function(e, t) {
    if (Session.get("noteRecording") === this._id) {
        Session.set("noteRecording", "");
    } else {
      Session.set("noteRecording", this._id);
    }
  },
  'click .btnNote': function(e, t) {
    if (Session.get("noteRecording") === this._id) {
        Session.set("noteRecording", "");
    } else {
      Session.set("noteRecording", this._id);
    }
  },
  'click .btnSaveNote': function(e, t) {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    var action = MyActions.findOne({organisationId: orgId, actionId: this._id, activeFlag: true})

    var actionId = action._id;
    var noteText =  $(e.target.parentNode.parentNode).find('[name=noteText]').val();

    Meteor.call('addActionNote', actionId, noteText);

    Session.set("noteRecording", "");
  },
  'click .btnCancelSaveNote': function(e, t) {
    Session.set("noteRecording", "");
  },
  'click .lblShowNotes': function(e, t) {
    if (Session.get("noteRecording") === this._id) {
        Session.set("noteRecording", "");
    } else {
      Session.set("noteRecording", this._id);
    }
  }
})
