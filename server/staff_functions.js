Meteor.methods({
  removeStaff: function(id) {
    // This will remove the staff item

    // First check that this only belongs to this organisation, before we remove it.


    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;
    MyStaff.update({_id: id, organisationId: orgId}, {$set: {activeFlag: false, modifiedAt: new Date(), modifiedBy: Meteor.userId()}})
  },
  saveStaff: function(id, firstName, lastName, emailAddress) {
    // This will update an existing staff items

    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    MyStaff.update({organisationId: orgId, _id: id}, {$set: {firstName: firstName, lastName: lastName, emailAddress: emailAddress, modifiedAt: new Date(), modifiedBy: Meteor.userId()}})

  },
  saveNewStaff: function(firstName, lastName, emailAddress) {

    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    MyStaff.insert({
      organisationId: orgId,
      firstName: firstName,
      lastName: lastName,
      emailAddress: emailAddress,
      createdAt: new Date(),
      createdBy: Meteor.userId(),
      modifiedAt: new Date(),
      modifiedBy: Meteor.userId(),
      activeFlag: true
    })
  }
})
