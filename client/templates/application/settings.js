
Template.settings.helpers({
  employeeCountTypes: function() {
    return ReferenceData.find({dataType: "EMPLOYEE_COUNT", activeFlag: true}).fetch();
  },
  sectorTypes: function() {
    return ReferenceData.find({dataType: "GRI_SECTORS", activeFlag: true}).fetch();
  },
  stateCodes: function() {
    return ReferenceData.find({dataType: "STATE_CODES", activeFlag: true}).fetch();
  }
})
