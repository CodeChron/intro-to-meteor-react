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