Template.sms.helpers({
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
    return MyMetrics.find({billCategory: 'Energy'}).count();
  },
  hasWaterBill: function() {
    return MyMetrics.find({billCategory: 'Water'}).count();
  },
  hasWasteBill: function() {
    return MyMetrics.find({billCategory: 'Waste'}).count();
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
