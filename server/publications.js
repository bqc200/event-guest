Meteor.publish('posts', function() {
  return Posts.find();
});

Meteor.publish('events', function() {
  return Events.find();
});

Meteor.publish("images", function() {
  return Images.find();
});
