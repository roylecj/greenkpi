Meteor.publish('ecoQuestions', function() {
    return EcoQuestions.find();
});

Meteor.publish('ecoActions', function() {
    return EcoActions.find();
});
Meteor.publish('myActions', function() {
    return MyActions.find();
});

Meteor.publish('myMetrics', function() {
    return MyMetrics.find();
});

Meteor.publish('myQuestions', function() {
    return MyQuestions.find();
})

Meteor.publish('myActionNotes', function() {
    return MyActionNotes.find();
});

Meteor.publish("userDirectory", function () {
  return Meteor.users.find({}, {fields: {_id: 1, username: 1, emails: 1, profile: 1}});
});

Meteor.publish("mySettings", function() {
  return MySettings.find();
})
