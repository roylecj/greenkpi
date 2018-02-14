Template.smsEntry.helpers({});

Template.smsEntry.events({
  'click .btnSaveHeader': function(e, t) {
    Meteor.call('saveBillHeader', location, provider, startDate, endDate );
  }
})
