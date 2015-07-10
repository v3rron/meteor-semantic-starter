Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.users.find(this.userId, 
      { fields: {
        emails: 1,
        username: 1,
        profile: 1,
        services: 1,
        createdAt: 1,
        updatedAt: 1
      }
    });
  } else {
    this.ready();
  }
});

Meteor.publish("users", function () {
  return Meteor.users.find({}, {fields: {emails: 1, username: 1, profile: 1}});
});
