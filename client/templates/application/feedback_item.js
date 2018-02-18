Template.feedbackItem.helpers({
  feedbackDate: function() {
    return moment(this.createdAt).format("DD MMM YYYY HH:MM") + ' (' + moment(this.createdAt).fromNow() + ')'
  },
  userLogged: function() {
    return Meteor.users.findOne({_id: this.createdBy}).profile.name
  }
})
