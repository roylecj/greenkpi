Meteor.methods({
  updateAccount: function(lastName, firstName, emailAddress, password) {

    // update the account with the new password

    var userId = Meteor.userId();

    // and updtae their name, and email address.

    var userName = firstName + ' ' + lastName;

    Meteor.users.update({_id: userId}, {$set: {profile: {name: userName, lastName: lastName, firstName: firstName}, emailAddress: emailAddress}});

    if (! password) {
      // do nothing
    } else {

      if (password !== '') {
        Accounts.setPassword(userId, password, false);
        console.log("password updated");
      }

    }

    // Update the member details in the staff table.

    MyStaff.update({userId: userId, activeFlag: true}, {$set: {firstName: firstName, lastName: lastName, emailAddress: emailAddress, modifiedAt: new Date(), modifiedBy: Meteor.userId()}})
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
  addUserStaff: function(userId) {
    // See if the user exists already as a staff member...

    var orgId = MyOrganisation.findOne({userId: userId, activeFlag: true}).organisationId;

    var userRecord = Meteor.users.findOne({_id: userId});

console.log("Adding staff");

    if (MyStaff.find({userId: userId, activeFlag: true, organisationId: orgId}).count() === 0) {
      MyStaff.insert({
        userId: userId,
        organisationId: orgId,
        lastName: userRecord.profile.lastName,
        firstName: userRecord.profile.firstName,
        emailAddress: userRecord.emails[0].address,
        createdAt: new Date(),
        createdBy: Meteor.userId(),
        modifiedAt: new Date(),
        modifiedBy: Meteor.userId(),
        activeFlag: true
      });
    }

    // TODO!! - when we have more then one user -  Now check if all users from that organisation are added as staff.
  },
  addUser: function(userCode, firstName, lastName, emailAddress, userGroup, activeFlag) {

    var userName = firstName + ' ' + lastName;

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
                                   name: userName,
                                   firstName: firstName,
                                   lastName: lastName
                               }
                             });

        // Add them to MailChimp so that they can get started

//        Meteor.call('addUserToMailChimp', emailAddress);

      } else {
          sAlert.error("Only administrators can create users");
      }
    }
  },
  resetUserPassword: function(userId, userEmail, tempPassword, newPassword) {
    // Check that this user id, has this email, otherwise error back

    var userRec = Meteor.users.findOne({_id: userId});

    if (userRec.emails[0].address === userEmail) {
      Accounts.changePassword(tempPassword, newPassword)
    } else {
      throw new Meteor.Error('invalid user');
    }
  }
})
