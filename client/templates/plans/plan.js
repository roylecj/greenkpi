Template.plan.helpers({
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
    var cnt = EcoQuestions.find({activeFlag: true, categoryCode: "ENERGY"}).count();

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
