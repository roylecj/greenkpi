Template.adminSettings.helpers({
    passwordLockout: function() {
      var mySetting = MySettings.findOne({scope:"GLOBAL", key: "PASSWORD_LOCKOUT", activeFlag: true});

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
      var passwordLockoutValue =  $(e.target.parentNode.parentNode.parentNode).find('[name=passwordLockoutCount]').val();

      Meteor.call('saveSetting', "GLOBAL", "PASSWORD_LOCKOUT", passwordLockoutValue);

      sAlert.success("Saved");
  }
})
