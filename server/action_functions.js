Meteor.methods({
  saveActionCompleted: function(actionId, completeDate, completedBy) {

    if (! Meteor.userId()) {
      throw new Meteor.Error('saveActionCompleted.unauthorised');
    } else {
      if (Roles.userIsInRole(Meteor.userId(), 'READ_ONLY')) {
        sAlert.error("Unable to set action");
      } else {
        MyActions.update({_id: actionId}, {$set: {
          completeFlag: true,
          planFlag: false,
          completeDate: completeDate,
          completedBy: completedBy,
          modifiedAt: new Date(),
          modifiedBy: Meteor.userId()
        }});
      }

      var actionText = MyActions.findOne({_id: actionId}).actionText;
      var eventText = "Completed action - " + actionText;
      var eventDate = completeDate;

      Meteor.call('addToMyEvents', 'COMPLETED_ACTION', actionId, eventText, eventDate, completedBy);
    }

  },
  saveActionPlanned: function(actionId, datePlanned, plannedBy) {

    if (! Meteor.userId()) {
      throw new Meteor.Error('saveActionPlanned.unauthorised');
    } else {
      if (Roles.userIsInRole(Meteor.userId(), 'READ_ONLY')) {
        sAlert.error("Unable to set action");
      } else {
        MyActions.update({_id: actionId}, {$set: {
          completeFlag: false,
          planFlag: true,
          planDate: datePlanned,
          plannedBy: plannedBy,
          modifiedAt: new Date(),
          modifiedBy: Meteor.userId()
        }});
      }

      var actionText = MyActions.findOne({_id: actionId}).actionText;
      var eventText = "Planned action - " + actionText;
      var eventDate = datePlanned;

      // var toUser = MyStaff.findOne({_id: plannedBy}).emailAddress;

      Meteor.call('sendEmailTask', plannedBy, actionId)

      Meteor.call('addToMyEvents', 'PLANNED_ACTION', actionId, eventText, eventDate, plannedBy);
    }
  },
  addActionNote: function(actionId, noteText) {

    if (! Meteor.userId()) {
        throw new Meteor.Error('addActionNote.unauthorised');
    } else {
      var myId;

      if (Roles.userIsInRole(Meteor.userId(), 'READ_ONLY')) {
          sAlert.error("Unable to add note");
      } else {
        var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

        myId = MyActionNotes.insert({
          actionId: actionId,
          organisationId: orgId,
          noteText: noteText,
          noteDate: new Date(),
          createdBy: Meteor.userId(),
          createdAt: new Date(),
          modifiedBy: Meteor.userId(),
          modifiedAt: new Date(),
          activeFlag: true
        });

      }

      var actionText = MyActions.findOne({_id: actionId}).actionText;
      var eventText = "Note added to action " + actionText;
      var eventDate = new Date();

      Meteor.call('addToMyEvents', 'ACTION_NOTE', myId, eventText, eventDate);


    }
  },
  addToMyActions: function(userId, ecoQuestionId) {

    if (! Meteor.userId()) {
        throw new Meteor.Error('addToMyActions.unauthorised');
    } else {
      if (Roles.userIsInRole(Meteor.userId(), "READ_ONLY")) {
          sAlert.error("Unable to add to my actions");
      } else {
        var inMyQuestions;
        var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

        inAction = MyQuestions.find({organisationId: orgId, questionId: ecoQuestionId, activeFlag: true}).count();

          var questionText;

        var q = EcoQuestions.findOne({_id: ecoQuestionId});

        questionText = q.questionText;

        if (inAction === 0) {

          MyQuestions.insert({
            organisationId: orgId,
            questionId: ecoQuestionId,
            questionText: questionText,
            activeFlag: true,
            createdBy: Meteor.userId(),
            createdAt: new Date(),
            modifiedBy: Meteor.userId(),
            modifiedAt: new Date()
          });

          var qList;
          var itmCount;

          qList = EcoActions.find({questionId: ecoQuestionId, activeFlag: true}).fetch();

          itmCount = EcoActions.find({questionId: ecoQuestionId, activeFlag: true}).count();

          for (var qItem = 0; qItem < itmCount; qItem++) {

              MyActions.insert({
                organisationId: orgId,
                questionId: ecoQuestionId,
                actionId: qList[qItem]._id,
                actionText: qList[qItem].actionText,
                completeFlag: false,
                planFlag: false,
                createdAt: new Date(),
                createdBy: Meteor.userId(),
                modifiedAt: new Date(),
                modifiedBy: Meteor.userId(),
                activeFlag: true
              });
          }
        }
      }
    }
  },
  removeFromMyActions: function(userId, ecoQuestionId) {

    if (! Meteor.userId()) {
      throw new Meteor.Error('removeFromMyActions.unauthorised');
    } else {
      if (Roles.userIsInRole(Meteor.userId(), "READ_ONLY")) {
          sAlert.error("Unable to remove from my actions");
      } else {
        var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;
        MyActions.update({organisationId: orgId, questionId: ecoQuestionId, activeFlag: true}, {$set: {activeFlag: false, modifiedAt: new Date(), modifiedBy: Meteor.userId()}}, {multi: true});
        MyQuestions.update({organisationId: orgId, questionId: ecoQuestionId, activeFlag: true}, {$set: {activeFlag: false, modifiedAt: new Date(), modifiedBy: Meteor.userId()}});
      }
    }
  },
  addCoreActions: function() {

    if (! Meteor.userId()) {
      throw new Meteor.Error('addCoreActions.unauthorised');
    } else {
      var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

      //

      if (MyCategoryUse.find({"categoryDetails.coreCategory": true, organisationId: orgId, activeFlag: true }).count() === 0) {
        var coreCatList = CategoryUse.find({coreCategory: true, activeFlag: true}).fetch();
        var itmCount = CategoryUse.find({coreCategory: true, activeFlag: true}).count();

        for (var coreCatItem = 0; coreCatItem < itmCount; coreCatItem++) {
          if (MyCategoryUse.find({categoryId : coreCatList[coreCatItem]._id, organisationId: orgId, activeFlag: true}).count() === 0) {
            // Insert it as it is missing

              MyCategoryUse.insert({
                categoryId: coreCatList[coreCatItem]._id,
                categoryDetails: coreCatList[coreCatItem],
                organisationId: orgId,
                createdAt: new Date(),
                createdBy: Meteor.userId(),
                modifiedAt: new Date(),
                modifiedBy: Meteor.userId(),
                activeFlag: true
              });

              Meteor.call('addMyCategoryUse', coreCatList[coreCatItem]._id);
          }
        }
      }
    }

  },

});
