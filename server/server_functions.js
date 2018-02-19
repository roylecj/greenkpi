process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

Meteor.methods({
  sendEmail(to, from, subject, text) {
    // Make sure that all arguments are strings.
//    check([to, from, subject, text], [String]);

    // Let other method calls from the same client start running, without
    // waiting for the email sending to complete.
    this.unblock();

    Email.send({ to, from, subject, text });
  },
  updateAccount: function(userName, emailAddress, password) {

    // update the account with the new password

    var userId = Meteor.userId();

    // and updtae their name, and email address.

    Meteor.users.update({_id: userId}, {$set: {profile: {name: userName}, emailAddress: emailAddress}});

    if (! password) {
      // do nothing
    } else {

      if (password !== '') {
        Accounts.setPassword(userId, password, false);
        console.log("password updated");
      }

    }

  },
  saveActionCompleted: function(actionId, completeDate) {

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
          modifiedAt: new Date(),
          modifiedBy: Meteor.userId()
        }});
      }

      var actionText = MyActions.findOne({_id: actionId}).actionText;
      var eventText = "Completed action - " + actionText;
      var eventDate = completeDate;

      Meteor.call('addToMyEvents', 'COMPLETED_ACTION', actionId, eventText, eventDate);
    }

  },
  addToMyEvents(eventType, eventId, eventText, eventDate) {

    if (! Meteor.userId()) {
      throw new Meteor.Error('addToMyEvents.unauthorised');
    } else {
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
    }
  },
  saveActionPlanned: function(actionId, datePlanned) {

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
          modifiedAt: new Date(),
          modifiedBy: Meteor.userId()
        }});
      }

      var actionText = MyActions.findOne({_id: actionId}).actionText;
      var eventText = "Planned action - " + actionText;
      var eventDate = datePlanned;

      Meteor.call('addToMyEvents', 'PLANNED_ACTION', actionId, eventText, eventDate);
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
  addMyCategoryUse: function(categoryId) {

    if (! Meteor.userId()) {
        throw new Meteor.Error('addMyCategoryUse.unauthorised');
    } else {
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

    }
  },
  removeMyCategoryUse: function(categoryId) {

    if (! Meteor.userId()) {
        throw new Meteor.Error('removeMyCategoryUse.unauthorised');
    } else {

          var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

          var cnt = MyCategoryUse.find({categoryId: categoryId, activeFlag: true, organisationId: orgId}).count();

          if (cnt > 0) {
            MyCategoryUse.update({organisationId: orgId, activeFlag: true, categoryId: categoryId}, {$set: {activeFlag: false, modifiedAt: new Date(), modifiedBy: Meteor.userId()}});

            MyActions.update({organisationId: orgId, categoryId: categoryId, activeFlag: true}, {$set: {activeFlag: false, modifiedAt: new Date(), modifiedBy: Meteor.userId()}}, {multi: true});
          }

    }
  },
  updateReferenceItem: function(id, category, code, description, activeFlag) {

    if (! Meteor.userId()) {
      throw new Meteor.Erorr('updateReferenceItem.unauthorised');
    } else {
      if (Roles.userIsInRole(Meteor.userId(), "ADMIN")) {
        ReferenceData.update({_id: id}, {$set: {dataType: category, code: code, description: description, activeFlag, modifiedAt: new Date(), modifiedBy: Meteor.userId()}});
      } else {
        sAlert.error("Only administrators can update reference data");
      }
    }
  },
  addReferenceItem: function(category, code, description, activeFlag) {

    if (! Meteor.userId()) {
      throw new Meteor.Error('addReferenceItem.unauthorised');
    } else {
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
    }

  },
  removeReferenceItem: function(id) {

    if (! Meteor.userId()) {
      throw new Meteor.Error('removeReferenceItem.unauthorised');
    } else {
      if (Roles.userIsInRole(Meteor.userId(), "ADMIN")) {
        ReferenceData.remove({_id: id});
      } else {
        sAlert.error("Only administrators can delete reference data");
      }
    }
  },
  addUser: function(userCode, userName, emailAddress, userGroup, activeFlag) {

    if (! Meteor.userId()) {
      throw new Meteor.Error('addUser.unauthorised');
    } else {
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

        // Add them to MailChimp so that they can get started

//        Meteor.call('addUserToMailChimp', emailAddress);

      } else {
          sAlert.error("Only administrators can create users");
      }
    }
  },
  addUserRole: function(userId, userGroup) {

    if (! Meteor.userId()) {
      throw new Meteor.Error('addUserRole.unauthorised');
    } else {
      if (userGroup === "DISABLED") {
        Roles.setUserRoles(userId, userGroup);
      } else {
        if (Roles.userIsInRole(Meteor.userId(), "ADMIN")) {
          Roles.setUserRoles(userId, userGroup);
        } else {
          sAlert.error("Only administrators can assign roles");
        }
      }
    }
  },
  removeUser: function(userId) {

    if (! Meteor.userId()) {
      throw new Meteor.Error('removeUser.unauthorised');
    } else {
      if (Roles.userIsInRole(Meteor.userId(), "ADMIN")) {
        Roles.setUserRoles(userId, 'NO ACCESS')
        // Meteor.users.remove({_id: userId});
      } else {
        sAlert.error("Only administrators can remove access");
      }
    }
  },

  saveIntent: function(intentType, intentContent) {

    if (! Meteor.userId()) {
        throw new Meteor.Error('saveIntent.unauthorised');
    } else {
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

    }

  },
  saveOrganisation: function(userId, orgName, orgDescription, orgSector, orgEmployees, orgLogoPath, orgAddr1, orgAddr2, orgSuburb, orgState, orgPostcode) {

    if (! Meteor.userId()) {
        throw new Meteor.Error('saveOrganisation.unauthorised');
    } else {
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

    }
  },
  saveOrganisationLogo(logoPath) {

    if (! Meteor.userId()) {
      throw new Meteor.Error('saveOrganisationLogo.unauthorised');
    } else {
      var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

      Organisation.update(
        {_id: orgId},
        {$set: {logoPath: logoPath, modifiedAt: new Date(), modifiedBy: Meteor.userId()}});
    }
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

    if (! Meteor.userId()) {
      throw new Meteor.Error('saveSMSEntry.unauthorised');
    } else {
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
    }
  },
  updateSMSEntry(id, entryType, location, provider, startDate, endDate, li) {

    if (! Meteor.userId()) {
        throw new Meteor.Error('updateSMSEntry.unauthorised');
    } else {
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

    }
  },
  deleteSMSEntry(id) {

    if (! Meteor.userId()) {
      throw new Meteor.Error('deleteSMSEntry.unauthorised');
    } else {
      var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

      MyMetrics.update({_id: id}, {$set: {
        modifiedAt: new Date(),
        modifiedBy: Meteor.userId(),
        activeFlag: false
      }
      });
    }
  },
  saveFeedback(feedbackEmail, feedbackText) {

    if (! Meteor.userId()) {
      throw new Meteor.Error('saveFeedback.unauthorised');
    } else {
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
    }
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

    if (! Meteor.userId()) {
      throw new Meteor.Error('saveSetting.unauthorised');
    } else {
      var settingValue = MySettings.findOne({scope: scope, key: key, activeFlag: true});

      if (settingValue ) {
        MySettings.update({scope: scope, key: key, activeFlag: true}, {$set: {activeFlag: false, modifiedBy: Meteor.userId(), modifiedAt: new Date()}});
      }

      MySettings.insert({scope: scope, key: key, value: value, activeFlag: true, createdAt: new Date(), createdBy: Meteor.userId(), modifiedAt: new Date(), modifiedBy: Meteor.userId()});
    }
  },
  addTargetDetails (categoryId, targetDate, targetReduction, targetRenewables) {

    if (! Meteor.userId()) {
        throw new Meteor.Error('addTargetDetails.unauthorised');
    } else {
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

    }
  }
})
