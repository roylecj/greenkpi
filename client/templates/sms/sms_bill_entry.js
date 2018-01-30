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
  },
  billTypeDescription: function() {
    return ReferenceData.findOne({dataType: "ENERGY_BILL", code: this.billTypeCode}).description;
  },
  billVendor: function() {
    return Vendors.findOne({code: this.billVendorCode}).description
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
