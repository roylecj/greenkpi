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
