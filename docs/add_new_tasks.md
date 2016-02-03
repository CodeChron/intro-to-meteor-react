*Get caught up to this step*
- Check out the branch for the previous step: ```git checkout  07-task-list``` 


<hr>

# Step 8: Add Tasks

_Add a form for inserting new tasks and remove the insecure package._

Before we start implementing the functionality for adding new task, let's think about the requirements for this feature:

- The insert task form will appear at the top of the tasks list.
- It will accept a single input value, the task title.
- On keyboard return, it will creating a new task, and clear the input field.

This certainly feels like a separate component rather than something specific to a list.  Let's therefore first create this component and then use it in the list.

## Create the SingleFieldSubmit component

Instead of creating something like an AddNewTask component, which would be specific to a Todo list, we instead want to design and name components around a generic usage or behavior. 

Based on the above requirements, let's name the component "SingleFieldSubmit." 

 Add the following file:
 
**```/client/components/forms/SingleFieldSubmit.jsx```**

```js

SingleFieldSubmit = React.createClass({
  propTypes: {
    handleInput: React.PropTypes.func.isRequired
  },
  getDefaultProps() {
    return {
      inputValue:  "",
      placeholder: "New..."
    };
  },
  getInitialState() {
    return {
      inputValue: this.props.inputValue
    };
  },
  updateInputValue(e){
  	this.setState({inputValue: e.target.value});
  },
  handleSubmit(e) {
    e.preventDefault();
    this.props.handleInput(this.state.inputValue.trim());
    this.setState({ inputValue: "" });
  },

  render() {
    return (
      <form className="form-inline" onSubmit={this.handleSubmit}>
       <div className="form-group">
         <input
          className="form-control"
          type="text"
          placeholder={this.props.placeholder}
          value={this.state.inputValue}
          onChange={this.updateInputValue}
        />
        </div>
      </form>
    )
  }
});

```

As we can see, this form requires that we provide a handler for the input value that is submitted.  

## Passing a callback to a parent component

A common challenge for those new to React is understanding how a child component can communicate with a parent component.  Essentially, it is done via a props callback.  In the ```handleSubmit()``` function above, we are calling the function ```handleInput()``` function via props and passing it a value.

Let's see how this works by inserting the component into the TasksList component, which is our "controller" component for this view.

```js
TasksList = React.createClass({
 ...
  handleInsertTask(inputValue) {
  	let taskAttributes = {
      title: inputValue,
      createdAt: new Date()
      ownerId: Meteor.userId()
    };
    Tasks.insert(taskAttributes);

  },
  render() {
    return (
     ...
        <li className="list-group-item editable">
            <SingleFieldSubmit
              placeholder="New task..."
              handleInput={this.handleInsertTask}
             />
        </li>
    ...
      );
  }
});
```

## Generic vs domain-specific
Here, we are connecting "handleInput" (the generic component functionality) with "handleInsertTask" (the domain-specific feature) via the component props.  Then, we can access ```inputValue``` and use it to create a Task.


## Create a task

You should now be able to create a task in the TasksList view.

 If you enter Ctrl + M, we can use our mongol db utility to see our task:

<img width="355" alt="screen shot 2016-01-28 at 1 42 24 pm" src="https://cloud.githubusercontent.com/assets/819213/12655049/0d220a72-c5c5-11e5-9ce5-f21e1a4f27dd.png">

## Prevent db operations directly from the client
Before we move on to the next step, we have one more piece of important housekeeping to take care of.

If you were to open your console, and enter the following, it would actually insert a Task into your database:

<img width="323" alt="screen shot 2016-01-28 at 1 50 38 pm" src="https://cloud.githubusercontent.com/assets/819213/12655330/6c2aa082-c5c6-11e5-9d84-f34dfb1e3933.png">

This, of course, is highly insecure, since you NEVER want to trust the client.  The reason this is possible is because of the [insecure](https://atmospherejs.com/meteor/insecure) package that is included by default when creating a Meteor app. Why?  Because, as we've seen, it's great for getting up and running.  However, let's remove this package and instead move all db operations to the server.

First, remove the package: ```meteor remove insecure```

## Handling db inserts via server methods
Then, update the db insert in "TasksList" to be as follows:

```js
  handleInsertTask(inputValue) {
	   Meteor.call('/task/insert', inputValue, function(err, result){
	   	 if (err) { console.log('there was an error: ' + err.reason); };
    });
  },
```

Here, we are calling a Meteor method that we've named ```/task/insert``` that will only run on the server.

Let's add this method to ```/both/collections/Task.js```:

```js
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

```

Now, we are getting the user id value from the server rather than from the client, which is much more secure.

Try adding a task again, and it should work just like before. Next, we'll update our List to display the tasks we've created.