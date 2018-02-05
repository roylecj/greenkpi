Template.intentHistories.helpers({
  modifyDate: function() {
    return moment(this.modifiedAt).format("DD MMM YYYY");
  }
})
