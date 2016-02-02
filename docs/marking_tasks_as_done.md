*Get caught up to this step*
- Check out the branch for the previous step: ```git checkout  09-view-tasks``` 

<hr>

# Step 10: Mark Tasks As Done

_Adding a checkList feature to the List component and then using it in our TaskList_

A Todo list isn't very useful unless you can mark something as Done. That's what we'll do here.

Here are our requirements for this feature:
- Allow for optionally adding a checkbox to each list item.
- Checking the checkbox should update a corresponding database field associated with the list item.
- Item titles for checked items should have a line-through style applied to them.

Let's implement this feature from the top down, meaning we'll start with the server side/database, then work our way down from the "controller component" through the component hierarchy.

## Add a Done attribute to new Tasks and a Done db handler

Our first step will be to add a Done attribute to Tasks.  Let's add this as a default value when a new Task is created, and an accompanying database method for toggling a task's Done status.

```/both/collections/Tasks.js``` :

```js
Meteor.methods({

  '/task/insert': function(title) {
    let taskAttributes = {
     ...
      done: false,
     ...
    };
    Tasks.insert(taskAttributes);
  },

  '/task/update/done': function(id) {
    let task = Tasks.findOne({_id: id });
    Tasks.update(task._id, {
      $set: {
        done: !task.done
       }
    });
  }

});

```

In the ```/task/insert``` method, we are adding a done default value for new Tasks.  Then, in ```/task/update/done``` we toggle the done status every time the method is called.

## Updates to TasksList
In the TasksList, we'll call our ```/task/update/done``` method with a ```handleDone()``` function, and then add a isCheckList prop to the List component.


```/client/views/TasksList.jsx``` :

```js
TasksList = React.createClass({
...
  handleDone(item) {
    Meteor.call('/task/update/done',item._id, function(err, result) {
      if (err) {
        console.log('there was an error: ' + err.reason);
      };
    });
  },
 showTasks(){
  	return this.data.subsReady?
       <List
        ...
        isCheckList={true}
        handleCheckbox={this.handleDone}
        ...
        />
      :
       <Loading />
      ;
  },
...

});

```

Note the naming of the callback prop vs that of the callback handler: "handleCheckbox" is a generic reference to the event, while "handleDone" is specific to the current feature.

## Updates to the List component

We are making two key updates to  list component:
- Adding new  propTypes for isCheckList and toggleChecked
- moving the list item out of the List component and into its own ListItem component. This is necessary since list items now can have multiple states.

## The propTypes "api"
As we discussed previously, the ```propTypes``` object in a component can be used as a kind of component API. In other words, someone considering using a component should be able to look at the propTypes and understand what features are supported.


**```/client/components/lists/List.jsx```:**

```js
List = React.createClass({
  propTypes: {
    ...
    isCheckList:   React.PropTypes.bool,
    handleCheckbox: React.PropTypes.func
    ...
  },
  getDefaultProps() {
    return {
      ...
      isCheckList: false
      ...
    };
  },
getCollection(){
    return this.props.collection.map((item) => {
      return <ListItem
              key={item._id}
              item={item}
              {...this.props}
             />;
    });
  },
  ...
});
```

### Copy props shorthand
When we added the ListItem component, you might have noticed a new syntax we haven't seen before: ```{...this.props}```

This powerful snippet will copy all the attributes of the parent component (in this case List) into the child component (in this case ListItem). As you create more complex components, this syntax is an invaluable timesaver.  Read more about [transferring props](https://facebook.github.io/react/docs/transferring-props.html).

## The new ListItem component

``` /client/components/lists/ListItem.jsx :``` 

```js
ListItem = React.createClass({
  propTypes: {
    item: React.PropTypes.object.isRequired
  },
  displayWithCheckBox(){
     return  <form className="form-inline">
         <div className="checkbox">
           <label>
             <input type="checkbox" checked={this.props.item.done} onChange={this.handleCheckbox} /> {this.displayTitle()}
          </label>
        </div>
      </form>;
  },
  displayListItem(){
    return this.props.isCheckList?
    this.displayWithCheckBox()
      :
        this.displayTitle();
      ;
  },
  displayTitle(){
    return this.props.isCheckList && this.props.item.done?
        <span className="line-through">{this.props.item.title}</span>
      :
        this.props.item.title
      ;
  },
 handleCheckbox(e){
    this.props.handleCheckbox(this.props.item);
  },
  render(){
    return <li key={this.props.key}   
    className="list-group-item">
      {this.displayListItem()} 
    </li>;
  }
});
```

In the ListItem component, we've added function for displaying a list item with or without a checkbox, and a function for handling a check event.  This function, in turn, calls the handleCheckbox parent prop and passes the current item as an argument.  Since we are using the copy props feature, this now gets passed all the way up to our controller component, where we handle database updates to the given Task.

## Adding a strike-through style for Tasks that are done.

We also added a ```displayTitle()``` function where we add a ```line-through`` style for items that are marked done.

Let's add a snippet of css so that tasks that are marked as done have a strike-through line:

**```/client/stylesheets/stylesheet.css```:** 

```css
.line-through {
	 text-decoration: line-through;
}
```

With this final touch, you should now see checkboxes next to a list item, and when they are checked, a line-through style should be applied. 

We now have a List component that we can turn into a checklist simply by including the prop ```isCheckList={true}``` and a corresponding checkList handler.
