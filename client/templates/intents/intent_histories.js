Template.intentHistories.helpers({
  modifyDate: function() {
    return moment(this.modifiedAt).format("DD MMM YYYY");
  },
  modifyBy: function() {
    var modifyUser = this.modifiedBy;

    var name = Meteor.users.findOne({_id: modifyUser}).profile.name;

    return name;
  }
})
