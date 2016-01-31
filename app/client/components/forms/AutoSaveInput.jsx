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