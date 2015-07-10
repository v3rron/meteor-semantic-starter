var myLogoutFunc = function(){
  console.log('You have been logged out');
  Router.go('/');
};

AccountsTemplates.configure({
  hideSignInLink: true,
  hideSignUpLink: true,
  showAddRemoveServices: true,
  showForgotPasswordLink: true,
  showLabels: true,
  showPlaceholders: true,
  confirmPassword: false,
  enablePasswordChange: true,
  // Privacy Policy and Terms of Use
  privacyUrl: 'privacy',
  termsUrl: 'terms-of-use',

  // Redirects
  homeRoutePath: '/',
  onLogoutHook: myLogoutFunc,
});

// AccountsTemplates.addFields([
// {
//   _id: 'first_name',
//   type: 'text',
//   displayName: "First Name",
//   required: true
// },
// {
//   _id: 'last_name',
//   type: 'text',
//   displayName: "Last Name",
//   required: true
// },
// {
//   _id: "gender",
//   type: "select",
//   displayName: "Gender",
//   select: [
//     {
//         text: "Male",
//         value: "male",
//     },
//     {
//         text: "Female",
//         value: "female",
//     },
//   ],
// }
// ]);

AccountsTemplates.configureRoute('signIn', {
  name: 'login',
  path: '/login',
  template: 'login'
});
AccountsTemplates.configureRoute('signUp', {
  name: 'register',
  path: '/register',
  template: 'register'
});
AccountsTemplates.configureRoute('forgotPwd', {
  name: 'forgotPwd',
});
AccountsTemplates.configureRoute('changePwd', {
  name: 'changePwd',
});
AccountsTemplates.configureRoute('resetPwd', {
  name: 'resetPwd',
});
AccountsTemplates.configureRoute('verifyEmail', {
  name: 'verifyEmail'
});
AccountsTemplates.configureRoute('resendVerificationEmail', {
  name: 'resendVerificationEmail'
});
AccountsTemplates.configureRoute('enrollAccount', {
  name: 'enrollAccount'
});
