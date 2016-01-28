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
