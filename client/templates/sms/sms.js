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
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    return MyMetrics.find({organisationId: orgId, entryType: 'Energy', activeFlag: true}).fetch();
  },
  myWaterBills: function() {
    return MyMetrics.find({userId: Meteor.userId(), billCategory: 'Water', activeFlag: true}).fetch();
  },
  myWasteBills: function() {
    return MyMetrics.find({userId: Meteor.userId(), billCategory: 'Waste', activeFlag: true}).fetch();
  },
  hasEnergyBill: function() {

    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    return MyMetrics.find({organisationId: orgId, entryType: 'Energy', activeFlag: true}).count();
  },
  hasWaterBill: function() {
    return MyMetrics.find({userId: Meteor.userId(), billCategory: 'Water', activeFlag: true}).count();
  },
  hasWasteBill: function() {
    return MyMetrics.find({userId: Meteor.userId(), billCategory: 'Waste', activeFlag: true}).count();
  }
});

Template.sms.events({
  'click .btnAddUsage': function(e, t) {
    Router.go("smsEntry");
  }
})
