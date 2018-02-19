Template.adminSettings.helpers({
    passwordLockout: function() {
      var mySetting = MySettings.findOne({scope:"GLOBAL", key: "PASSWORD_LOCKOUT", activeFlag: true});

      if (! mySetting) {
        return ""
            } else {

        return mySetting.value;
      }

    },
    numberOfMonths: function() {
      var mySetting = MySettings.findOne({scope:"GLOBAL", key: "NUMBER_OF_MONTHS", activeFlag: true});

      if (! mySetting) {
        return ""
            } else {

        return mySetting.value;
      }

    }
});

Template.adminSettings.events({
  'click .btnTestEmail': function(e, t) {
    Meteor.call('sendEmail', 'roylecj@gmail.com', 'chris@greenkpi.com.au', 'Test', 'This is a test message');
  },
  'click .btnSaveSettings': function(e, t) {

      e.preventDefault();
      var passwordLockoutValue =  $(e.target.parentNode.parentNode.parentNode).find('[name=passwordLockoutCount]').val();

      Meteor.call('saveSetting', "GLOBAL", "PASSWORD_LOCKOUT", passwordLockoutValue);

      var numberOfMonthsValue =  $(e.target.parentNode.parentNode.parentNode).find('[name=numberOfMonths]').val();

      Meteor.call('saveSetting', "GLOBAL", "NUMBER_OF_MONTHS", numberOfMonthsValue);

      sAlert.success("Saved");
  }
})
