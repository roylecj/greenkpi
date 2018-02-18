Template.dashboard.onRendered(function() {

  var ctx  = document.getElementById("actionStatusChart").getContext("2d");

  var options = {
      scaleShowGridLines: true,
      scaleGridLineColor: "rgba(0,0,0,.05)",
      scaleGridLineWidth: 1,
      scaleShowHorizontalLines: true,
      scaleShowVerticalLines: true,
      bezierCurve: true,
      bezierCurveTension: 0.4,
      pointDot: true,
      pointDotRadius: 4,
      pointDotStrokeWidth: 1,
      pointHitDetectionRadius: 20,
      datasetStroke: true,
      datasetStrokeWidth: 2,
      datasetFill: true
  };

  var dataItems = [];

debugger

  var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

  var myOutCount = MyActions.find({organisationId: orgId, activeFlag: true, completeFlag: false, planFlag: false}).count();
  var myPlanCount = MyActions.find({organisationId: orgId, activeFlag: true, planFlag: true}).count();
  var myCompleteCount = MyActions.find({organisationId: orgId, activeFlag: true, completeFlag: true}).count();

  var data = {
      datasets: [{
          data: [10, 20, 30]
      }],

      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: [
          'Outstanding',
          'Planned',
          'Complete'
      ]
  };

    var options = {};

  var myPieChart = new Chart(ctx, {
      type: 'pie',
      data: data,
      options: options
  });

});
