Schemas.UserProfile = new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    regEx: /^[a-z0-9A-z .]{3,64}$/,
    optional: true
  },
  first_name: {
    type: String,
    label: "First name",
    regEx: /^[a-zA-Z -]{2,32}$/,
    optional: true
  },
  last_name: {
    type: String,
    label: "Last name",
    regEx: /^[a-zA-Z -]{2,32}$/,
    optional: true
  },
  picture: {
    type: String,
    label: "Photo",
    optional: true
  },
  birthdate: {
    type: Date,
    label: "Birthdate",
    optional: true
  },
  gender: {
    type: String,
    label: "Gender",
    allowedValues: GENDER,
    optional: true
  },
  about: {
    type: String,
    label: "About me",
    optional: true
  },
  status: {
    type: String,
    label: "Status",
    optional: true
  },
  active: {
    type: Boolean,
    label: "Active",
    defaultValue: false
  },
  anon: {
    type: Boolean,
    label: "Anonymous",
    defaultValue: true
  },
  banned: {
    type: Boolean,
    label: "Blocked",
    defaultValue: false
  },
  deleted: {
    type: Boolean,
    label: "Deleted",
    defaultValue: false
  },
  locale: {
    type: String,
    label: "Locale",
    regEx: /^[a-zA-Z-_]{2,8}$/,
    defaultValue: 'en'
  },
  location: {
    type: Schemas.Location,
    label: "Location",
    optional: true
  },
});

Schemas.User = new SimpleSchema({
  username: {
    type: String,
    label: "Username",
    regEx: /^[a-z0-9A-Z._-]{3,16}$/,
    optional: true
  },
  emails: {
    type: [Object],
    label: "Emails",
    // this must be optional if you also use other login services like facebook,
    // but if you use only accounts-password, then it can be required
    optional: true
  },
  "emails.$.address": {
    type: String,
    label: "Email address",
    regEx: SimpleSchema.RegEx.Email
  },
  "emails.$.verified": {
    label: "Email verified",
    type: Boolean
  },
  createdAt: {
    type: Date,
    label: "Created at",
    autoValue: function() {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date};
      } else {
        this.unset();
      }
    },
    denyUpdate: true
  },
  updatedAt: {
    type: Date,
    label: "Updated at",
    autoValue: function() {
      return new Date();
    }
  },
  profile: {
    type: Schemas.UserProfile,
    label: "User profile"
  },
  services: {
    type: Object,
    label: "Services",
    optional: true,
    blackbox: true
  },
  roles: {
    type: [String],
    label: "Roles",
    optional: true
  }
});

Meteor.users.after.insert(function(userId, user){
  Roles.addUsersToRoles(user, 'user');
});
Meteor.users.before.update(function (userId, doc, fieldNames, modifier, options) {
  if(_.contains(fieldNames, 'profile') && modifier.$set && modifier.$set['profile.about']){
    // TODO make a helper function removeWhitespace
    modifier.$set['profile.about'] = modifier.$set['profile.about'].replace(/\s{2,}/g, ' ');
  }
});

Meteor.users.attachSchema(Schemas.User);
