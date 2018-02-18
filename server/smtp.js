Meteor.startup(function () {
  process.env.MAIL_URL = 'smtp://52714a7d7b226a45cb12200a64e62ee3:3cd5c65bd4fbf4b6525e736d1d34445e@in-v3.mailjet.com:587';
  process.env.MJ_APIKEY_PUBLIC = "52714a7d7b226a45cb12200a64e62ee3";
  process.env.MJ_APIKEY_PRIVATE = "3cd5c65bd4fbf4b6525e736d1d34445e";

  console.log("publickey=" + process.env.MJ_APIKEY_PUBLIC);
});
