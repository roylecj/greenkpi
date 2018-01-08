Template.actionList.onRendered(function() {
  Session.set("currentMenu", "PLAN");
})
Template.actionList.helpers({
  ecoQuestions: function() {
    return EcoQuestions.find({activeFlag: true}).fetch();
  }
});
