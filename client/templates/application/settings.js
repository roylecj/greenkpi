
Template.settings.helpers({
  employeeCountTypes: function() {
    return ReferenceData.find({dataType: "EMPLOYEE_COUNT"}).fetch();
  },
  sectorTypes: function() {
    return ReferenceData.find({dataType: "GRI_SECTORS"}).fetch();
  },
  stateCodes: function() {
    return ReferenceData.find({dataType: "STATE_CODES"}).fetch();
  }
})
