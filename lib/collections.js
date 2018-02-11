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
    logAudit('method-saveActionCompleted', 'START: actionId=' + actionId, 0);

    MyActions.update({_id: actionId}, {$set: {
      completeFlag: true,
      completeDate: new Date(),
      modifiedAt: new Date(),
      modifiedBy: Meteor.userId()
    }});
    logAudit('method-saveActionCompleted', 'END', 0);
  },
  saveActionPlanned: function(actionId, datePlanned) {
    logAudit('method-saveActionPlanned', 'START: actionId=' + actionId + ',datePlanned=' + datePlanned, 0);
    MyActions.update({_id: actionId}, {$set: {
      completeFlag: false,
      planFlag: true,
      planDate: datePlanned,
      modifiedAt: new Date(),
      modifiedBy: Meteor.userId()
    }});
    logAudit('method-saveActionPlanned', 'END', 0);
  },
  addActionNote: function(actionId, noteText) {
    logAudit('method-addActionNote', 'START: actionId=' + actionId + ',noteText=' + datePlanned, 0);

    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true});

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
    logAudit('method-addActionNote', 'END', 0);
  },
  addToMyActions: function(userId, ecoQuestionId) {
    logAudit('method-addToMyActions', 'START: userId=' + userId + ',ecoQuestionId=' + ecoQuestionId, 0);

    var inMyQuestions;
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true});

    inAction = MyQuestions.find({organisationId: orgId, questionId: ecoQuestionId, activeFlag: true}).count();

    logAudit('method-addToMyActions', 'inAction=' + inAction, 0);

    var questionText;

    var q = EcoQuestions.findOne({_id: ecoQuestionId});

    logAudit('method-addToMyActions', 'q=' + q, 0);

    questionText = q.questionText;

    if (inAction === 0) {

      logAudit('method-addToMyActions', 'inAction=' + inAction, 0);

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

      logAudit('method-addToMyActions', 'qList(count)=' + qList.count(), 0);

      itmCount = EcoActions.find({questionId: ecoQuestionId, activeFlag: true}).count();

      for (var qItem = 0; qItem < itmCount; qItem++) {

          logAudit('method-addToMyActions', 'qItem=' + qItem, 0);

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

    logAudit('method-addToMyActions', 'END', 0);
  },
  removeFromMyActions: function(userId, ecoQuestionId) {

    var orgId = MyOrganisation.findOne({userId: userId, activeFlag: true});

    logAudit('method-removeFromMyActions', 'START: userId=' + userId + ',ecoQuestionId=' + ecoQuestionId, 0);
    MyActions.remove({organisationId: orgId, questionId: ecoQuestionId});

    MyQuestions.remove({organisationId: orgId, questionId: ecoQuestionId});
    logAudit('method-removeFromMyActions', 'END', 0);
  },
  updateReferenceItem: function(id, category, code, description, activeFlag) {
    logAudit('method-updateReferenceItem', 'START: id=' + id + ', category=' + category + ', code=' + code + ', description=' + description + ', activeFlag=' + activeFlag, 0);

    ReferenceData.update({_id: id}, {$set: {dataType: category, code: code, description: description, activeFlag, modifiedAt: new Date(), modifiedBy: Meteor.userId()}});

    logAudit('method-updateReferenceItem', 'END', 0);

  },
  addReferenceItem: function(category, code, description, activeFlag) {

    logAudit('method-addReferenceItem', 'START: category=' + category + ',code=' + code + ',description=' + description + ',activeFlag=' + activeFlag, 0);

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

    logAudit('method-addReferenceItem', 'END', 0);
  },
  removeReferenceItem: function(id) {
    logAudit('method-removeReferenceItem', 'START: id=' + id, 0);

    ReferenceData.remove({_id: id});

    logAudit('method-removeReferenceItem', 'END', 0);
  },
  addUser: function(userCode, userName, emailAddress, userGroup, activeFlag) {

    logAudit('method-addUser', 'START: userCode=' + userCode + ',userName=' + userName + ',emailAddress=' + emailAddress + ',userGroup=' + userGroup + ',activeFlag=' + activeFlag, 0);

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

     logAudit('method-addUser', 'END', 0);
  },
  addUserRole: function(userId, userGroup) {
    logAudit('method-addUserRole', 'START: userId=' + userId + ',userGroup=' + userGroup, 0);

    Roles.setUserRoles(userId, userGroup);
    logAudit('method-addUserRole', 'END', 0);
  },
  removeUser: function(userId) {
    logAudit('method-removeUser', 'START: userId=' + userId, 0);

    // Do something

    Roles.setUserRoles(userId, 'NO ACCESS')
    // Meteor.users.remove({_id: userId});

    logAudit('method-removeUser', 'END', 0);
  },
  updateAccount: function(userId, userName, emailAddress, password) {
    logAudit('method-updateAccount', 'START: userId=' + userId + ',userName=' + userName + ',emailAddress=' + emailAddress, 0);

    // update the account with the new password

    Accounts.setPassword(userId, password, false);

    // and updtae their name, and email address.

    Meteor.users.update({userId}, {$set: {profile: {name: userName}, emailAddress: emailAddress}});

    logAudit('method-updateAccount', 'END', 0);
  },
  saveIntent: function(intentType, intentContent) {

    logAudit('method-saveIntent', 'START: intentType=' + intentType + ',intentContent=' + intentContent, 0);

    var orgId = MyOrganisation.findOne({userId: Meteor.userId()});

    // Update the previously active intent to inactive

    MyIntents.update({organisationId: orgId, intentType: intentType, activeFlag: true}, {$set: {activeFlag: false, modifiedAt: new Date()}});

    // Now add a new one.

    MyIntents.insert(
      {
        userId: Meteor.userId(),
        organisationId: orgId,
        intentType: intentType,
        description: intentContent,
        createdAt: new Date(),
        activeFlag: true
      }
    )

    logAudit('method-saveIntent', 'END', 0);
  },
  saveOrganisation: function(userId, orgName, orgDescription, orgSector, orgEmployees, orgLogoPath, orgAddr1, orgAddr2, orgSuburb, orgState, orgPostcode) {

    logAudit('method-saveOrganisation', 'START: userId=' + userId + ',orgName=' + orgName + ',orgDescription=' + orgDescription + ',orgSector=' + orgSector + ',orgEmployees=' + orgEmployees + ',orgLogoPath=' + orgLogoPath + ',orgAddr1=' + orgAddr1 + ',orgAddr2=' + orgAddr2 + ',orgSuburb=' + orgSuburb + ',orgState=' + orgState + ',orgPostcode=' + orgPostcode, 0);

      var orgId = MyOrganisation.findOne({userId: userId, activeFlag: true});

      myOrgCount = Organisation.find({organisationId: orgId, activeFlag: true}).count();

      var rndValue = "";

      if (myOrgCount > 0) {
        // Inactivate the previous record, so that we can come back to this - if there is a problem.
        Organisation.update({_id: orgId._id, activeFlag: true}, {$set: {modifiedAt: new Date(), modifiedBy: Meteor.userId(), activeFlag: false}});

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

    logAudit('method-saveOrganisation', 'END', 0);
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
