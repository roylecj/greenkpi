Template.feedbackList.helpers({
  feedbackItems: function() {
    // Return feedback - latest first
    return Feedback.find({}, {sort: {createdAt: -1}}).fetch();
  }
})
