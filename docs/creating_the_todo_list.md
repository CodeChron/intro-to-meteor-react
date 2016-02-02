*Get caught up to this step*
- Check out the branch for the previous step: ```git checkout  06-user-data``` 

<hr>

# Step 7: Creating the Todo List

_Create a Tasks collection, add associated Pub/Sub, and stub out a MyTasks page._


We are now ready to start work on the main feature of the app, the Todo list.

We'll approach creating this feature as follows:

1. Add a "Tasks" db collection for storing todo items.
2. Publish and subscribe to Tasks only for a specific user.
3. Generate some dummy tasks to work with.
4. Create a bare-bones List component for viewing tasks.
5. Add the ability to insert new tasks directly in the Tasks List.
6. Add the ability to mark tasks as Done.
6. Add remaining Tasks CRUD (Edit, Delete.)

## Add a Tasks Collection

Meteor currently only provides official support for the [MongoDB](https://www.mongodb.org/) database.  Let's create a Tasks collection for storing our Todo list items.

```/both/collections/Tasks.js: ```

```js
Tasks = new Mongo.Collection('tasks');
```

This is all that is needed to create a Tasks collection.  Later, we'll add db operations methods to this file, such as for inserting new tasks.


**The 'both' directory**
We can use the "both" directory to indicate that the contents is available on both the client and server. This is inferred by the fact that the files are _not_ in the client or server directories.

## Publish and subscribe to "My Tasks"

Now, let's publish only tasks that belong to a specific user and then add the corresponding subscription.

Add this to the file ```/server/publications.js```:

```js
...

Meteor.publish("myTasks", function () {
    return Tasks.find({ ownerId: this.userId });
});

```

Here, we publish only tasks that match the id of the currently signed in user, hence the handle "myTasks"

## Add a tasks subscription to the Task list:

```/client/components/views/TasksList.jsx```:

```js
...
mixins: [ReactMeteorData],
  getMeteorData() {
    const
      subscription = Meteor.subscribe("myTasks"),
      subsReady = subscription.ready()
    ;

    return {
      subsReady: subsReady,
      tasks: Tasks.find({}, {sort: { createdAt: -1 }}).fetch()
    }
  },
  ...
  
  ```

## Stub out the "My Tasks" List

On the "My Tasks" page, we want to display a "My Tasks" Heading and a task list below.  Let's begin by stubbing up the basic structure.

Update the ```render()``` method of  to be as follows:

``` /client/components/views/TasksList.jsx: ```

```js
  ...
  render(){
    return (
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
           <h1>My Tasks</h1>
              <ul className="list-group">
                  <li className="list-group-item editable">
                  Some Task
                  </li>
              </ul>
          </div>
        </div>
      );
    }
```

This gives us a good starting point for building our List component.

## Redirect anonymous users to the login page

Since we now are creating a view with _My_ tasks on it, we only want those tasks to be displayed for the actual owner of the tasks.  Let's therefore redirect users who go to the homepage but are not signed in, to the login page. 

We can do this with a "before hook" in our router, ie a function that runs before a given route action runs.

**```/client/routes.jsx```:**

```js
function redirectIfNotSignedIn(context, redirect) {
  AppLibRedirectPath = context.path; 
  var notSignedIn = !Meteor.userId() && !Meteor.loggingIn();
  if (notSignedIn) {
    FlowRouter.go('login');
    sAlert.info("Please sign in to continue.", {effect: 'stackslide', position: 'top-left', timeout: 2500,});
  };
};
...

FlowRouter.route('/', {
  ...
  triggersEnter: [redirectIfNotSignedIn],
  ...
  }
});

...
```

Now, if you open an anonymous browser window and try going to http://localhost:3000, you'll be redirected to the login view.