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