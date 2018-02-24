Accounts.emailTemplates.siteName = 'GreenKPI';
Accounts.emailTemplates.from = 'GreenKPI Support <support@greenkpi.com.au>';

Accounts.emailTemplates.enrollAccount.subject = (user) => {
  return `Welcome to GreenKPI, ${user.profile.name}`;
};

Accounts.emailTemplates.enrollAccount.text = (user, url) => {
  return 'You have been selected to participate in building a better future!'
    + ' To activate your account, simply click the link below:\n\n'
    + url;
};

Accounts.emailTemplates.resetPassword.from = () => {
  // Overrides the value set in `Accounts.emailTemplates.from` when resetting
  // passwords.
  return 'GreenKPI Password Reset <support@greenkpi.com.au>';
};
Accounts.emailTemplates.verifyEmail = {
   subject() {
      return "Activate your account now";
   },
   text(user, url) {
      return `${user}! Verify your e-mail by following this link: ${url}`;
   }
};
