Template.smsEntry.onCreated(function() {
  lineItems = new Mongo.Collection(null);
});

Template.smsEntry.onRendered(function() {

  // Set the value of the vendor
  document.getElementById("vendor").value = this.data.provider;
  document.getElementById("location").value = this.data.location;
  document.getElementById("energyUsageType").value = this.data.usageType;

// debugger
  Session.set("energyUsageType", this.data.usageType);

  // This is the array of items, which we need to add to the collection
  li = this.data.items;

  // We work trhough the array and insert them.
  for(var i=0; i<li.length;i++) {
     lineItems.insert(li[i]);
  }
});

Template.smsEntry.helpers({
  isEditing: function() {
    if (! this._id) {
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
    return ReferenceData.find({dataType: "VENDOR", activeFlag: true}).fetch();
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
    debugger
    var location = $(document).find('[name=locationName]').val();
    Meteor.call('saveLocation', location, function(e, result) {
      debugger

//      document.getElementById("location").value = result;
      Session.set("addedLocation", result)
      // Once it has been saved, we can use it...
    });

    Session.set("addLocation", false);
  },
  'click .btnAddProvider': function(e, t) {
    Session.set("addProvider", true);
  },
  'click .btnCancelSaveProvider': function(e, t) {
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
