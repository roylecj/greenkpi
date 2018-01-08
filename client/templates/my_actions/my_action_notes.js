Template.myActionNotes.helpers({
  noteDateFormatted: function() {
    var dateString;

    dateString = moment(this.noteDate).format("DD MMM YYYY") + ' (' + moment(this.noteDate).fromNow() + ')';
    return dateString;
  },
  noteBy: function() {
    return Meteor.users.findOne({_id: this.createdBy}).profile.name

  }
});
