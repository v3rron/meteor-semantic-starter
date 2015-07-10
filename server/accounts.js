// Accounts.config({
//   restrictCreationByEmailDomain: 'school.edu'
// });

ServiceConfiguration.configurations.upsert(
  { service: "facebook" },
  {
    $set: {
      appId: Meteor.settings.serviceConfigurations.facebook.appId,
      secret: Meteor.settings.serviceConfigurations.facebook.secret,
      loginStyle: Meteor.settings.serviceConfigurations.facebook.loginStyle
    }
  }
);

ServiceConfiguration.configurations.upsert(
  { service: "google" },
  {
    $set: {
      clientId: Meteor.settings.serviceConfigurations.google.clientId,
      secret: Meteor.settings.serviceConfigurations.google.secret,
      loginStyle: Meteor.settings.serviceConfigurations.google.loginStyle
    }
  }
);

AccountsMeld.configure({
  askBeforeMeld: false,
  checkForConflictingServices: false,
  meldUserCallback: function(){
    console.log('meldUserCallback');
  },
  meldDBCallback: function(){
    console.log('meldDBCallback');
  },
  serviceAddedCallback: function(){
    console.log('serviceAddedCallback');
  }
});

Meteor.methods({
  googleMapsApiKey: function(){
    return Meteor.settings.serviceConfigurations.google.mapsApiKey;
  }
});

Accounts.onCreateUser(function (options, user) {
  // Google oauth
  if (typeof(user.services.google) !== "undefined") {
    // We still want the default hook's 'profile' behavior.
    var googleService = user.services.google;

    options.profile.first_name = googleService.given_name;
    options.profile.last_name = googleService.family_name;
    options.profile.picture = googleService.picture;
    options.profile.locale = googleService.locale;
    options.profile.gender = googleService.gender;
    // user.emails = [];
    // user.emails.push({address: googleService.email, verified: googleService.email_verified});
    // user.username = googleService.name.replace(/\s+/g, '-').toLowerCase();
    if (options.profile){
      user.profile = options.profile;
    }
  // Facebook oauth
  }else if (typeof(user.services.facebook) !== "undefined") {
    var facebookService = user.services.facebook;

    options.profile.first_name = facebookService.first_name;
    options.profile.last_name = facebookService.last_name;
    options.profile.picture = "http://graph.facebook.com/" + facebookService.id + "/picture/?type=large";
    options.profile.locale = facebookService.locale;
    options.profile.gender = facebookService.gender;
    // user.emails = [];
    // user.emails.push({address: user.services.facebook.email, verified: true});
    // user.username = facebookService.name.replace(/\s+/g, '-').toLowerCase();
    if (options.profile){
      user.profile = options.profile;
    }
  }

  return user;
});
