Tasks = new Mongo.Collection('tasks');

Meteor.methods({

  '/task/insert': function(title) {
    let taskAttributes = {
      title: title,
      createdAt: new Date(),
      done: false,
      ownerId: Meteor.userId()
    };
    Tasks.insert(taskAttributes);
  },

   '/task/update/title': function(params) {
    let task = Tasks.findOne({_id: params.id });
    Tasks.update(task._id, {
      $set: {
        title: params.title
       }
    });
  },

  '/task/update/done': function(id) {
    let task = Tasks.findOne({_id: id });
    Tasks.update(task._id, {
      $set: {
        done: !task.done
       }
    });
  },

  '/task/delete': function(id) {
    Tasks.remove({_id: id});
  }

});
