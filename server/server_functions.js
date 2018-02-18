Meteor.methods({
  sendEmail() {

    var emailMessage = {
      "Messages" :[
        {
          "From": {
            "Email": "chris@greenkpi.com.au",
            "Name": "Chris"
          },
          "To": [
            {
              "Email": "roylecj@gmail.com",
              "Name": "Chris"
            }
          ],
          "TemplateID": 317326,
          "TemplateLanguage": true,
          "Subject": "Welcome",
          "Variables": {
        "firstname": "Chris",
        "confirmation_link": "http://localhost:3000/smsEntry"
      }
    }]
    };

    console.log("SENDING EMAIL");

    var authString = process.env.MJ_APIKEY_PUBLIC + ":" + process.env.MJ_APIKEY_PRIVATE;

    var emailString = JSON.stringify(emailMessage);

    console.log("authString = " + authString);

    HTTP.call('POST', 'https://api.mailjet.com/v3.1/send', {
        data: { emailString },
        auth:  authString ,
        headers: {
        'Content-Type': 'application/json',
        'version': 'v3.1'
        }
      }, (error, result) => {
        if (!error) {
          console.log("ERROR SENDING EMAIL" + error)
        }
        console.log("RESULT=" + JSON.stringify(result));
      });

      console.log("SENT");
  },
  updateAccount: function(userName, emailAddress, password) {

    // update the account with the new password

    var userId = Meteor.userId();

    // and updtae their name, and email address.

    Meteor.users.update({_id: userId}, {$set: {profile: {name: userName}, emailAddress: emailAddress}});

    if (! password) {
      // do nothing
    } else {

      if (password !== '') {
        Accounts.setPassword(userId, password, false);
        console.log("password updated");
      }

    }

  },
})
