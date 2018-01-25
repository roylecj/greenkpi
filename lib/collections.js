
// These are the actions that I need to take.

MyActions = new Mongo.Collection("myActions");

MyActions.allow({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

// This contains the list of all of the questions

EcoQuestions = new Mongo.Collection("ecoQuestions");
EcoQuestions.allow({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

// This is the list of all of the actions based upon a given question, or area

EcoActions = new Mongo.Collection("ecoActions");
EcoActions.allow({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

MyMetrics = new Mongo.Collection("myMetrics");
MyMetrics.allow({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

MyQuestions = new Mongo.Collection("myQuestions");
MyQuestions.allow({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

MyActionNotes = new Mongo.Collection("myActionNotes");
MyActionNotes.allow({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

MySettings = new Mongo.Collection("mySettings");
MySettings.allow({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

Meteor.methods({
  saveActionCompleted: function(actionId) {
    MyActions.update({_id: actionId}, {$set: {
      completeFlag: true,
      completeDate: new Date()
    }});
  },
  saveActionPlanned: function(actionId, datePlanned) {
    MyActions.update({_id: actionId}, {$set: {
      completeFlag: false,
      planFlag: true,
      planDate: datePlanned
    }});
  },
  addActionNote: function(actionId, noteText) {
    MyActionNotes.insert({
      actionId: actionId,
      noteText: noteText,
      noteDate: new Date(),
      createdBy: Meteor.userId()
    });
  },
  addToMyActions: function(userId, ecoQuestionId) {

    var inMyQuestions;

    inAction = MyQuestions.find({userId: userId, questionId: ecoQuestionId, activeFlag: true}).count();

    var questionText;

    var q = EcoQuestions.findOne({_id: ecoQuestionId});

    questionText = q.questionText;

    if (inAction === 0) {

      MyQuestions.insert({
        userId: userId,
        questionId: ecoQuestionId,
        questionText: questionText,
        activeFlag: true
      });

      var qList;
      var itmCount;

      qList = EcoActions.find({questionId: ecoQuestionId, activeFlag: true}).fetch();

      itmCount = EcoActions.find({questionId: ecoQuestionId, activeFlag: true}).count();

      for (var qItem = 0; qItem < itmCount; qItem++) {
          MyActions.insert({
            userId: userId,
            questionId: ecoQuestionId,
            actionId: qList[qItem]._id,
            actionText: qList[qItem].actionText,
            completeFlag: false,
            planFlag: false,
            createDate: new Date()
          });
      }
    }
  },
  removeFromMyActions: function(userId, ecoQuestionId) {
    MyActions.remove({userId: userId, questionId: ecoQuestionId});

    MyQuestions.remove({userId: userId, questionId: ecoQuestionId});
  }
});
