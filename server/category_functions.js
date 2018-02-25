Meteor.methods({
  addTargetDetails (categoryId, targetDate, targetReduction, targetRenewables) {

    if (! Meteor.userId()) {
        throw new Meteor.Error('addTargetDetails.unauthorised');
    } else {
      var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

      var cnt = MyTargets.find({organisationId: orgId, activeFlag: true, categoryId: categoryId}).count();

      if (cnt > 0) {
        MyTargets.update({organisationId: orgId, activeFlag: true, categoryId: categoryId}, {$set: {activeFlag: false, modifiedBy: Meteor.userId(), modifiedAt: new Date()}});
      }

      MyTargets.insert({
        organisationId: orgId,
        categoryId: categoryId,
        targetDate: targetDate,
        targetReduction: targetReduction,
        targetRenewables: targetRenewables,
        createdAt: new Date(),
        modifiedAt: new Date(),
        createdBy: Meteor.userId(),
        modifiedBy: Meteor.userId(),
        activeFlag: true
      });

      var categoryCode = CategoryUse.findOne({_id: categoryId}).categoryCode;
      var eventText = "Added target reduction for " + categoryCode;
      var eventDate = new Date();

      Meteor.call('addToMyEvents', 'ADDED_TARGET', categoryId, eventText, eventDate, eventDate);

    }
  },
  removeMyCategoryUse: function(categoryId) {

    if (! Meteor.userId()) {
        throw new Meteor.Error('removeMyCategoryUse.unauthorised');
    } else {

          var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

          var cnt = MyCategoryUse.find({categoryId: categoryId, activeFlag: true, organisationId: orgId}).count();

          if (cnt > 0) {
            MyCategoryUse.update({organisationId: orgId, activeFlag: true, categoryId: categoryId}, {$set: {activeFlag: false, modifiedAt: new Date(), modifiedBy: Meteor.userId()}});

            MyActions.update({organisationId: orgId, categoryId: categoryId, activeFlag: true}, {$set: {activeFlag: false, modifiedAt: new Date(), modifiedBy: Meteor.userId()}}, {multi: true});
          }

    }
  },
  addMyCategoryUse: function(categoryId) {

    if (! Meteor.userId()) {
        throw new Meteor.Error('addMyCategoryUse.unauthorised');
    } else {
      // Check to see if the myCategory is added already
      var orgId = MyOrganisation.findOne({userId: Meteor.userId(), activeFlag: true}).organisationId;

      var cnt = MyCategoryUse.find({categoryId: categoryId, activeFlag: true, organisationId: orgId}).count();

      var catInfo = CategoryUse.findOne({_id: categoryId});

      if (cnt === 0) {
        // Only add it if there isn't one...

        MyCategoryUse.insert({
          categoryId: categoryId,
          categoryDetails: catInfo,
          organisationId: orgId,
          createdAt: new Date(),
          createdBy: Meteor.userId(),
          modifiedAt: new Date(),
          modifiedBy: Meteor.userId(),
          activeFlag: true
        });
      };

      // Now we can assign Actions for these categories...

      var qList;
      var itmCount;

      qList = EcoActions.find({categoryId: categoryId, activeFlag: true}).fetch();

      itmCount = EcoActions.find({categoryId: categoryId, activeFlag: true}).count();

      for (var qItem = 0; qItem < itmCount; qItem++) {

          MyActions.insert({
            organisationId: orgId,
            categoryId: categoryId,
            actionId: qList[qItem]._id,
            actionText: qList[qItem].actionText,
            completeFlag: false,
            planFlag: false,
            createdAt: new Date(),
            createdBy: Meteor.userId(),
            modifiedAt: new Date(),
            modifiedBy: Meteor.userId(),
            activeFlag: true
          });
      }

    }
  },


});
