DeleteBtn = React.createClass({
  propTypes: {
    handleDelete:    React.PropTypes.func.isRequired
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