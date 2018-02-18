Template.chartByStatus.onRendered(function() {
  var actionData = [];
  var chartType;

  switch(Session.get("chartTypeStatus")) {
      case "PIE":
          chartType = "PieChart"
          break;
      case "BAR":
          chartType = "BarChart"
          break;
      case "COLUMN":
          chartType = "ColumnChart"
          break;
      default:
          chartType = "PieChart"
  }
  var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

  var outCount = MyActions.find({organisationId: orgId, activeFlag: true, completeFlag: false, planFlag: false}).count();
  var planCount = MyActions.find({organisationId: orgId, activeFlag: true, planFlag: true}).count();
  var compCount = MyActions.find({organisationId: orgId, activeFlag: true, completeFlag: true}).count();


  actionData = [
    ['Outstanding', outCount],
    ['Planned', planCount],
    ['Complete', compCount]
  ];

  chart = {
       target: 'chartActionsByStatus',
       type: chartType,
       columns: [
         ['string', 'Status'],
         ['number', 'Count']
       ],
       rows: actionData,
       options: {
         'title':'Actions By Status',
         'width':400,
         'height':300
       }
     };

 drawChart(chart);

});

Template.chartByStatus.helpers({
  checkForChange: function() {

      var actionData = [];
      var chartType;

      switch(Session.get("chartTypeStatus")) {
          case "PIE":
              chartType = "PieChart"
              break;
          case "BAR":
              chartType = "BarChart"
              break;
          case "COLUMN":
              chartType = "ColumnChart"
              break;
          default:
              chartType = "PieChart"
      }
      var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

      var outCount = MyActions.find({organisationId: orgId, activeFlag: true, completeFlag: false, planFlag: false}).count();
      var planCount = MyActions.find({organisationId: orgId, activeFlag: true, planFlag: true}).count();
      var compCount = MyActions.find({organisationId: orgId, activeFlag: true, completeFlag: true}).count();


      actionData = [
        ['Outstanding', outCount],
        ['Planned', planCount],
        ['Complete', compCount]
      ];

      chart = {
           target: 'chartActionsByStatus',
           type: chartType,
           columns: [
             ['string', 'Status'],
             ['number', 'Count']
           ],
           rows: actionData,
           options: {
             'title':'Actions By Status',
             'width':400,
             'height':300
           }
         };

     drawChart(chart);
  }
});

Template.chartByStatus.events({
  'click chartActionsByStatus': function(e, t) {
    console.log("Clicking on the chart");
  }
})
