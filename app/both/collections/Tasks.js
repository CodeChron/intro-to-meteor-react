Tasks = new Mongo.Collection('tasks');


Meteor.methods({

  '/task/insert': function(title) {
    let taskAttributes = {
      title: title,
      createdAt: new Date(),
      ownerId: Meteor.userId()
    };
    Tasks.insert(taskAttributes);
  }

});

