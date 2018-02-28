Template.generateGRI.events({
  'click .btnPrepareReport': function(e, t) {
    e.preventDefault();

    var startDate =  $(document).find('[name=startDate]').val();
    var endDate =  $(document).find('[name=endDate]').val();

    // Go to the GRI Report with those parameters

    Session.set("startDate", startDate);
    Session.set("endDate", endDate);

    Router.go('griReports',  {startDate: startDate, endDate: endDate});
  }
})
