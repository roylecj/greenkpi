Template.billLineDetail.helpers({
  sustainFlag: function() {
    if (this.isSustainable === true) {
      return true
    } else {
      return false
    }
  },
  isEditing: function() {
    if (Session.get("editingBill") === true) {
      return true
    } else {
      return false
    }    
  }
});
