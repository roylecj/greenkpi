Template.sms.helpers({
  myBills: function() {
    return MyMetrics.find().fetch();
  }
});
