process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

Meteor.methods({
  saveNewAction(categoryCode, reportId, actionText, isActive) {
    EcoActions.insert({
      categoryId: categoryCode,
      reportId: reportId,
      actionText: actionText,
      createdAt: new Date(),
      createdBy: Meteor.userId(),
      modifiedAt: new Date(),
      modifiedBy: Meteor.userId(),
      activeFlag: isActive
    });

  },
  updateActionActiveFlag(actionId, activeFlag) {
    EcoActions.update({_id: actionId}, {$set: {
      activeFlag: activeFlag,
      modifiedBy: Meteor.userId(),
      modifiedAt: new Date()
    }})
  },
  updateActionItem(actionId, categoryId, reportId, actionText) {
    EcoActions.update({_id: actionId}, {$set: {
      categoryId: categoryId,
      reportId: reportId,
      actionText: actionText,
      modifiedBy: Meteor.userId(),
      modifiedAt: new Date(),
    }})
  },
  addToMyEvents(eventType, eventId, eventText, eventDate, staffId) {

    if (! Meteor.userId()) {
      throw new Meteor.Error('addToMyEvents.unauthorised');
    } else {
      var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

      MyEvents.insert({
        organisationId: orgId,
        eventText: eventText,
        eventDate: eventDate,
        eventId: eventId,
        staffId: staffId,
        createdAt: new Date(),
        modifiedAt: new Date(),
        createdBy: Meteor.userId(),
        modifiedBy: Meteor.userId(),
        activeFlag: true
      })
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

// Check to see if our user is a staff member, if not, we can add them now, because there is an org attached

      Meteor.call("addUserStaff", Meteor.userId());
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
})
