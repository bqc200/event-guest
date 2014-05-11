Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { 
    Meteor.subscribe('posts');
    Meteor.subscribe('events');
    return;
  }
});

Router.map(function() {
  this.route('home', {path: '/'});
  
  //EVENT Routes
  this.route('eventList', {
    path: '/events',
    data: function() { return Events.find(); }
  });

  this.route('eventCreate', {path:'/new'});

  this.route('eventPage', {
    path: '/events/:_id',
    data: function() { return Events.findOne(this.params._id); }
  });

  this.route('eventEdit', {
    path: '/events/:_id/edit',
    data: function() { return Events.findOne(this.params._id); }
  });
  
  
  //POST Routes

  this.route('postPage', {
    path: '/posts/:_id',
    data: function() { return Posts.findOne(this.params._id); }
  });

  this.route('postEdit', {
    path: '/posts/:_id/edit',
    data: function() { return Posts.findOne(this.params._id); }
  });
  
  this.route('postSubmit', {
    path:'/submit'
  });
  
  this.route('postImageSubmit', {
    path:'/upload',
    data: function() { return Images.find(); }
  });
});

var requireLogin = function (pause) {
  if (! Meteor.user()) {
    if (Meteor.loggingIn())
      this.render(this.loadingTemplate);
    else
      this.render('accessDenied');
    
    pause();
  }
}

Router.onBeforeAction('loading');
Router.onBeforeAction(requireLogin, {only: ['postSubmit','postImageSubmit','eventCreate']});
  
