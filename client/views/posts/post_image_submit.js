Meteor.subscribe("images");

Template.postImageSubmit.helpers({
  imagesCollection: function() {
    return Images;
  },
  images: function() {
    return Images.find();
  }
});

Template.postImageSubmit.events({
  'change .myFileInput': function(e, tmpl) {
    e.preventDefault();
    FS.Utility.eachFile(e, function(file) {
      Images.insert(file, function (err, fileObj) {
        //Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
        console.log(fileObj._id);
      });
    });
  }
});
