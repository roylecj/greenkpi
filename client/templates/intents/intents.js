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
  btnIntentEnergy: function() {
    if (Session.get("ShowEnergyHistory") === true) {
      return "btn-primary"
    } else {
      return "btn-success"
    }
  },
  btnIntentWater: function() {
    if (Session.get("ShowWaterHistory") === true) {
      return "btn-primary"
    } else {
      return "btn-success"
    }
  },
  btnIntentWaste: function() {
    if (Session.get("ShowWasteHistory") === true) {
      return "btn-primary"
    } else {
      return "btn-success"
    }
  },
  saveWater: function() {
    if (Session.get("btnWaterSave")) {
      return true
    } else {
      return false
    }
  },
  saveEnergy: function() {
    if (Session.get("btnEnergySave")) {
      return true
    } else {
      return false
    }
  },
  saveWaste: function() {
    if (Session.get("btnWasteSave")) {
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

    return intent.description;

  },
  wasteIntent: function() {
    var intent = MyIntents.findOne({
      userId: Meteor.userId(),
      intentType: "WASTE",
      activeFlag: true
    });

    return intent.description;
  },
  hasEnergyHistory: function() {
    return MyIntents.find({userId: Meteor.userId(), intentType: "ENERGY", activeFlag: false}).count();
  },
  hasWaterHistory: function() {
    return MyIntents.find({userId: Meteor.userId(), intentType: "WATER", activeFlag: false}).count();
  },
  hasWasteHistory: function() {
    return MyIntents.find({userId: Meteor.userId(), intentType: "WASTE", activeFlag: false}).count();
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

// It is saved now, so we can hide this.
    Session.set("btnEnergySave", false);
  },
  'click .btnSaveWaste': function(e, t) {
    e.preventDefault();

    var wasteIntent;

    var wasteIntent =  $(e.target.parentNode.parentNode.parentNode).find('[name=wasteIntent]').val();

    Meteor.call("saveIntent", "WASTE", wasteIntent);
    // It is saved now, so we can hide this.
    Session.set("btnWasteSave", false);
  },
  'click .btnSaveWater': function(e, t) {
    e.preventDefault();

    var waterIntent;

    var waterIntent =  $(e.target.parentNode.parentNode.parentNode).find('[name=waterIntent]').val();

    Meteor.call("saveIntent", "WATER", waterIntent);
    // It is saved now, so we can hide this.
    Session.set("btnWaterSave", false);

  },
  'keyup #wasteIntent': function(e, t) {

    var intent = MyIntents.findOne({
      userId: Meteor.userId(),
      intentType: "WASTE",
      activeFlag: true
    });

    var myIntent = intent.description;

    if ($(e.target).val() === myIntent) {
      Session.set("btnWasteSave", false);
    } else {
      Session.set("btnWasteSave", true);
    }
  },
  'keyup #energyIntent': function(e, t) {

    var intent = MyIntents.findOne({
      userId: Meteor.userId(),
      intentType: "ENERGY",
      activeFlag: true
    });

    var myIntent = intent.description;

    if ($(e.target).val() === myIntent) {
      Session.set("btnEnergySave", false);
    } else {
      Session.set("btnEnergySave", true);
    }
  },
  'keyup #waterIntent': function(e, t) {

    var intent = MyIntents.findOne({
      userId: Meteor.userId(),
      intentType: "WATER",
      activeFlag: true
    });

    var myIntent = intent.description;

    if ($(e.target).val() === myIntent) {
      Session.set("btnWaterSave", false);
    } else {
      Session.set("btnWaterSave", true);
    }
  }
});
