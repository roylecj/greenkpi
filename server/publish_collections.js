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

Meteor.publish('referenceData', function() {
    return ReferenceData.find();
});

Meteor.publish('vendor', function() {
    return Vendors.find();
})

Meteor.publish('myActionNotes', function() {
    return MyActionNotes.find();
});

Meteor.publish("categoryUse", function() {
    return CategoryUse.find();
});

Meteor.publish('userAudit', function() {
    return UserAudit.find();
});

Meteor.publish("userDirectory", function () {
  return Meteor.users.find({}, {fields: {_id: 1, username: 1, emails: 1, profile: 1, roles: 1}});
});

Meteor.publish("mySettings", function() {
  return MySettings.find();
})

Meteor.publish("myIntents", function() {
  return MyIntents.find();
});

Meteor.publish("organisation", function() {
  return Organisation.find({});
});

Meteor.publish("myOrganisation", function() {
  return MyOrganisation.find();
});

Meteor.publish("auditInfo", function() {
  return AuditInfo.find({userId: Meteor.userId()});
});

Meteor.publish("myCategoryUse", function() {
  return MyCategoryUse.find();
});

Meteor.publish("myTargets", function() {
  return MyTargets.find();
});

Meteor.publish("images", function(){ return Images.find(); });

Meteor.publish(null, function (){
  return Meteor.roles.find({})
});
