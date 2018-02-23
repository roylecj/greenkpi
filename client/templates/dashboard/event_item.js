Template.eventItem.helpers({
  eventDateTime: function() {
    return moment(this.createdAt).format("DD MMM YYYY HH:mm");
  },
  userName: function() {
    // If this is a team member, then we just need return those details.
    if (this.staffId) {
      var myRec =  MyStaff.findOne({_id: this.staffId});
      return myRec.firstName + ' ' + myRec.lastName;
    } else {
      return Meteor.users.findOne({_id: this.createdBy}).profile.name;
    }
  },
  isStaffOnly: function() {
    if (this.staffId) {
      var myRec =  MyStaff.findOne({_id: this.staffId});

      if (! myRec.userId) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  },
  imagePath: function() {
    var org = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true});

    var orgPath = Organisation.findOne({_id: org.organisationId}).logoPath;

    return orgPath;
  }
});
