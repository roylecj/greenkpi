Template.generateGRI.events({
  'click .btnPrepareReport': function(e, t) {
    e.preventDefault();

    var startDate =  $(e.target.parentNode.parentNode.parentNode).find('[name=startDate]').val();
    var endDate =  $(e.target.parentNode.parentNode.parentNode).find('[name=endDate]').val();

    // Go to the GRI Report with those parameters

    Session.set("startDate", startDate);
    Session.set("endDate", endDate);

    Router.go('griReports',  {startDate: startDate, endDate: endDate});
  }
})
