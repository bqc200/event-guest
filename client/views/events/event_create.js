Template.eventCreate.events({
  'submit form': function(e){
    e.preventDefault();
    
    var event= {
      title: $(e.target).find('[name=title]').val(),
      description: $(e.target).find('[name=description]').val(),
      location: $(e.target).find('[name=location]').val(),
      date: $(e.target).find('[name=date]').val()
    }
    
    Meteor.call('createEvent', event,
      function(error, id){
        if (error)
          return alert(error.reason);
              
        Router.go('eventItem', {_id: id});
      }
    );
  }
});
