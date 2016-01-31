SingleFieldSubmit = React.createClass({
  propTypes: {
    handleInput: React.PropTypes.func.isRequired
  },
  getDefaultProps() {
    return {
      inputValue:  "",
      placeholder: "New..."
    };
  },
  getInitialState() {
    return {
      inputValue: this.props.inputValue
    };
  },
  updateInputValue(e){
  	this.setState({inputValue: e.target.value});
  },
  handleSubmit(e) {
    e.preventDefault();
    this.props.handleInput(this.state.inputValue.trim());
    this.setState({ inputValue: "" });
  },

  render() {
    return (
      <form className="form-inline" onSubmit={this.handleSubmit}>
       <div className="form-group">
         <input
          className="form-control full-width"
          type="text"
          placeholder={this.props.placeholder}
          value={this.state.inputValue}
          onChange={this.updateInputValue}
        />
        </div>
      </form>
    )
  }
});