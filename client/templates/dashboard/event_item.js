Template.eventItem.helpers({
  eventDateTime: function() {
    return moment(this.createdAt).format("DD MMM YYYY HH:mm");
  },
  userName: function() {
    return Meteor.users.findOne({_id: this.createdBy}).profile.name;
  },
  imagePath: function() {
    var org = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true});

    var orgPath = Organisation.findOne({_id: org.organisationId}).logoPath;

    return orgPath;
  }
});
