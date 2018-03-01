Template.smsEntry.onCreated(function() {
  lineItems = new Mongo.Collection(null);

  Session.setDefault("smsErrorText", "");

});

Template.smsEntry.onRendered(function() {

  // Set the value of the vendor
  document.getElementById("vendor").value = this.data.provider;
  document.getElementById("location").value = this.data.location;
  document.getElementById("energyUsageType").value = this.data.usageType;

// debugger
  Session.set("energyUsageType", this.data.usageType);
  Session.setDefault("smsErrorText", "");

  // This is the array of items, which we need to add to the collection
  li = this.data.items;

  // We work trhough the array and insert them.
  for(var i=0; i<li.length;i++) {
     lineItems.insert(li[i]);
  }

   $('#smsEntryForm').parsley();
});

Template.smsEntry.helpers({
  isEditing: function() {
    if (! this._id) {
      return false
    } else {
      return true
    }
  },
  validStartDate: function() {
    return moment().format("YYYY-MM-DD")
  },
  validEndDate: function() {

    return moment().format("YYYY-MM-DD")
  },
  errorText: function() {
    return Session.get("smsErrorText");
  },
  hasErrors: function() {
    if (Session.get("smsErrorText") === "") {
      return false
    } else {
      return true
    }
  },
  energyType: function() {
//    return ReferenceData.find({dataType: "ENERGY_BILL", activeFlag: true}).fetch();
    return CategoryFields.find({rootCategoryCode: "ENERGY", activeFlag: true}).fetch();
  },
  energyUsageType: function() {
    debugger

    document.getElementById("energyUsageType").value = Session.get("energyUsageType");
  },
  addLocation: function() {
    return Session.get("addLocation")
  },
  addProvider: function() {
    return Session.get("addProvider")
  },
  locationItems: function() {
    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

    if (Session.get("addedLocation") !== "") {

    }
    return MyLocations.find({organisationId: orgId, activeFlag: true}, {sort: {description: 1}}).fetch();
   },
  addedLocation: function() {
    if (Session.get("addedLocation") !== "") {
      document.getElementById("location").value = Session.get("addedLocation");

      Session.set("addedLocation", "");
    }
  },
  vendor: function() {
//    return ReferenceData.find({dataType: "VENDOR", activeFlag: true}).fetch();
//{$or: [{email: 'some@mail.com'},{city: 'atlanta'}]}

    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;
    return ReferenceData.find({$or: [{dataType: "VENDOR", activeFlag: true, organisationId: {$exists: false}}, {dataType: "VENDOR", activeFlag:true, organisationId: orgId}]})
  },
  lineItem: function() {
    return lineItems.find().fetch();
  },
  energyTypeItem: function() {
    var energyType = Session.get("energyUsageType");

    var cat = CategoryFields.findOne({_id: energyType});

    return ReferenceData.find({dataType: "ENERGY_TYPE", categoryFilter: cat.categoryCode, activeFlag: true}).fetch();
  },
  usageTypeItem: function() {
    // Check the type of usage
    var energyType = Session.get("energyUsageType");

    var cat = CategoryFields.findOne({_id: energyType});

    return ReferenceData.find({dataType: "USAGE_TYPE", categoryFilter: cat.categoryCode, activeFlag: true}).fetch();
  },
  tariffTypeItem: function() {
    return ReferenceData.find({dataType: "TARIFF_TYPE", activeFlag: true}).fetch();
  },
  hasStartDateField: function() {
    var energyType = Session.get("energyUsageType");

    var cat = CategoryFields.findOne({_id: energyType});

    return cat.hasStartDate
  },
  hasEndDateField: function() {
    var energyType = Session.get("energyUsageType");

    var cat = CategoryFields.findOne({_id: energyType});

    return cat.hasEndDate
  },
  hasTariffType: function() {
    var energyType = Session.get("energyUsageType");

    var cat = CategoryFields.findOne({_id: energyType});

    return cat.hasTariffType
  },
  totalCostEdit: function() {
    return Session.get("totalCost");
  }
});

Template.smsEntry.events({
  'click .btnRemove': function(e, t) {
    lineItems.remove({_id: this._id});
  },
  'change #energyUsageType': function(e, t) {
    var energyUsageType = $(e.target).val();
    Session.set('energyUsageType', energyUsageType);
  },
  'change #usage': function(e, t) {
    var usage = $(e.target).val();
    var tariffCost = $(document).find('[name=tariffCost]').val();

    if (!isNaN(usage) && !isNaN(tariffCost)) {
      var totalCost = +usage * +tariffCost;
      Session.set("totalCost", totalCost);
    }
  },
  'change #tariffCost': function(e, t) {
    var usage = $(document).find('[name=usage]').val();
    var tariffCost = $(e.target).val();

    if (!isNaN(usage) && !isNaN(tariffCost)) {
      var totalCost = +usage * +tariffCost;
      Session.set("totalCost", totalCost);
    }
  },
  'click .btnAddLocation': function(e, t) {
    Session.set("addLocation", true);
  },
  'click .btnCancelSaveLocation': function(e, t) {
    Session.set("addLocation", false);
  },
  'click .btnSaveLocation': function(e, t) {
    var location = $(document).find('[name=locationName]').val();
    Meteor.call('saveLocation', location, function(e, result) {

//      document.getElementById("location").value = result;
      Session.set("addedLocation", result)
      // Once it has been saved, we can use it...
    });

    Session.set("addLocation", false);
  },
  'click .btnAddProvider': function(e, t) {
    debugger
    Session.set("addProvider", true);
  },
  'click .btnCancelSaveProvider': function(e, t) {
    Session.set("addProvider", false);
  },
  'keyup #endDate': function(e, t) {
    nodeItem = $(e.target);

    var targetDate = $(nodeItem).val();

    var mDate = moment(targetDate);

    if (nodeItem.val() === "") {
      $(document).find("[name=fg-endDate]").removeClass("has-error");
      $(document).find("[name=helpText]").addClass("hidden");
    } else {
      if (mDate.isValid()) {
        if (mDate.isAfter(moment())) {
          $(document).find("[name=fg-endDate]").addClass("has-error");
          $(document).find("[name=helpText]").removeClass("hidden");
        } else {
          $(document).find("[name=fg-endDate]").removeClass("has-error");
          $(document).find("[name=helpText]").addClass("hidden");
        }
      } else {
        $(document).find("[name=fg-endDate]").addClass("has-error");
        $(document).find("[name=helpText]").addClass("hidden");
      }
    }
  },
  'click .btnSaveProvider': function(e, t) {
    var provider = $(document).find('[name=providerName]').val();
    Meteor.call('saveProvider', provider, function(e, result) {
        sAlert.error(e);
    });

    Session.set("addProvider", false);
  },
  'click .btnSaveRow': function(e, t) {

    // Find the values on the screen

    var energyType = $(document).find('[name=energyType]').val();
    var energyTypeDesc = $(document).find('select[name="energyType"] option:selected').text();
    var usageType = $(document).find('[name=usageType]').val();
    var usageTypeDesc = $(document).find('select[name="usageType"] option:selected').text();
    var usage = $(document).find('[name=usage]').val();
    var tariffType = $(document).find('[name=tariffType]').val();
    var tariffTypeDesc = $(document).find('select[name="tariffType"] option:selected').text();
    var tariffCost = $(document).find('[name=tariffCost]').val();
    var totalCost = Session.get("totalCost");

    // Check mandatory fields.

    if (usage === "") {
      sAlert.error("Usage is mandatory");
      return
    }

    if (tariffCost === "") {
      sAlert.error("Unit Cost is mandatory");
      return
    }

    Session.set("totalCost", "");
    // Insert into local Collection

    lineItems.insert({
      energyType: energyType,
      energyTypeDesc: energyTypeDesc,
      usageType: usageType,
      usageTypeDesc: usageTypeDesc,
      usage: usage,
      tariffType: tariffType,
      tariffTypeDesc: tariffTypeDesc,
      tariffCost: tariffCost,
      totalCost: totalCost
    });

    // Clear out the variables now so we can add another one.

    $(document).find('[name=energyType]').val("");
    $(document).find('[name=usageType]').val("");
    $(document).find('[name=usage]').val("");
    $(document).find('[name=tariffType]').val("");
    $(document).find('[name=tariffCost]').val("");
//    $(document).find('[name=totalCost]').val("");

  },
  'click .btnSaveEntry': function(e, t) {

    var formValid = $('#smsEntryForm').parsley().isValid();

    var errorText = "";

    if (! formValid) {

      if (! $('#energyUsageType').parsley().isValid()) {
        errorText = errorText + "Mandatory Field missing - Usage Type<br/>";
      }

      if (! $("#vendor").parsley().isValid()) {
        errorText = errorText + "Mandatory Field missing - Energy Provider<br/>";
      }

      if (! $("#location").parsley().isValid()) {
        errorText = errorText + "Mandatory Field missing - Location<br/>";
      }

      if (! $("#startDate").parsley().isValid()) {

        if ($("#startDate").val() === "") {
          errorText = errorText + "Mandatory Field missing - Start Date<br/>";
        }
      }

      if (! $("#endDate").parsley().isValid()) {
        if ($("#endDate").val() === "") {
          errorText = errorText + "Mandatory Field missing - End Date<br/>";
        }
      }

//      Session.set("smsErrorText", errorText);
//      return
    }

    var endDate = $("#endDate").val();
    var startDate = $("#startDate").val();

    if (startDate === "") {
        errorText = errorText + "Mandatory Field missing - Start date<br/>";
    }

    if (endDate === "") {
        errorText = errorText + "Mandatory Field missing - End date<br/>";
    }

    if (startDate !== "" && endDate !== "") {
      if (moment(startDate).isValid() === false) {
          errorText = errorText + "Start date is invalid<br/>";
      }

      if (moment(endDate).isValid() === false) {
          errorText = errorText + "End date is invalid<br/>";
      }

      if (moment(startDate).isAfter(moment(endDate))) {
          errorText = errorText + "Start date must be before End Date<br/>";
      }
    }

    if (errorText !== "") {
        Session.set("smsErrorText", errorText);
        return
    }

    /*
    $('smsEntryForm').parsley().on('form:validate', function (formInstance) {
      var ok = formInstance.isValid({force: true}) || formInstance.isValid({force: true});
      if (!ok) {
        sAlert.error("please complete all mandatory fields");
        formInstance.validationResult = false;
      }
    });
*/

    var energyUsageType = $(document).find('[name=energyUsageType]').val();
    var vendor = $(document).find('[name=vendor]').val();
    var location = $(document).find('[name=location]').val();
    var startDate = $(document).find('[name=startDate]').val();
    var endDate = $(document).find('[name=endDate]').val();

    if (!startDate) {
      startDate = endDate;
    }

    var li = lineItems.find().fetch();

    if (! this._id) {
      // This is a new entry - so we need to insert it
      Meteor.call('saveSMSEntry', 'Energy', energyUsageType, location, vendor, startDate, endDate, li);
    } else {
      // This is an update to an existing entry, so let's update it
      Meteor.call('updateSMSEntry', this._id, 'Energy', energyUsageType, location, vendor, startDate, endDate, li);
    }

    Session.set("smsErrorText", "");
    sAlert.success("Saved");

    Router.go("sms");

  },
  'click .btnSaveCancel': function(e, t) {
    Router.go("sms");
  },
  'click .btnDeleteEntry': function(e, t) {
    // Are you sure?
    sAlert.error("Usage deleted");
    Meteor.call("deleteSMSEntry", this._id);
    Router.go("sms");
  }
})
