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
  billType: function() {
    return ReferenceData.find({dataType: "ENERGY_BILL"}).fetch();
  },
  billTypeDescription: function() {
    return ReferenceData.findOne({dataType: "ENERGY_BILL", code: this.billTypeCode}).description;
  },
  isEditable: function() {
    if (Session.get("editingBill") === true) {
      return true
    } else {
      return false
    }
  }
});
