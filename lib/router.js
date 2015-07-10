Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound',
  // loadingTemplate: 'loading',
  waitOn: function() {
    return [
      Meteor.subscribe('users'),
    ];
  }
});

if (Meteor.isClient) {

  Router.plugin('ensureSignedIn', {
    except: ['welcome', 'login', 'register', 'forgotPwd', 'resetPwd', 'verifyEmail', 'resendVerificationEmail']
  });
  Router.onBeforeAction(goToDashboard);

  Router.map(function() {
    this.route('welcome', {
      path: '/'
    });
    this.route('signup', {
      path: '/signup'
    });
    this.route('hello', {
      path: '/hello'
    });
    this.route('stepOne', {
      path: '/step-one'
    });
  });

  function goToDashboard() {
    if (Meteor.user() && !Meteor.user().profile.first_name) {
      Router.go('stepOne');
    }else if(Meteor.user()){
      Router.go('hello');
    }
    this.next();
  }
}
