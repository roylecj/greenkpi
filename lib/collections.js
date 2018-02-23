Accounts.config({
  forbidClientAccountCreation: false,
});

Images = new FilesCollection({
  collectionName: 'Images',
  allowClientCode: false, // Disallow remove files from Client
  storagePath: '/home/chris/imageStore',
  downloadRoute: '/cdn/server',
  public: true,
  onBeforeUpload(file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
      return true;
    } else {
      return 'Please upload image, with size equal or less than 10MB';
    }
  }
});

// This contains the list of all of the questions

EcoQuestions = new Mongo.Collection("ecoQuestions");
EcoQuestions.deny({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

// EcoActions

EcoActions = new Mongo.Collection("ecoActions");
EcoActions.deny({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});


MyActions = new Mongo.Collection("myActions");

MyActions.deny({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

MyLocations = new Mongo.Collection("myLocations");

MyLocations.deny({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});


// This is the list of all of the actions based upon a given question, or area

// Feedback data

Feedback = new Mongo.Collection("feedback");
Feedback.deny({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

// This is the SMS data

MyMetrics = new Mongo.Collection("myMetrics");
MyMetrics.deny({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

CategoryUse = new Mongo.Collection("categoryUse");

CategoryUse.deny({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

// These are the list of questions for this organisation to complete

MyQuestions = new Mongo.Collection("myQuestions");
MyQuestions.deny({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

// These are notes that are specific for me

MyActionNotes = new Mongo.Collection("myActionNotes");
MyActionNotes.deny({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

// These are settings about me - my preferences

MySettings = new Mongo.Collection("mySettings");
MySettings.deny({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

// This is reference value information

ReferenceData = new Mongo.Collection("referenceData");
ReferenceData.deny({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

// This is my strategy about energy savings

MyIntents = new Mongo.Collection("myIntents");
MyIntents.deny({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

MyEvents = new Mongo.Collection("myEvents");
MyEvents.deny({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});


// This is a list of organisations

Organisation = new Mongo.Collection("organisation");
Organisation.deny({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

// This is the organisation that i'm assigned to

MyOrganisation = new Mongo.Collection("myOrganisation");
MyOrganisation.deny({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

// These are the list of vendors who you get a bill from

Vendors = new Mongo.Collection("vendor");
Vendors.deny({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

// This is Audit information

AuditInfo = new Mongo.Collection("auditInfo");

AuditInfo.deny({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

UserAudit = new Mongo.Collection("userAudit");

UserAudit.deny({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

MyCategoryUse = new Mongo.Collection("myCategoryUse");

MyCategoryUse.deny({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

MyTargets = new Mongo.Collection("myTargets");

MyTargets.deny({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

MyStaff = new Mongo.Collection("myStaff");

MyStaff.deny({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

// Setup Schemas

/*
var Schemas = {};

Schemas.EcoQuestions = new SimpleSchema({
    greenkpiid: {
        type: String,
        label: "greenkpiid",
        max: 20
    },
    questionText: {
        type: String,
        label: "Question Text"
    },
    greenCategory: {
        type: String,
        label: "Green Category"
    },
    categoryCode: {
        type: String,
        label: 'Category Code'
    },
    subCategoryCode: {
      type: String,
      label: 'Sub Category Code'
    },
    rootCategoryCode: {
      type: String,
      label: 'Root Category'
    },
    startDate: {
      type: Date,
      label: "Start Date",
    },
    createdAt: {
      type: Date,
      label: "Creation Date",
    },
    createdBy: {
      type: String,
      label: "Create by User"
    },
    modifiedAt: {
      type: Date,
      label: "Last Modified Date"
    },
    modifiedBy: {
      type: String,
      label: "Modified by User"
    },
    activeFlag: {
      type: Boolean,
      label: "Active Flag"
    }
});

Schemas.EcoActions = new SimpleSchema({
    questionId: {
        type: String,
        label: "Question Id"
    },
    categoryId: {
      type: String,
      label: "Category Id"
    },
    reportId: {
      type: String,
      label: "Report Id"
    },
    actionText: {
      type: String,
      label: "Action Text"
    },
    createdAt: {
      type: Date,
      label: "Create Date"
    },
    createdBy: {
      type: String,
      label: "Created by"
    },
    modifiedAt: {
      type: Date,
      label: "Last Modified Date"
    },
    modifiedBy: {
      type: String,
      label: "Last Modified by"
    },
    activeFlag: {
      type: Boolean,
      label: "Active Flag"
    }
});
*/
