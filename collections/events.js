Events = new Meteor.Collection('events');

Events.allow({
  update: ownsDocument,
  remove: ownsDocument
});


Events.deny({
  update: function(userId, event, fieldNames) {
    return (_.without(fieldNames, 'title', 'location', 'description').length > 0);
  }
});


Meteor.methods({
  createEvent: function(eventAttributes) {
    var user = Meteor.user()
        
    //ensure user is logged-in
    if (!user)
      throw new Meteor.Error(401, "You need to login to post new event");
    
    //ensure post has a title
    if (!eventAttributes.title)
      throw new Meteor.Error(422, "Please fill in a title");
    
    //pick out the whitelisted keys
    var event = _.extend(_.pick(eventAttributes, 'title', 'location', 'date', 'description'), {
      userId: user._id,
      organizer: user.username,
      submitted: new Date().getTime()
    });
      
    var eventId = Events.insert(event);
    
    return eventId;
   }
  });
