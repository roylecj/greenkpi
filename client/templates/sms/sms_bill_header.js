Template.billHeader.helpers({
  dateOnBill: function() {
    return moment(this.billDate).format("DD MMM YYYY");
  },
  billStart: function() {
    return moment(this.billStartDate).format("DD MMM YYYY");
  },
  billEnd: function() {
    return moment(this.billEndDate).format("DD MMM YYYY");
  },
  isEditable: function() {
    if (Session.get("editingBill") === true) {
      return true
    } else {
      return false
    }
  }
});
