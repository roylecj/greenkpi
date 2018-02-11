
Template.myItem.helpers({
  isCompleted: function() {
    if (this.completeFlag === true) {
      return true
    } else {
      return false
    }
  },
  userInfo: function() {
    return Meteor.users.find().fetch()
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

  isActive: function() {

    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    return MyQuestions.find({activeFlag: true, questionId: this.questionId, organisationId: orgId}).fetch();
  },
  currentStatus: function() {
    if (this.completeFlag === true) {
      return "Completed"
    } else {
      if (this.planFlag === true) {
        return "In planning"
      } else {
        return "Outstanding"
      }
    }
  },
  currentStatusState: function() {
    if (this.completeFlag === true) {
      return "label-success"
    } else {
      if (this.planFlag === true) {
        return "label-primary"
      } else {
        return "label-warning"
      }
    }

  },
  notPlan: function() {
    if (Session.get("currentMenu") === "PLAN") {
      return false
    } else {
      return true
    }
  },
  isPlanned: function() {
    if (this.planFlag === true) {
      return true
    } else {
      return false
    }
  },
  questionText: function() {
    var q;

    q = MyQuestions.findOne({_id: this.questionId});

    return q.questionText;
  },
  dateCompleted: function() {
    return moment(this.completeDate).format("DD MMM YYYY")
  },
  datePlanned: function() {
    return moment(this.planDate).format("DD MMM YYYY")
  },
  dateCreated: function() {
    return moment(this.createDate).format("DD MMM YYYY")
  },
  daysAgo: function() {
    return moment(this.createDate).fromNow();
  },
  actionNotes: function() {
    return MyActionNotes.find({actionId: this._id},  {sort: {noteDate: -1}}).fetch();
  },
  hasNotes: function() {
    var noteCount;

    noteCount = MyActionNotes.find({actionId: this._id}).count();

    if (noteCount > 0) {
      return true
    } else {
      return false
    }
  },
  enteringNotes: function() {
    if (Session.get("addNotes") === this._id) {
      return true
    } else {
      return false
    }
  }
});

Template.myItem.events({
  'click .btnAddNotes': function(e, t) {
      Session.set("addNotes", this._id);
  },
  'click .btnNoteSave': function(e, t) {


      // Save the note, and add it to the Collection

// var noteText ="dummy text";

var noteText =  $(e.target.parentNode).find('[name=noteText]').val();

      Meteor.call("addActionNote", this._id, noteText);
      sAlert.success("Note Saved");
      Session.set("addNotes", "");
  },
  'click .btnNoteCancel': function(e, t) {
      Session.set("addNotes", "");
  },
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

    var noteText =  "Completion note: " + $(e.target.parentNode).find('[name=completedNoteText]').val();

    Meteor.call("addActionNote", this._id, noteText);
    Meteor.call("saveActionCompleted", this._id);

    Session.set("donePressed", "");
    Session.set("plannedPressed", "");
    sAlert.success('Saved');
  },
  'click .btnPlanCancel': function(e, t) {
    Session.set("donePressed", "");
    Session.set("plannedPressed", "");

  },
  'click .btnPlanSave': function(e, t) {

    // debugger

    var noteText =  $(e.target.parentNode).find('[name=plannedNoteText]').val();
    var plannedDate = $(e.target.parentNode).find('[name=plannedDate]').val();

    var datePlannedFormat;

    datePlannedFormat = moment(plannedDate).format("DD MMM YYYY");

    noteText = noteText + " - Planned Date set to " + datePlannedFormat;

    Meteor.call("addActionNote", this._id, noteText);
    Meteor.call("saveActionPlanned", this._id, plannedDate);

    Session.set("donePressed", "");
    Session.set("plannedPressed", "");

    sAlert.success('Saved');
  }

});
