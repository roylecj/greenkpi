Template.intents.onRendered(function() {
  $('[data-toggle="tooltip"]').tooltip({trigger: "hover", placement: 'top'});
});
Template.intents.helpers({
  energyCategoryUse: function() {

    // If it is a "CoreCategory" then it is required anyway, we don't need to show it here
    // it is like ERP.

    return CategoryUse.find({rootCategoryCode: "ENERGY", coreCategory: false, activeFlag: true}).fetch();
  },
  energyCategories: function() {
    var catList = CategoryUse.find({rootCategoryCode: "ENERGY", coreCategory: false, activeFlag: true}).fetch();

    var distinctArray = _.uniq(catList, false, function(d) {return d.categoryCode});

    return distinctArray
  },
  waterCategoryUse: function() {
    return CategoryUse.find({rootcategory: "Water", coreCategory: false, activeFlag: true}).fetch();
  },
  wasteCategoryUse: function() {
    return CategoryUse.find({rootcategory: "Waste", coreCategory: false, activeFlag: true}).fetch();
  },
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

    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    var intent = MyIntents.findOne({
      organisationId: orgId,
      intentType: "ENERGY",
      activeFlag: true
    });

    return intent.description;
  },
  waterIntent: function() {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    var intent = MyIntents.findOne({
      organisationId: orgId,
      intentType: "WATER",
      activeFlag: true
    });

    return intent.description;

  },
  wasteIntent: function() {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    var intent = MyIntents.findOne({
      organisationId: orgId,
      intentType: "WASTE",
      activeFlag: true
    });

    return intent.description;
  },
  hasEnergyHistory: function() {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    return MyIntents.find({organisationId: orgId, intentType: "ENERGY", activeFlag: false}).count();
  },
  hasWaterHistory: function() {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    return MyIntents.find({organisationId: orgId, intentType: "WATER", activeFlag: false}).count();
  },
  hasWasteHistory: function() {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    return MyIntents.find({organisationId: orgId, intentType: "WASTE", activeFlag: false}).count();
  },
  energyHistoryItems: function() {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    return MyIntents.find({organisationId: orgId, intentType: "ENERGY", activeFlag: false}).fetch();
  },
  waterHistoryItems: function() {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    return MyIntents.find({organisationId: orgId, intentType: "WATER", activeFlag: false}).fetch();
  },
  wasteHistoryItems: function() {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    return MyIntents.find({organisationId: orgId, intentType: "WASTE", activeFlag: false}).fetch();
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
    $('[data-toggle="tooltip"]').tooltip("destroy");
    $('[data-toggle="tooltip"]').tooltip({trigger: "hover", placement: 'top'});

    e.preventDefault();

    var energyIntent;

    var nodeItem;

    nodeItem = $(e.target).closest('tr');

    var energyIntent =  $(nodeItem).find('[name=energyIntent]').val();

    Meteor.call("saveIntent", "ENERGY", energyIntent);

// It is saved now, so we can hide this.
    Session.set("btnEnergySave", false);
  },
  'click .btnSaveWaste': function(e, t) {
    e.preventDefault();
    $('[data-toggle="tooltip"]').tooltip("destroy");

    $('[data-toggle="tooltip"]').tooltip({trigger: "hover", placement: 'top'});

    var wasteIntent;

    var nodeItem;

    nodeItem = $(e.target).closest('tr');

    var wasteIntent =  $(nodeItem).find('[name=wasteIntent]').val();

    Meteor.call("saveIntent", "WASTE", wasteIntent);
    // It is saved now, so we can hide this.
    Session.set("btnWasteSave", false);
  },
  'click .btnSaveWater': function(e, t) {
    e.preventDefault();
    $('[data-toggle="tooltip"]').tooltip("destroy");

    $('[data-toggle="tooltip"]').tooltip({trigger: "hover", placement: 'top'});

    var waterIntent;

    var nodeItem;

    nodeItem = $(e.target).closest('tr');

    var waterIntent =  $(nodeItem).find('[name=waterIntent]').val();

    Meteor.call("saveIntent", "WATER", waterIntent);
    // It is saved now, so we can hide this.
    Session.set("btnWaterSave", false);

  },
  'keyup #wasteIntent': function(e, t) {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    if (orgId) {
      var intent = MyIntents.findOne({
        organisationId: orgId,
        intentType: "WASTE",
        activeFlag: true
      });

      if (! intent) {
        Session.set("btnWasteSave", true);
      } else {

        var myIntent = intent.description;

        if ($(e.target).val() === myIntent) {
          Session.set("btnWasteSave", false);
        } else {
          Session.set("btnWasteSave", true);
        }
      }
    } else {
      Session.set("btnWasteSave", true);
    }
  },
  'keyup #energyIntent': function(e, t) {

    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    if (orgId) {
      var intent = MyIntents.findOne({
        organisationId: orgId,
        intentType: "ENERGY",
        activeFlag: true
      });

      if (! intent) {
        Session.set("btnEnergySave", true);
      } else {
        var myIntent = intent.description;

        if ($(e.target).val() === myIntent) {
          Session.set("btnEnergySave", false);
        } else {
          Session.set("btnEnergySave", true);
        }
      }

    } else {
      Session.set("btnEnergySave", true);

    }
  },
  'keyup #waterIntent': function(e, t) {

    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    if (orgId) {
      var intent = MyIntents.findOne({
        organisationId: orgId,
        intentType: "WATER",
        activeFlag: true
      });


      if (! intent) {
          Session.set("btnWaterSave", true);
      } else {

        var myIntent = intent.description;

        if ($(e.target).val() === myIntent) {
          Session.set("btnWaterSave", false);
        } else {
          Session.set("btnWaterSave", true);
        }

      }
    } else {
      Session.set("btnWaterSave", true);
    }
  }
});
