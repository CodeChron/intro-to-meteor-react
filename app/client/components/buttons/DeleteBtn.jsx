DeleteBtn = React.createClass({
  propTypes: {
    id: React.PropTypes.string.isRequired
  },
  getDefaultProps() {
    return {
      title: "Delete"
    };
  },
  handleDelete(e){
    this.props.handleDelete(this.props.id);
  },
  render() {
    return <button 
        onClick={this.handleDelete}
        className="btn btn-default btn-xs"
        title={this.props.btnTitle}
        alt={this.props.btnTitle}>
        <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
      </button>;   
  }
});