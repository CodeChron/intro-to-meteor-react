*Get caught up to this step*
- Check out the branch for the previous step: ```git checkout  11-delete-tasks``` 

<hr>

# Step 12: Edit Tasks

_Adding the ability to edit a task_

Let's look at our requirements for this feature:
- Add a edit button that, when clicked on, makes the content of the list item editable.
- Save changes made to the editable content.
- Allow for exiting out of the editable state and returning back to the view state.

As before, we'll take a top-down approach, starting with the database. 


## Database updates
Let's begin by adding a db method for updating the title field of a task:

``` /both/collections/Tasks.js: ```

```js 
Meteor.methods({
  ...
  '/task/update/title': function(params) {
    let task = Tasks.findOne({_id: params.id });
    Tasks.update(task._id, {
      $set: {
        title: params.title
       }
    });
  },
 ...

});
```
## Tasklist (controller) updates

In our TaskList, we'll add a corresponding front-end handler for updating titles. Also, in our List component, we want to pass in props for enabling editing, and for associating our update handler with the list component. 

```js
  handleUpdateTitle(inputValue, id) {
     Meteor.call('/task/update/title', { title: inputValue, id: id }, function(err, result){
       if (err) { console.log('there was an error: ' + err.reason); };
    });
  },
  ...
      <List
      ...
          canEditItem={true}
          handleEditItem={this.handleUpdateTitle}
      ...
        />
```

## List component updates

In the main list component, all we are doing is adding the necessary to props to support this feature, and setting a default value of false.

```js

List = React.createClass({
  //List component API
  propTypes: {
    canEditItem:  React.PropTypes.bool,
    handleEditItem:  React.PropTypes.func,
  },
  getDefaultProps() {
    return {
      ...
      canEditItem:    false,
      ...
    };
  }

```

We actually have one more update to the list component, but this one is somewhat more significant. 

As a component evolves, we are likely to find that we need to sub-divide and refine it into ever smaller and more specific pieces.

## Sub-dividing ListItem into ViewListItem and EditListItem.

Since we now want to allow for editing a list item, this means that a list item now will have two states: a viewing state, and an editing state.

For this reason, we'll want to further refine the list item component hierarchy, creating two new child components of ListItem: ViewItem and EditItem

![list-item-component](https://cloud.githubusercontent.com/assets/819213/12698729/59faf512-c772-11e5-8e0e-64822a8e5b01.png)

Let's first update ListItem and then add the new child components.

## ListItem updates

``` /client/components/lists/listItem/listItem.jsx: ```

```js
  getDefaultProps() {
    return {
      editing: false
    };
  },
  getInitialState() {
    return {
      editing:this.props.editing
    };
  },
  toggleEditing() {
    this.setState({editing: !this.state.editing });
  },
  handleUpdates(inputValue){
    this.props.handleUpdateTitle(inputValue, this.props.item._id);
  },
  displayEditableItem() {
    return this.state.editing?
        <EditItem
        content={this.props.item.title}
        handleDone={this.toggleEditing}
        handleUpdates={this.handleUpdates}
        {...this.props} 
      />
      :
      <ViewItem
      ...
        editItem={this.toggleEditing}  
        {...this.props}  
      />
      ;
...
```

Here, we've added a 'editing' state to ListItem, which we'll use to toggle between viewing and editing an item.

## Adding ViewItem 

``` /client/components/lists/listItem/viewItem.jsx: ```

```js
ViewListItem = React.createClass({
  propTypes: {
    item: React.PropTypes.object.isRequired
  },
  displayTitle(){
    return this.props.isCheckList && this.props.item.done?
        <span className="line-through">{this.props.item.title}</span>
      :
        this.props.item.title
      ;
  },
  displayDeleteBtn(){
    return this.props.canDeleteItem? <span className="pull-right li-option"><IconBtn btnTitle="Delete" btnIcon="glyphicon glyphicon-remove"
      handleClick={this.props.deleteItem} /></span>: null;
  },
  displayEditBtn(){
    return this.props.canEditItem? <span className="pull-right li-option"><IconBtn btnTitle="Edit" btnIcon="glyphicon glyphicon-pencil"
      handleClick={this.props.editItem} /></span>: null;
  },
  displayWithCheckbox(){
     return  <form className="form-inline">
         <div className="checkbox">
           <label>
             <input type="checkbox" checked={this.props.item.done} onChange={this.handleCheckbox} /> {this.displayTitle()}
          </label>
        </div>
      </form>;
  },
  handleCheckbox(e){
    this.props.handleCheckbox(this.props.item);
  },
  displayListItem(){
    return this.props.isCheckList? 
      this.displayWithCheckbox()
      :
        this.displayTitle();
      ;
  },
  render(){
    return <li key={this.props.key} className="list-group-item">
             {this.displayDeleteBtn()}
              {this.displayEditBtn()} 
             {this.displayListItem()} 
           </li>;
  }
});
```
Here, we've moved our display functions from ListItem into ViewItem. We've also added a handler for displaying and edit button. Since we now have multiple buttons, we also took this opportunity to refactor icon buttons into their own component.  Let's add that now:

## Adding the IconBtn component

### IconBtn 
**/client/components/buttons/iconBtn.jsx/:**

```js
IconBtn = React.createClass({
  propTypes: {
    btnIcon: React.PropTypes.string.isRequired,
    btnTitle:  React.PropTypes.string,
    handleClick: React.PropTypes.func.isRequired
  },
  render() {
    return <button 
        onClick={this.props.handleClick}
        className="btn btn-default btn-xs"
        title={this.props.btnTitle}
        alt={this.props.btnTitle}>
        <span className={this.props.btnIcon} aria-hidden="true"></span>
      </button>;   
  }
});
``` 

The purpose of this component is to be used any time have a button with just an icon in it.

Next, let's add what we need for allowing editing of an item:

## Adding EditItem 

```js
EditItem = React.createClass({
  render(){
    return (
       <li key={this.props.item.key} className="list-group-item">
         <span className="pull-right">
           <button className="btn btn-default btn-xs">Done</button>
         </span>
         <AutoSaveInput {...this.props}  />
       </li>
	) 
  }
});
```

While we could have placed the form used for editing of the field, it seems like the need to auto save input will be used elsewhere, so we turned it into a component...

## AutoSaveInput

This component calls a parent function with updated data that has been entered.  We use a throttle function to ensure we aren't hitting the db too frequently.  

```js
AutoSaveInput = React.createClass({
  propTypes: {
    content:        React.PropTypes.string.isRequired,
    handleUpdates:  React.PropTypes.func.isRequired,
    handleDone:     React.PropTypes.func.isRequired,
    autoFocus:      React.PropTypes.bool,
    placeholder:    React.PropTypes.string
  },
  getDefaultProps() {
    return {
      autoFocus: true,
      placeholder: "Edit.."
    };
  },
  getInitialState() {
    return {
      content: this.props.content
    };
  },
  handleOnChange(e){
    const updatedContent = e.target.value;
    const saveInterval = 300;
    this.setState({content: updatedContent});

    this.autoSave = this.autoSave || _.throttle(content => {
      this.props.handleUpdates(content);
    }, saveInterval);

    this.autoSave(updatedContent);

  },

  render() {
    return (

      <form className="form-inline">
       <div className="form-group">
        <input
          className="form-control"
          type="text"
          placeholder={this.props.placeholder}
          value={this.state.content}
          onChange={this.handleOnChange}
          autoFocus={this.props.autoFocus}
          onBlur={this.props.handleDone}
        />
      </div>
      </form>
    )
  }
});
```

Finally, let's add some spacing between buttons in our list item.

### Styling

``` /client/stylesheets/stylesheet.css: ``` 

```css
...
.li-option {
	padding: 0 .25em;
}
```

You should now be able to click on the edit button and edit a task.

View the completed version of this branch:
```git checkout  12--edit-task```

I hope you've enjoyed this tutorial. To learn about updates to the tutorial (eg adding support for Metor 1.3), follow me at [@codechron](https://twitter.com/codechron).

Thanks!