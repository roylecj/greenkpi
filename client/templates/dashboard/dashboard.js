Template.dashboard.helpers({
  energyType: function() {
    // Select all of the energy types that we have bills for.

    return ReferenceData.find({dataType: "ENERGY_BILL", activeFlag: true}).fetch();
//    return MyMetrics.find({entryType: "ENERGY", activeFlag: true}).distinct("usageType")
  }
})
Template.dashboard.events({
  'click .btnBarActions': function(e, t) {
    Session.set('chartTypeStatus', "BAR");
  },
  'click .btnColumnActions': function(e, t) {
    Session.set('chartTypeStatus', "COLUMN");
  },
  'click .btnPieActions': function(e, t) {
    Session.set('chartTypeStatus', "PIE");
  }
})
