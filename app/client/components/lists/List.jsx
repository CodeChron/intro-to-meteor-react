List = React.createClass({
  propTypes: {
    collection:       React.PropTypes.array.isRequired,
    canAddItem:         React.PropTypes.bool,
    newItemPlaceholder: React.PropTypes.string,
    handleAddItem:      React.PropTypes.func,
    isCheckList:   React.PropTypes.bool,
    handleCheckbox: React.PropTypes.func
  },
  getDefaultProps() {
    return {
      canAddItem: false
    };
  },
  getCollection(){
    return this.props.collection.map((item) => {
            return <ListItem
              key={item._id}
              item={item}
              {...this.props}
             />;
      // return <li key={item._id} className="list-group-item">
      //         {item.title}
      //         </li>;
    });
  },
  displayAddItemForm(){
    return this.props.canAddItem? 
      <li className="list-group-item">
        <SingleFieldSubmit
          placeholder={this.props.newItemPlaceholder}
          handleInput={this.props.handleAddItem}
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
