Accounts.config({
  forbidClientAccountCreation: false,
});

// These are the actions that I need to take.

/*
var imageStore = new FS.Store.GridFS("images");

Images = new FS.Collection("images", {
 stores: [imageStore]
});

Images.allow({
  insert: function(userId, data){ return true; },
    update: function(userId, data){ return true;},
    remove: function(userId, data){ return true;},
    download: function(userId, data){ return true;}
});
*/

Images = new FilesCollection({
  collectionName: 'Images',
  allowClientCode: false, // Disallow remove files from Client
  storagePath: '/home/chris/imageStore',
  downloadRoute: '/cdn/server',
  public: true,
  onBeforeUpload(file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
      return true;
    } else {
      return 'Please upload image, with size equal or less than 10MB';
    }
  }
});

MyActions = new Mongo.Collection("myActions");

MyActions.deny({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

MyLocations = new Mongo.Collection("myLocations");

MyLocations.deny({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

// This contains the list of all of the questions

EcoQuestions = new Mongo.Collection("ecoQuestions");
EcoQuestions.deny({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

// This is the list of all of the actions based upon a given question, or area

EcoActions = new Mongo.Collection("ecoActions");
EcoActions.deny({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

// Feedback data

Feedback = new Mongo.Collection("feedback");
Feedback.deny({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

// This is the SMS data

MyMetrics = new Mongo.Collection("myMetrics");
MyMetrics.deny({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

CategoryUse = new Mongo.Collection("categoryUse");

CategoryUse.deny({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

// These are the list of questions for this organisation to complete

MyQuestions = new Mongo.Collection("myQuestions");
MyQuestions.deny({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

// These are notes that are specific for me

MyActionNotes = new Mongo.Collection("myActionNotes");
MyActionNotes.deny({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

// These are settings about me - my preferences

MySettings = new Mongo.Collection("mySettings");
MySettings.deny({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

// This is reference value information

ReferenceData = new Mongo.Collection("referenceData");
ReferenceData.deny({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

// This is my strategy about energy savings

MyIntents = new Mongo.Collection("myIntents");
MyIntents.deny({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

MyEvents = new Mongo.Collection("myEvents");
MyEvents.deny({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});


// This is a list of organisations

Organisation = new Mongo.Collection("organisation");
Organisation.deny({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

// This is the organisation that i'm assigned to

MyOrganisation = new Mongo.Collection("myOrganisation");
MyOrganisation.deny({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

// These are the list of vendors who you get a bill from

Vendors = new Mongo.Collection("vendor");
Vendors.deny({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

// This is Audit information

AuditInfo = new Mongo.Collection("auditInfo");

AuditInfo.deny({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

UserAudit = new Mongo.Collection("userAudit");

UserAudit.deny({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

MyCategoryUse = new Mongo.Collection("myCategoryUse");

MyCategoryUse.deny({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

MyTargets = new Mongo.Collection("myTargets");

MyTargets.deny({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

// Now for the methods

Meteor.methods({
  saveActionCompleted: function(actionId, completeDate) {

    if (Roles.userIsInRole(Meteor.userId(), 'READ_ONLY')) {
      sAlert.error("Unable to set action");
    } else {
      MyActions.update({_id: actionId}, {$set: {
        completeFlag: true,
        planFlag: false,
        completeDate: completeDate,
        modifiedAt: new Date(),
        modifiedBy: Meteor.userId()
      }});
    }

    var actionText = MyActions.findOne({_id: actionId}).actionText;
    var eventText = "Completed action - " + actionText;
    var eventDate = completeDate;

    Meteor.call('addToMyEvents', 'COMPLETED_ACTION', actionId, eventText, eventDate);

  },
  addToMyEvents(eventType, eventId, eventText, eventDate) {

    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    MyEvents.insert({
      organisationId: orgId,
      eventText: eventText,
      eventDate: eventDate,
      eventId: eventId,
      createdAt: new Date(),
      modifiedAt: new Date(),
      createdBy: Meteor.userId(),
      modifiedBy: Meteor.userId(),
      activeFlag: true
    })
  },
  saveActionPlanned: function(actionId, datePlanned) {

    if (Roles.userIsInRole(Meteor.userId(), 'READ_ONLY')) {
      sAlert.error("Unable to set action");
    } else {
      MyActions.update({_id: actionId}, {$set: {
        completeFlag: false,
        planFlag: true,
        planDate: datePlanned,
        modifiedAt: new Date(),
        modifiedBy: Meteor.userId()
      }});
    }

    var actionText = MyActions.findOne({_id: actionId}).actionText;
    var eventText = "Planned action - " + actionText;
    var eventDate = datePlanned;

    Meteor.call('addToMyEvents', 'PLANNED_ACTION', actionId, eventText, eventDate);

  },
  addActionNote: function(actionId, noteText) {

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

  },
  addToMyActions: function(userId, ecoQuestionId) {

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
      },
  removeFromMyActions: function(userId, ecoQuestionId) {

    if (Roles.userIsInRole(Meteor.userId(), "READ_ONLY")) {
        sAlert.error("Unable to remove from my actions");
    } else {
      var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;
      MyActions.update({organisationId: orgId, questionId: ecoQuestionId, activeFlag: true}, {$set: {activeFlag: false, modifiedAt: new Date(), modifiedBy: Meteor.userId()}}, {multi: true});
      MyQuestions.update({organisationId: orgId, questionId: ecoQuestionId, activeFlag: true}, {$set: {activeFlag: false, modifiedAt: new Date(), modifiedBy: Meteor.userId()}});
    }
  },
  addCoreActions: function() {
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

  },
  addMyCategoryUse: function(categoryId) {
    // Check to see if the myCategory is added already
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    var cnt = MyCategoryUse.find({categoryId: categoryId, activeFlag: true, organisationId: orgId}).count();

    var catInfo = CategoryUse.findOne({_id: categoryId});

    if (cnt === 0) {
      // Only add it if there isn't one...

      MyCategoryUse.insert({
        categoryId: categoryId,
        categoryDetails: catInfo,
        organisationId: orgId,
        createdAt: new Date(),
        createdBy: Meteor.userId(),
        modifiedAt: new Date(),
        modifiedBy: Meteor.userId(),
        activeFlag: true
      });
    };

    // Now we can assign Actions for these categories...

    var qList;
    var itmCount;

    qList = EcoActions.find({categoryId: categoryId, activeFlag: true}).fetch();

    itmCount = EcoActions.find({categoryId: categoryId, activeFlag: true}).count();

    for (var qItem = 0; qItem < itmCount; qItem++) {

        MyActions.insert({
          organisationId: orgId,
          categoryId: categoryId,
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
  },
  removeMyCategoryUse: function(categoryId) {

    // TODO - CHECK THAT ONLY VALID USERS CAN REMOVE A CATEGORY

    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    var cnt = MyCategoryUse.find({categoryId: categoryId, activeFlag: true, organisationId: orgId}).count();

    if (cnt > 0) {
      MyCategoryUse.update({organisationId: orgId, activeFlag: true, categoryId: categoryId}, {$set: {activeFlag: false, modifiedAt: new Date(), modifiedBy: Meteor.userId()}});

      MyActions.update({organisationId: orgId, categoryId: categoryId, activeFlag: true}, {$set: {activeFlag: false, modifiedAt: new Date(), modifiedBy: Meteor.userId()}}, {multi: true});
    }
  },
  updateReferenceItem: function(id, category, code, description, activeFlag) {

    if (Roles.userIsInRole(Meteor.userId(), "ADMIN")) {
      ReferenceData.update({_id: id}, {$set: {dataType: category, code: code, description: description, activeFlag, modifiedAt: new Date(), modifiedBy: Meteor.userId()}});
    } else {
      sAlert.error("Only administrators can update reference data");
    }

  },
  addReferenceItem: function(category, code, description, activeFlag) {

    if (Roles.userIsInRole(Meteor.userId(), "ADMIN")) {
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
    } else {
      sAlert.error("Only administrators can created reference data");
    }

  },
  removeReferenceItem: function(id) {

    if (Roles.userIsInRole(Meteor.userId(), "ADMIN")) {
      ReferenceData.remove({_id: id});
    } else {
      sAlert.error("Only administrators can delete reference data");
    }

  },
  addUser: function(userCode, userName, emailAddress, userGroup, activeFlag) {

    if (Roles.userIsInRole(Meteor.userId(), "ADMIN")) {
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

    } else {
        sAlert.error("Only administrators can create users");
    }
  },
  addUserRole: function(userId, userGroup) {

    if (userGroup === "DISABLED") {
      Roles.setUserRoles(userId, userGroup);
    } else {
      if (Roles.userIsInRole(Meteor.userId(), "ADMIN")) {
        Roles.setUserRoles(userId, userGroup);
      } else {
        sAlert.error("Only administrators can assign roles");
      }
    }
  },
  removeUser: function(userId) {

    // Do something

    if (Roles.userIsInRole(Meteor.userId(), "ADMIN")) {
      Roles.setUserRoles(userId, 'NO ACCESS')
      // Meteor.users.remove({_id: userId});
    } else {
      sAlert.error("Only administrators can remove access");
    }

  },

  saveIntent: function(intentType, intentContent) {

    if (Roles.userIsInRole(Meteor.userId(), "READ_ONLY")) {
      sAlert.error("Unable to save reduction plan");
    } else {
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
    }

  },
  saveOrganisation: function(userId, orgName, orgDescription, orgSector, orgEmployees, orgLogoPath, orgAddr1, orgAddr2, orgSuburb, orgState, orgPostcode) {

    if (Roles.userIsInRole(Meteor.userId(), "READ_ONLY")) {
        sAlert.error("Unable to save organisation details");
    } else {

      // Check to see if this user has an organisation assigned, if not,

      var cnt = MyOrganisation.find({userId: Meteor.userId(), activeFlag: true}).count();

      if (cnt > 0) {
        // We just create a MyOrg entry later...
        var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

        Organisation.update({
          _id: orgId
        }, {$set: {
          organisationName: orgName,
          description: orgDescription,
          sector: orgSector,
          employees: orgEmployees,
          address: {
            line1: orgAddr1,
            line2: orgAddr2,
            suburb: orgSuburb,
            stateCode: orgState,
            postcode: orgPostcode
          },
          modifiedAt: new Date(),
          modifiedBy: Meteor.userId()
        }})
      } else {
        // So now we have a random value, we can use it

        var orgId = Organisation.insert({
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

        MyOrganisation.insert({
          organisationId: orgId,
          userId: Meteor.userId(),
          createdAt: new Date(),
          modifiedAt: new Date(),
          createdBy: Meteor.userId(),
          modifiedBy: Meteor.userId(),
          activeFlag: true
        })
      }


    }
  },
  saveOrganisationLogo(logoPath) {

    debugger

    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    Organisation.update(
      {_id: orgId},
      {$set: {logoPath: logoPath, modifiedAt: new Date(), modifiedBy: Meteor.userId()}});

  },
  logAudit(action, description, auditLevel) {
    AuditInfo.insert({
      userId: Meteor.userId(),
      auditDate: new Date(),
      auditAction: action,
      auditDescription: description,
      createdAt: new Date()
    });
  },
  saveSMSEntry(entryType, location, provider, startDate, endDate, li) {

    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    MyMetrics.insert({
        entryType: entryType,
        organisationId: orgId,
        location: location,
        provider: provider,
        startDate: startDate,
        endDate: endDate,
        items: li,
        createdAt: new Date(),
        modifiedAt: new Date(),
        createdBy: Meteor.userId(),
        modifiedBy: Meteor.userId(),
        activeFlag: true
    });
  },
  updateSMSEntry(id, entryType, location, provider, startDate, endDate, li) {

    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    MyMetrics.update({_id: id}, {$set: {
      entryType: entryType,
      organisationId: orgId,
      location: location,
      provider: provider,
      startDate: startDate,
      endDate: endDate,
      items: li,
      modifiedAt: new Date(),
      modifiedBy: Meteor.userId(),
      activeFlag: true

    } });
  },
  deleteSMSEntry(id) {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    MyMetrics.update({_id: id}, {$set: {
      modifiedAt: new Date(),
      modifiedBy: Meteor.userId(),
      activeFlag: false
    }
    });
  },
  saveFeedback(feedbackEmail, feedbackText) {
    //
    console.log("Feedback added");

    var nextId = 1;

    if (Feedback.find().count() === 0) {
      nextId = 1
    } else {
      currentId = Feedback.findOne({},{sort:{feedbackId:-1}}).feedbackId || 0;
      nextId = currentId + 1;      
    }

    Feedback.insert({
      feedbackId: nextId,
      feedbackText: feedbackText,
      feedbackEmail: feedbackEmail,
      createdAt: new Date(),
      createdBy: Meteor.userId(),
      activeFlag: true
    })
  },
  incorrectPassword(userCode) {
    var userEntry = UserAudit.findOne({userId: userCode});

    if (! userEntry) {

      var cnt = Meteor.users.find({username: userCode}).count();

      if (cnt > 0) {
        // Only log it if the user exists - if we are getting spammed then we just want to record it as a spam entry
        UserAudit.insert({userId: userCode, incorrectLogin: 1, lastLogin: new Date()});
      } else {

        spamEntry = UserAudit.findOne({userId: "SPAM"});

        if (! spamEntry) {
          UserAudit.insert({userId: "SPAM", incorrectLogin: 1, lastLogin: new Date()});
        } else {
          UserAudit.update({userId: "SPAM"}, {$set: {incorrectLogin: spamEntry.incorrectLogin + 1, lastLogin: new Date()}})
        }
      }
    } else {

      newCount = userEntry.incorrectLogin + 1;
      UserAudit.update({userId: userCode}, {$set: {incorrectLogin: newCount, lastLogin: new Date()}});

      var maxInvalidLoginsColl = MySettings.findOne({scope: "GLOBAL", key: "PASSWORD_LOCKOUT", activeFlag: true});

      var maxInvalidLogins;

      if (!maxInvalidLoginsColl) {
        maxInvalidLogins = 5;
      } else {
        maxInvalidLogins =maxInvalidLoginsColl.value;
      }

      if (newCount > maxInvalidLogins) {
          var userId = Meteor.users.findOne({username: userCode});

          if (userId) {
            Meteor.call('addUserRole', userId, "DISABLED");
          }
      }
    }
  },
  saveSetting(scope, key, value) {

    var settingValue = MySettings.findOne({scope: scope, key: key, activeFlag: true});

    if (settingValue ) {
      MySettings.update({scope: scope, key: key, activeFlag: true}, {$set: {activeFlag: false, modifiedBy: Meteor.userId(), modifiedAt: new Date()}});
    }

    MySettings.insert({scope: scope, key: key, value: value, activeFlag: true, createdAt: new Date(), createdBy: Meteor.userId(), modifiedAt: new Date(), modifiedBy: Meteor.userId()});

  },
  addTargetDetails (categoryId, targetDate, targetReduction, targetRenewables) {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    var cnt = MyTargets.find({organisationId: orgId, activeFlag: true, categoryId: categoryId}).count();

    if (cnt > 0) {
      MyTargets.update({organisationId: orgId, activeFlag: true, categoryId: categoryId}, {$set: {activeFlag: false, modifiedBy: Meteor.userId(), modifiedAt: new Date()}});
    }

    MyTargets.insert({
      organisationId: orgId,
      categoryId: categoryId,
      targetDate: targetDate,
      targetReduction: targetReduction,
      targetRenewables: targetRenewables,
      createdAt: new Date(),
      modifiedAt: new Date(),
      createdBy: Meteor.userId(),
      modifiedBy: Meteor.userId(),
      activeFlag: true
    });
  },

});
