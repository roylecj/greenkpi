Template.reportActionItem.helpers({
  dateActioned: function() {
    if (this.planFlag === true) {
      return moment(this.planDate).format("DD MMM YYYY")
    } else {
      if (this.completeFlag === true) {
        return moment(this.completeDate).format("DD MMM YYYY")
      }
    }
  },
  category: function() {
    var catUse = CategoryUse.findOne({_id: this.categoryId});

    return catUse.rootCategoryCode + ' - ' + catUse.categoryCode + ' - ' + catUse.subCategoryCode;
  }
});
