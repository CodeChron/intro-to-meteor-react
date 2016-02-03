*Get caught up to this step*
- Check out the branch for the previous step: ```git checkout  10-done-tasks``` 

<hr>

# Step 11: Deleting Tasks

_Overview_

We'll take the same approach as before in adding the delete feature, working from top to bottom. 


## Add db support for deletion

``` /both/collections/Tasks.js: ```

```js
...
Meteor.methods({
...
  '/task/delete': function(id) {
    Tasks.remove({_id: id});
  }
});
```


## Add a delete handler in the controller component

``` /client/views/TasksList.jsx: ```

```js
TasksList = React.createClass({
...
  handleDeleteTask(task) {
    let confirmDelete = confirm("Really delete '" + task.title + "'?");
    if(confirmDelete){
      Meteor.call('/task/delete',task._id, function(err, result) {
        if (err) {
          console.log('there was an error: ' + err.reason);
        };
      });
    }
  },
...

  render() {

    return this.data.subsReady?
      <List
        ...
        canDeleteItem={true}
        handleDeleteItem={this.handleDeleteTask}
        ...
        />
  ...

});
```

```js

List = React.createClass({
  propTypes: {
  ...
    canDeleteItem:    React.PropTypes.bool,
    handleDeleteItem: React.PropTypes.func,
   ...
  },
   getDefaultProps() {
    return {
     ...
      canDeleteItem: false
    };
  },
 ...
});

```


```js
DeleteBtn = React.createClass({
  propTypes: {
    handleDelete:  React.PropTypes.func.isRequired
  },
  getDefaultProps() {
    return {
      title: "Delete"
    };
  },
  render() {
    return <button 
        onClick={this.props.handleDelete}
        className="btn btn-default btn-xs"
        title={this.props.btnTitle}
        alt={this.props.btnTitle}>
        <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
      </button>;   
  }
});
```

```js
ListItem = React.createClass({
...
   displayDeleteBtn(){
    return this.props.canDelete? <span className="pull-right li-option"><DeleteItem handleDelete={this.handleDeleteItem} /></span>: null;
  },
  handleDeleteItem(){
    this.props.handleDeleteItem(this.props.item);
  },
  render(){
    return <li key={this.props.key} className="list-group-item">
             {this.displayDeleteBtn()}
             {this.displayListItem()} 
           </li>;
  }
});
```