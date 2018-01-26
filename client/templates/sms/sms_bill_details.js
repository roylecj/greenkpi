Template.billDetails.helpers({
  billLine: function() {
    var thisBill;

    thisBill = Session.get("currentBill");

    thisItem = MyMetrics.findOne({_id: thisBill});

    return thisItem.billDetails;
  },
  isEditing: function() {
    if (Session.get("editingBill") === true) {
      return true
    } else {
      return false
    }
  }
});
