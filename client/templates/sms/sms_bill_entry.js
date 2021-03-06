Template.billEntry.helpers({
  createdDate: function() {
    return moment(this.createdAt).format("DD MMM YYYY")
  },
  billPeriod: function() {
    return moment(this.startDate).format("DD MMM YYYY") + ' - ' + moment(this.endDate).format("DD MMM YYYY")
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
  },
  usage: function() {
//    return ReferenceData.findOne({_id: this.usageType}).description
    return CategoryFields.findOne({_id: this.usageType}).categoryCode
  },
  locationName: function() {
    return MyLocations.findOne({_id: this.location}).description
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
  },
  'click .btnEditItem': function(e, t) {
    Router.go('smsEntry', {_id: this._id});
  }
})
