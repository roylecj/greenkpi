Accounts.config({
  forbidClientAccountCreation: false,
});

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

// This is the SMS data

MyMetrics = new Mongo.Collection("myMetrics");
MyMetrics.allow({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

// These are the list of questions for this organisation to complete

MyQuestions = new Mongo.Collection("myQuestions");
MyQuestions.allow({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

// These are notes that are specific for me

MyActionNotes = new Mongo.Collection("myActionNotes");
MyActionNotes.allow({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

// These are settings about me - my preferences

MySettings = new Mongo.Collection("mySettings");
MySettings.allow({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

// This is reference value information

ReferenceData = new Mongo.Collection("referenceData");
ReferenceData.allow({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

// This is my strategy about energy savings

MyIntents = new Mongo.Collection("myIntents");
MyIntents.allow({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

// This is a list of organisations

Organisation = new Mongo.Collection("organisation");
Organisation.allow({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

// This is the organisation that i'm assigned to

MyOrganisation = new Mongo.Collection("myOrganisation");
MyOrganisation.allow({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

// These are the list of vendors who you get a bill from

Vendors = new Mongo.Collection("vendor");
Vendors.allow({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

// This is Audit information

AuditInfo = new Mongo.Collection("auditInfo");

AuditInfo.allow({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

// Now for the methods

Meteor.methods({
  saveActionCompleted: function(actionId) {

    MyActions.update({_id: actionId}, {$set: {
      completeFlag: true,
      planFlag: false,
      completeDate: new Date(),
      modifiedAt: new Date(),
      modifiedBy: Meteor.userId()
    }});

  },
  saveActionPlanned: function(actionId, datePlanned) {

    MyActions.update({_id: actionId}, {$set: {
      completeFlag: false,
      planFlag: true,
      planDate: datePlanned,
      modifiedAt: new Date(),
      modifiedBy: Meteor.userId()
    }});

  },
  addActionNote: function(actionId, noteText) {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    MyActionNotes.insert({
      actionId: actionId,
      organisationId: orgId,
      noteText: noteText,
      noteDate: new Date(),
      createdBy: Meteor.userId(),
      createdAt: new Date(),
      modifiedBy: Meteor.userId(),
      modifiedAt: new Date()
    });

  },
  addToMyActions: function(userId, ecoQuestionId) {
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

      },
  removeFromMyActions: function(userId, ecoQuestionId) {

    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;
    MyActions.remove({organisationId: orgId, questionId: ecoQuestionId});

    MyQuestions.remove({organisationId: orgId, questionId: ecoQuestionId});

  },
  updateReferenceItem: function(id, category, code, description, activeFlag) {

    ReferenceData.update({_id: id}, {$set: {dataType: category, code: code, description: description, activeFlag, modifiedAt: new Date(), modifiedBy: Meteor.userId()}});

  },
  addReferenceItem: function(category, code, description, activeFlag) {


    ReferenceData.insert({
      dataType: category,
      code: code,
      description: description,
      createdAt: new Date(),
      createdBy: Meteor.userId(),
      modifiedAt: new Date(),
      modifiedBy: Meteor.userId(),
      activeFlag: activeFlag
    });

  },
  removeReferenceItem: function(id) {

    ReferenceData.remove({_id: id});


  },
  addUser: function(userCode, userName, emailAddress, userGroup, activeFlag) {

    password = "password";
    Accounts.createUser({
                           username: userCode,
                           email : emailAddress,
                           password : password,
                           roles: [],
                           profile  : {
                               name: userName
                           }
                         });

  },
  addUserRole: function(userId, userGroup) {
    Roles.setUserRoles(userId, userGroup);
  },
  removeUser: function(userId) {

    // Do something

    Roles.setUserRoles(userId, 'NO ACCESS')
    // Meteor.users.remove({_id: userId});

  },
  updateAccount: function(userId, userName, emailAddress, password) {

    // update the account with the new password

    Accounts.setPassword(userId, password, false);

    // and updtae their name, and email address.

    Meteor.users.update({userId}, {$set: {profile: {name: userName}, emailAddress: emailAddress}});

  },
  saveIntent: function(intentType, intentContent) {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    // Update the previously active intent to inactive

    MyIntents.update({organisationId: orgId, intentType: intentType, activeFlag: true}, {$set: {activeFlag: false, modifiedAt: new Date(), modifiedBy: Meteor.userId()}});

    // Now add a new one.

    MyIntents.insert(
      {
        organisationId: orgId,
        intentType: intentType,
        description: intentContent,
        createdAt: new Date(),
        createdBy: Meteor.userId(),
        activeFlag: true
      }
    )

  },
  saveOrganisation: function(userId, orgName, orgDescription, orgSector, orgEmployees, orgLogoPath, orgAddr1, orgAddr2, orgSuburb, orgState, orgPostcode) {

      var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

      myOrgCount = Organisation.find({organisationId: orgId, activeFlag: true}).count();

      var rndValue = "";

      if (myOrgCount > 0) {
        // Inactivate the previous record, so that we can come back to this - if there is a problem.
        Organisation.update({_id: orgId, activeFlag: true}, {$set: {modifiedAt: new Date(), modifiedBy: Meteor.userId(), activeFlag: false}});

        // We don't want to update this if we already have it.

        rndValue = orgId.code;

      } else {
        // Check that it is Random

        var cntFound = 1


        while (cntFound > 0) {
          // 6 string value which is random
            rndValue = Random.hexString(6);

            cntFound = Organisation.find({code: rndValue}).count();
        };
      }

      // So now we have a random value, we can use it

      Organisation.insert({
        code: rndValue,
        organisationName: orgName,
        description: orgDescription,
        sector: orgSector,
        employees: orgEmployees,
        logoPath: orgLogoPath,
        address: {
          line1: orgAddr1,
          line2: orgAddr2,
          suburb: orgSuburb,
          stateCode: orgState,
          postcode: orgPostcode
        },
        createdAt: new Date(),
        modifiedAt: new Date(),
        createdBy: Meteor.userId(),
        modifiedBy: Meteor.userId(),
        activeFlag: true
      });

  },
  logAudit(action, description, auditLevel) {
    AuditInfo.insert({
      userId: Meteor.userId(),
      auditDate: new Date(),
      auditAction: action,
      auditDescription: description,
      createdAt: new Date()
    });
  }
});
