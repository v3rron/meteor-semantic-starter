Template.stepOne.rendered = function () {
  var tmpl = this;
  if(tmpl.find('[data-field=first_name]')){
    tmpl.find('[data-field=first_name]').focus();
  }
  // var tmpl = Template.instance();

  $('.dropdown').dropdown();
};

Template.stepOne.events({
  // Submit Form and Register New User
  'submit form': function(e, tmpl) {
    e.preventDefault();
    var _firstName = tmpl.$('[data-field=first_name]').val();
    var _lastName = tmpl.$('[data-field=last_name]').val();
    var _gender = tmpl.$('[data-field=gender]').val();
    var userData = { "profile.first_name": _firstName, "profile.last_name": _lastName, "profile.gender": _gender };
    Meteor.users.update({ _id: Meteor.userId() }, {$set: userData}, function(error, result){
      if(error){
        console.log(error.message);
      }else{
        console.log('user updated successfully');
      }
    });
  }
});
