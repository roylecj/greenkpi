Template.intents.helpers({
  showEnergyHistory: function() {
    if (Session.get("ShowEnergyHistory") === true) {
      return true
    } else {
      return false
    }
  },
  showWaterHistory: function() {
    if (Session.get("ShowWaterHistory") === true) {
      return true
    } else {
      return false
    }
  },
  showWasteHistory: function() {
    if (Session.get("ShowWasteHistory") === true) {
      return true
    } else {
      return false
    }
  },
  energyIntent: function() {
    var intent = MyIntents.findOne({
      userId: Meteor.userId(),
      intentType: "ENERGY",
      activeFlag: true
    });

    return intent.description;
  },
  waterIntent: function() {
    var intent = MyIntents.findOne({
      userId: Meteor.userId(),
      intentType: "WATER",
      activeFlag: true
    });

    if (! intent) {
      return intent.description;
    }
  },
  wasteIntent: function() {
    var intent = MyIntents.findOne({
      userId: Meteor.userId(),
      intentType: "WASTE",
      activeFlag: true
    });

    return intent.description;
  },
  energyHistoryItems: function() {
    return MyIntents.find({userId: Meteor.userId(), intentType: "ENERGY", activeFlag: false}).fetch();
  },
  waterHistoryItems: function() {
    return MyIntents.find({userId: Meteor.userId(), intentType: "WATER", activeFlag: false}).fetch();
  },
  wasteHistoryItems: function() {
    return MyIntents.find({userId: Meteor.userId(), intentType: "WASTE", activeFlag: false}).fetch();
  }
});

Template.intents.events({
  'click .btnShowEnergyHistory': function(e, t) {
    Session.set("ShowEnergyHistory", ! Session.get("ShowEnergyHistory"));
  },
  'click .btnShowWaterHistory': function(e, t) {
    Session.set("ShowWaterHistory", ! Session.get("ShowWaterHistory"));
  },
  'click .btnShowWasteHistory': function(e, t) {
    Session.set("ShowWasteHistory", ! Session.get("ShowWasteHistory"));
  },
  'click .btnSaveEnergy': function(e, t) {
    e.preventDefault();

    var energyIntent;

    var energyIntent =  $(e.target.parentNode.parentNode.parentNode).find('[name=energyIntent]').val();

    Meteor.call("saveIntent", "ENERGY", energyIntent);
  },
  'click .btnSaveWaste': function(e, t) {
    e.preventDefault();

    var wasteIntent;

    var wasteIntent =  $(e.target.parentNode.parentNode.parentNode).find('[name=wasteIntent]').val();

    Meteor.call("saveIntent", "WASTE", wasteIntent);
  },
  'click .btnSaveWater': function(e, t) {
    e.preventDefault();

    var waterIntent;

    var waterIntent =  $(e.target.parentNode.parentNode.parentNode).find('[name=waterIntent]').val();

    Meteor.call("saveIntent", "WATER", waterIntent);
  }

});
