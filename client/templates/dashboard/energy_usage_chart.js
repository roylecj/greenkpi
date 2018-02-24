Template.energyUsageChart.onRendered(function() {
  var actionData = [];
  var chartType = "LineChart";

  var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

  var usageTypeDescription = ReferenceData.findOne({_id: this.data._id}).description;

  // Select the last 12 months of data

  var start;
  var end;

  if (! Session.get("startDate")) {
    start = moment().subtract(12, 'months').format("YYYY-MM-DD");
    end = moment().format("YYYY-MM-DD");
  } else {
    start = Session.get("startDate");
    end = Session.get("endDate");
  }

  // Loop through all months from start to end, and create the collection for the chart

  outputData = [];
/*
  thisMonthNum = start;

  for(var i=0; i<12;i++) {
    outputData[i] = 0;
    actionData[i] = moment(thisMonthNum).format("MMM YY");
    thisMonthNum = moment(thisMonthNum).add(1, "months");
  }
*/
  billList = MyMetrics.find({organisationId: orgId, usageType: this.data._id, activeFlag: true, endDate: { $gte : start, $lt: end }}).fetch();


  for(var i=0; i<billList.length;i++) {
      // thisMonth = moment(billList[i].endDate).format("M") - 1;
//      thisMonth = moment(billList[i].endDate).diff(moment(start), 'months')+1;

      thisValue = 0;

      // Iterate over the line items
      for (var li=0; li<billList[i].items.length; li++) {
        thisValue += +billList[i].items[li].usage;
      }
/*
      if (! outputData[thisMonth]) {
        outputData[thisMonth] = thisValue;
      } else {
        outputData[thisMonth] += +thisValue;
      }
      */
      outputData[i] = thisValue;
      actionData[i] = [moment(billList[i].endDate).format("DD MMM YYYY"), outputData[i]];
  }

  thisMonthNum = start;
/*
  for(i=0; i<12;i++) {

    thisItem = [moment(thisMonthNum).format("MMM YY"), outputData[i]];
//    thisItem = [moment(thisMonthNum).format("MMM YY"), i];
    actionData[i] = thisItem;
    thisMonthNum = moment(thisMonthNum).add(1, "months");
  }
*/
  divchart = {
       target: 'chart' + this.data._id,
       type: chartType,
       columns: [
         ['string', 'Month'],
         ['number', 'Usage']
       ],
       rows: actionData,
       options: {
         'title':'Energy Usage for ' + usageTypeDescription,
         'width':400,
         'height':300
       }
     };

 drawChart(divchart);

});

Template.energyUsageChart.helpers({
  chartName: function() {
    return "chart" + this._id
  },
});

Template.energyUsageChart.events({
  'click chartActionsByStatus': function(e, t) {
    console.log("Clicking on the chart");
  }
})
