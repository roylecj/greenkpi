Template.plan.onCreated(function() {
  // Check if there are core actions to add
  Meteor.call('addCoreActions');
});

Template.plan.onRendered(function() {
  var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;
  
    if (MyCategoryUse.find({activeFlag: true, organisationId: orgId, "categoryDetails.coreCategory": false}).count() === 0) {
      Session.set("showCategoryWarning", true)
    } else {
      Session.set("showCategoryWarning", false)
    }
});

Template.plan.helpers({
  showCategoryWarning: function() {
    return Session.get("showCategoryWarning")
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
  categoryUse: function() {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    return MyCategoryUse.find({activeFlag: true, organisationId: orgId}, {sort: {"categoryDetails.sortOrder": 1, "categoryDetails.categoryCode": 1, "categoryDetails.subCategoryCode": 1}}).fetch();
  },
  ecoEnergyQuestions: function() {
    return EcoQuestions.find({activeFlag: true, categoryCode: "ENERGY"}).fetch();
  },
  ecoWaterQuestions: function() {
    return EcoQuestions.find({activeFlag: true, categoryCode: "WATER"}).fetch();
  },
  ecoWasteQuestions: function() {
    return EcoQuestions.find({activeFlag: true, categoryCode: "WASTE"}).fetch();
  },
  questionCount: function(categoryCode) {
    var cnt = EcoQuestions.find({activeFlag: true, categoryCode: categoryCode}).count();

    if (cnt === 0) {
      return true
    } else {
      return false
    }
  },
  noEnergyQuestions: function() {
    var cnt = MyActions.find({activeFlag: true, rootCategoryCode: "ENERGY"}).count();

    if (cnt === 0) {
      return true
    } else {
      return false
    }
  },
  noWaterQuestions: function() {
    var cnt = EcoQuestions.find({activeFlag: true, categoryCode: "WATER"}).count();

    if (cnt === 0) {
      return true
    } else {
      return false
    }
  },
  noWasteQuestions: function() {
    var cnt = EcoQuestions.find({activeFlag: true, categoryCode: "WASTE"}).count();

    if (cnt === 0) {
      return true
    } else {
      return false
    }
  }
});
