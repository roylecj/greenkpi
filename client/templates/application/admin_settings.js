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
  'click .btnSaveSettings': function(e, t) {

      e.preventDefault();

      var passwordLockoutValue =  $(document).find('[name=passwordLockoutCount]').val();

      Meteor.call('saveSetting', "GLOBAL", "PASSWORD_LOCKOUT", passwordLockoutValue);

      var numberOfMonthsValue =  $(document).find('[name=numberOfMonths]').val();

      Meteor.call('saveSetting', "GLOBAL", "NUMBER_OF_MONTHS", numberOfMonthsValue);

      sAlert.success("Saved");
  }
})
