Meteor.publish('ecoQuestions', function() {
    return EcoQuestions.find();
});

Meteor.publish('ecoActions', function() {
    return EcoActions.find();
});
Meteor.publish('myActions', function() {
    return MyActions.find({userId: Meteor.userId()});
});

Meteor.publish('myMetrics', function() {
    return MyMetrics.find({userId: Meteor.userId()});
});

Meteor.publish('myQuestions', function() {
    return MyQuestions.find({userId: Meteor.userId()});
})

Meteor.publish('referenceData', function() {
    return ReferenceData.find();
});

Meteor.publish('vendor', function() {
    return Vendors.find();
})

Meteor.publish('myActionNotes', function() {
    return MyActionNotes.find({userId: Meteor.userId()});
});

Meteor.publish("userDirectory", function () {
  return Meteor.users.find({}, {fields: {_id: 1, username: 1, emails: 1, profile: 1, roles: 1}});
});

Meteor.publish("mySettings", function() {
  return MySettings.find({userId: Meteor.userId()});
})

Meteor.publish("myIntents", function() {
  return MyIntents.find({userId: Meteor.userId()});
});

Meteor.publish("myOrganisation", function() {
  return MyOrganisation.find({userId: Meteor.userId()});
})

Meteor.publish("auditInfo", function() {
  return AuditInfo.find({userId: Meteor.userId()});
});

Meteor.publish(null, function (){
  return Meteor.roles.find({})
});
