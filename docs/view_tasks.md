*Get caught up to this step*
- Check out the branch for the previous step: ```git checkout  08-new-task``` 
<hr>

# Step 9: Viewing tasks
_Add the ability to view tasks and also explore refactoring opportunities._

## Add the List component

Our tasks currently are handled directly in the TasksList view.  Let's move them into a List component.

```/client/components/lists/List.jsx``` :


```js
List = React.createClass({
  propTypes: {
    collection:              React.PropTypes.array.isRequired,
    canAdd:                  React.PropTypes.bool,
    newItemPlaceholder:      React.PropTypes.string,
    handleAddItem:           React.PropTypes.func
  },
  getDefaultProps() {
    return {
      canAdd: false
    };
  },
  getCollection(){
    return this.props.collection.map((item) => {
      return <li key={item._id} className="list-group-item">
              {item.title}
              </li>;
    });
  },
  displayAddItemForm(){
    return this.props.canAdd? 
      <li className="list-group-item">
        <SingleFieldSubmit
          placeholder={this.props.newItemPlaceholder}
          handleInput={this.props.handleAddItem}
          {...this.props}
        />
      </li>  
     : null;
  },
  render(){
    return (
      <ul className="list-group">
        {this.displayAddItemForm()}
        {this.getCollection()}
      </ul>
    )
  }
});

```

In this new component we are doing the following:
- Defining a collection array as a required prop.
- Making the ability to display an "Add Item" form optional.
- Including functions for generating the list from a collection array and for determining if the Add Item form should be displayed.
- Using the SingleFieldSubmit component we created earlier for adding new items.

## Use the List component

Now, let's use this component in the TasksList view.

```/client/views/TasksList.jsx``` :

```js
TasksList = React.createClass({
...
  showTasks(){
  	return this.data.subsReady?
       <List
          collection={this.data.tasks} 
          handleAddItem={this.handleInsertTask}
          canAdd={true}
          newItemPlaceholder="New Task..."
        />
      :
       <div className="loading">
         Loading...
        </div>
      ;

  },
  render() {

    return (
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
           <h1>My Tasks</h1>
             {this.showTasks()}
          </div>
        </div>
      );
    }
});
```

Here, we've created a new function ```showTasks()``` where we handle display of tasks if subscriptions are ready, and where we use our new List component.  Then, in our ```render()``` method, we simply call this function.


## Refactoring Opportunities

**_Pop quiz: Can you see any refactoring opportunities in the code above?_**

There are at two elements above which we've now used in at least two locations.

Whenever, you are using something more than once in an app, that's a [code smell](https://en.wikipedia.org/wiki/Code_smell) telling you that you should maybe refactor.  In our case, this means turning the duplicated elements into a component.

First, the page title, ie 

```html
<h1>My Tasks</h1>```

We have the identical element (in terms of markup) appear on every view.  This can be turned into a ```<PageTitle />``` component.

Second, the loading message, ie

```html
    <div className="loading">
      Loading...
    </div>
```
Similarly, we've now also used that in a couple locations, and should therefore create a ```<Loading /> component that we can re-use as needed.

(Additionally, we are using the same layout markup in all the views, so that could likely be refactored as well.)

We won't include specific instructions for creating these, but you can see the code for them in the branch for the next step.