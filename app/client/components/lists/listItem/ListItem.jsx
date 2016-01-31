ListItem = React.createClass({
  propTypes: {
    item: React.PropTypes.object.isRequired
  },
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
   displayItem() {
    return this.props.canEditItem?
      this.displayEditableItem()
      :
      <ViewListItem
        {...this.props}  deleteItem={this.deleteItem}     
      />
      ;
  },
  deleteItem(){
    this.props.handleDeleteItem(this.props.item);
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
        deleteItem={this.deleteItem}
        editItem={this.toggleEditing}  
        {...this.props}  
      />
      ;
  },
  render(){
     return this.displayItem();
  }
});