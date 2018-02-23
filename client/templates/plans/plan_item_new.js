Template.planItemNew.onRendered(function() {
    if (Session.get("plannedPressed") === this._id) {
      var planDate =  $(e.target.parentNode.parentNode).find('[name=planDate]').val();

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
  staffList: function() {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    return MyStaff.find({organisationId: orgId, activeFlag: true}).fetch();
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

    if (this.completeFlag) {
      return "Complete"
    } else {
      if (this.planFlag) {
        return "Planned"
      } else {
        return "Outstanding"
      }
    }
  },
  currentStatusColour: function() {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    if (this.completeFlag) {
      return "label-success"
    } else {
      if (this.planFlag) {
        return "label-primary"
      } else {
        return "label-danger"
      }
    }

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

    noteCount = MyActionNotes.find({actionId: this._id, activeFlag: true}).count();

    if (noteCount > 0) {
      return true
    } else {
      return false
    }
  },
  hasNote: function() {
    var noteCount;

    noteCount = MyActionNotes.find({actionId: this._id, activeFlag: true}).count();

    if (noteCount > 0) {
      return "btn-warning"
    } else {
      return "btn-default"
    }
  },
  actionNotes: function() {
    return MyActionNotes.find({actionId: this._id, activeFlag: true},  {sort: {noteDate: -1}}).fetch();
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

    var completeDate = $(e.target.parentNode.parentNode.parentNode).find('[name=doneDate]').val();
    var completedBy = $(e.target.parentNode.parentNode.parentNode).find('[name=doneByUser]').val();

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
      Meteor.call("saveActionCompleted", this._id, completeDate, completedBy);

      var completedByRec = MyStaff.findOne({_id: completedBy})
      var doneDate = moment(completeDate).format("DD MMM YYYY");
      var noteText = "Completed By " + completedByRec.firstName + ' ' + completedByRec.lastName + " on " + doneDate;

      Meteor.call('addActionNote', this._id, noteText);

      sAlert.success('Saved');

      Session.set("donePressed", "");
      Session.set("plannedPressed", "");
      Session.set("noteRecording", "");

    } else {
      sAlert.error("Invalid date - date must not be in the future");
    }
  },
  'click .btnPlanCancel': function(e, t) {
    Session.set("donePressed", "");
    Session.set("plannedPressed", "");
  },
  'click .btnPlanSave': function(e, t) {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    var planDate =  $(e.target.parentNode.parentNode.parentNode).find('[name=planDate]').val();
    var plannedBy =  $(e.target.parentNode.parentNode.parentNode).find('[name=plannedByUser]').val();


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
      Meteor.call("saveActionPlanned", this._id, planDate, plannedBy);

      var planDateFormat = moment(planDate).format("DD MMM YYYY");
//      var noteText = "Planned for completion on " + planDateFormat;

      var plannedByRec = MyStaff.findOne({_id: plannedBy})
      var noteText = "Planned for completion By " + plannedByRec.firstName + ' ' + plannedByRec.lastName + " on " + planDateFormat;

      Meteor.call('addActionNote', this._id, noteText);

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

    var noteText =  $(e.target.parentNode.parentNode).find('[name=noteText]').val();

    Meteor.call('addActionNote', this._id, noteText);

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
