ListItem = React.createClass({
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
    return this.props.canDeleteItem? <span className="pull-right li-option"><DeleteBtn id={this.props.item._id}  {...this.props} /></span>: null;
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
             {this.displayListItem()} 
           </li>;
  }
});