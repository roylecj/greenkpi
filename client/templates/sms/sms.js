Template.sms.helpers({
  showEnergy: function() {
    if (Session.get("showFilter") === "ENERGY" || Session.get("showFilter") === "") {
      return true
    } else {
      return false
    }
  },
  showWater: function() {
    if (Session.get("showFilter") === "WATER" || Session.get("showFilter") === "") {
      return true
    } else {
      return false
    }
  },
  showWaste: function() {
    if (Session.get("showFilter") === "WASTE" || Session.get("showFilter") === "") {
      return true
    } else {
      return false
    }
  },
  myEnergyBills: function() {
    return MyMetrics.find({userId: Meteor.userId(), billCategory: 'Energy', activeFlag: true}).fetch();
  },
  myWaterBills: function() {
    return MyMetrics.find({userId: Meteor.userId(), billCategory: 'Water', activeFlag: true}).fetch();
  },
  myWasteBills: function() {
    return MyMetrics.find({userId: Meteor.userId(), billCategory: 'Waste', activeFlag: true}).fetch();
  },
  detailShown: function() {
    if (Session.get("detailsShown") === true) {
      return true
    } else {
      return false
    }
  },
  detailShownSize: function() {
    if (Session.get("detailsShown") === true) {
      return "col-sm-6"
    } else {
      return "col-sm-12"
    }
  },
  selectedBill: function() {
    var thisId;

    if (Session.get("currentBill") !== '') {
      thisId = Session.get("currentBill");
    }
    return MyMetrics.find({_id: thisId}).fetch();
  },
  isEdit: function() {
    if (Session.get("editingBill") === true) {
      return true
    } else {
      return false
    }
  },
  hasEnergyBill: function() {
    return MyMetrics.find({userId: Meteor.userId(), billCategory: 'Energy', activeFlag: true}).count();
  },
  hasWaterBill: function() {
    return MyMetrics.find({userId: Meteor.userId(), billCategory: 'Water', activeFlag: true}).count();
  },
  hasWasteBill: function() {
    return MyMetrics.find({userId: Meteor.userId(), billCategory: 'Waste', activeFlag: true}).count();
  }
});

Template.sms.events({
  'click .btnEditBill': function(e, t) {
    if (Session.get("editingBill") === true) {
      Session.set("editingBill", false)
    } else {
      Session.set("editingBill", true)
    }
  },
  'click .btnCancelBill': function(e, t) {
    Session.set("editingBill", false);
  },
  'click .btnSaveBill': function(e, t) {
    Session.set("editingBill", false);
    sAlert.success('Saved');

  }
})
