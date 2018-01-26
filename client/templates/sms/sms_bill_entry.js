Template.billEntry.helpers({
  date: function() {
    return moment(this.billDate).format("DD MMM YYYY")
  },
  billPeriod: function() {
    return moment(this.billStartDate).format("DD MMM YYYY") + ' - ' + moment(this.billEndDate).format("DD MMM YYYY")
  },
  isCurrentItem: function() {
    if (Session.get("currentBill") === this._id) {
      return "table-active"
    }
  }
});

Template.billEntry.events({
  'click .billItem': function(e, t) {

    if (Session.get("currentBill") === this._id) {
      Session.set("detailsShown", false);
      Session.set("currentBill", "");
      Session.set("editingBill", false);
    } else {
      Session.set("currentBill", this._id);
      Session.set("detailsShown", true);
    }
  }
})
