ListItem = React.createClass({
  propTypes: {
    item: React.PropTypes.object.isRequired
  },
  displayWithCheckBox(){
     return  <form className="form-inline">
         <div className="checkbox">
           <label>
             <input type="checkbox" checked={this.props.item.done} onChange={this.handleCheckbox} /> {this.props.item.title}
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
    return <li key={this.props.key} className="list-group-item">
             {this.displayListItem()} 
           </li>;
  }
});