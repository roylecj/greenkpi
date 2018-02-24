Template.smsEntry.onCreated(function() {
  lineItems = new Mongo.Collection(null);
});

Template.smsEntry.onRendered(function() {

  // Set the value of the vendor
  document.getElementById("vendor").value = this.data.provider;
  document.getElementById("location").value = this.data.location;
  document.getElementById("energyUsageType").value = this.data.usageType;
  
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
    return ReferenceData.find({dataType: "ENERGY_BILL", activeFlag: true}).fetch();
  },
  settings: function() {

    var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

     return {
       position: "bottom",
       limit: 5,
       rules: [
         {
           collection: MyLocations,
           field: "description",
           matchAll: true,
           filter: { organisationId: orgId, activeFlag: true },
           template: Template.locationPill
         }
       ]
     };
   },
  vendor: function() {
    return ReferenceData.find({dataType: "VENDOR", activeFlag: true}).fetch();
  },
  lineItem: function() {
    return lineItems.find().fetch();
  },
  energyTypeItem: function() {
    return ReferenceData.find({dataType: "ENERGY_TYPE", activeFlag: true}).fetch();
  },
  usageTypeItem: function() {
    return ReferenceData.find({dataType: "USAGE_TYPE", activeFlag: true}).fetch();
  },
  tariffTypeItem: function() {
    return ReferenceData.find({dataType: "TARIFF_TYPE", activeFlag: true}).fetch();
  },
});

Template.smsEntry.events({
  'click .btnRemove': function(e, t) {
    lineItems.remove({_id: this._id});
  },
  'click .btnSaveRow': function(e, t) {

    // Find the values on the screen

    var energyType = $(e.target.parentNode.parentNode.parentNode).find('[name=energyType]').val();
    var energyTypeDesc = $(e.target.parentNode.parentNode.parentNode).find('select[name="energyType"] option:selected').text();
    var usageType = $(e.target.parentNode.parentNode.parentNode).find('[name=usageType]').val();
    var usageTypeDesc = $(e.target.parentNode.parentNode.parentNode).find('select[name="usageType"] option:selected').text();
    var usage = $(e.target.parentNode.parentNode.parentNode).find('[name=usage]').val();
    var tariffType = $(e.target.parentNode.parentNode.parentNode).find('[name=tariffType]').val();
    var tariffTypeDesc = $(e.target.parentNode.parentNode.parentNode).find('select[name="tariffType"] option:selected').text();
    var tariffCost = $(e.target.parentNode.parentNode.parentNode).find('[name=tariffCost]').val();
    var totalCost = $(e.target.parentNode.parentNode.parentNode).find('[name=totalCost]').val();

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

    $(e.target.parentNode.parentNode.parentNode).find('[name=energyType]').val("");
    $(e.target.parentNode.parentNode.parentNode).find('[name=usageType]').val("");
    $(e.target.parentNode.parentNode.parentNode).find('[name=usage]').val("");
    $(e.target.parentNode.parentNode.parentNode).find('[name=tariffType]').val("");
    $(e.target.parentNode.parentNode.parentNode).find('[name=tariffCost]').val("");
    $(e.target.parentNode.parentNode.parentNode).find('[name=totalCost]').val("");

  },
  'click .btnSaveEntry': function(e, t) {

    var energyUsageType = $(e.target.parentNode.parentNode.parentNode).find('[name=energyUsageType]').val();
    var vendor = $(e.target.parentNode.parentNode.parentNode).find('[name=vendor]').val();
    var location = $(e.target.parentNode.parentNode.parentNode).find('[name=location]').val();
    var startDate = $(e.target.parentNode.parentNode.parentNode).find('[name=startDate]').val();
    var endDate = $(e.target.parentNode.parentNode.parentNode).find('[name=endDate]').val();

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
