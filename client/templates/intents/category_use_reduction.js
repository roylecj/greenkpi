Template.categoryUseReduction.onRendered(function() {
  $('[data-toggle="tooltip"]').tooltip({trigger: "hover", placement: 'top'});
})
Template.categoryUseReduction.helpers({
  hasNoTarget: function() {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    var targetCount = MyTargets.find({categoryId: this._id, activeFlag: true, organisationId: orgId}).count();

    if (targetCount === 0) {

      // If the user is creating a target, then we need to show the fields.
      if (Session.get("createTarget") === this._id) {
        return false
      } else {
        return true
      }

    } else {
      return false
    }
  },
  targetDateValid: function() {
    if (Session.get("targetDateValid") === false) {
      return "has-error"
    } else {
      return ""
    }
  },
  targetDate: function() {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    var myTargetInfo = MyTargets.findOne({categoryId: this._id, activeFlag: true, organisationId: orgId});

    return myTargetInfo.targetDate;
  },
  targetReduction: function() {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    var myTargetInfo = MyTargets.findOne({categoryId: this._id, activeFlag: true, organisationId: orgId});

    return myTargetInfo.targetReduction;
  },
  targetRenewables: function() {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    var myTargetInfo = MyTargets.findOne({categoryId: this._id, activeFlag: true, organisationId: orgId});

    return myTargetInfo.targetRenewables;
  },
  invalidDateText: function() {

  }

});

Template.categoryUseReduction.events({
  'click .btnCreateTarget': function(e, t) {
    $('[data-toggle="tooltip"]').tooltip("destroy");

    $('[data-toggle="tooltip"]').tooltip({trigger: "hover", placement: 'top'});

    Session.set("createTarget", this._id);
  },
  'click .btnCancelTarget': function(e, t) {
    $('[data-toggle="tooltip"]').tooltip("destroy");

    $('[data-toggle="tooltip"]').tooltip({trigger: "hover", placement: 'top'});

    Session.set("createTarget", "");
  },
  'keyup #targetDate': function(e, t) {
    nodeItem = $(e.target);
    var targetDate = $(nodeItem).val();

    var nodeParent = $(e.target).closest("tr");
    // Check that targetDate is in the future...

    var mDate = moment(targetDate);

    if (nodeItem.val() === "") {
      $(nodeParent).find("[name=fg-targetDate]").removeClass("has-error");
      $(nodeParent).find("[name=helpText]").addClass("hidden");
    } else {
      if (mDate.isValid()) {
        if (mDate.isBefore(moment())) {
          $(nodeParent).find("[name=fg-targetDate]").addClass("has-error");
          $(nodeParent).find("[name=helpText]").removeClass("hidden");
        } else {
          $(nodeParent).find("[name=fg-targetDate]").removeClass("has-error");
          $(nodeParent).find("[name=helpText]").addClass("hidden");
        }
      } else {
        $(nodeParent).find("[name=fg-targetDate]").addClass("has-error");
        $(nodeParent).find("[name=helpText]").addClass("hidden");
      }
    }
  },
  'mouseup #targetDate': function(e, t) {
    nodeItem = $(e.target);
    var targetDate = $(nodeItem).val();

    var nodeParent = $(e.target).closest("tr");
    // Check that targetDate is in the future...

    var mDate = moment(targetDate);

    if (nodeItem.val() === "") {
      $(nodeParent).find("[name=fg-targetDate]").removeClass("has-error");
      $(nodeParent).find("[name=helpText]").addClass("hidden");
    } else {
      if (mDate.isValid()) {
        if (mDate.isBefore(moment())) {
          $(nodeParent).find("[name=fg-targetDate]").addClass("has-error");
          $(nodeParent).find("[name=helpText]").removeClass("hidden");
        } else {
          $(nodeParent).find("[name=fg-targetDate]").removeClass("has-error");
          $(nodeParent).find("[name=helpText]").addClass("hidden");
        }
      } else {
        $(nodeParent).find("[name=fg-targetDate]").addClass("has-error");
        $(nodeParent).find("[name=helpText]").addClass("hidden");
      }
    }
  },
  'click .btnSaveTarget': function(e, t) {
    $('[data-toggle="tooltip"]').tooltip("destroy");

    $('[data-toggle="tooltip"]').tooltip({trigger: "hover", placement: 'top'});

    Session.set("createTarget", "");

    var nodeItem;
    var className = "";

    nodeItem = $(e.target).closest('tr');
    var targetDate = $(nodeItem).find("[name=targetDate]").val();
    var targetReduction = $(nodeItem).find("[name=targetReduction]").val();
    var targetRenewables = $(nodeItem).find("[name=targetRenewables]").val();

    // Check that targetDate is in the future...

    var mDate = moment(targetDate);

    if (targetDate === "") {
      Meteor.call("addTargetDetails", this._id, targetDate, targetReduction, targetRenewables);
      sAlert.success("Saved");
    } else {
      if (mDate.isValid()) {
        if (mDate.isBefore(moment())) {
          $(nodeItem).find("[name=fg-targetDate]").addClass("has-error");
          sAlert.error("Target date needs to be in the future");
        } else {
          $(nodeItem).find("[name=fg-targetDate]").removeClass("has-error");
          Meteor.call("addTargetDetails", this._id, targetDate, targetReduction, targetRenewables);
          sAlert.success("Saved");
        }
      } else {
        $(nodeItem).find("[name=fg-targetDate]").addClass("has-error");
        sAlert.error("Target date needs to be in the future");
      }
    }
  }
})
