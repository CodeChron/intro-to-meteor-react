PageTitle = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired
  },

  render() {
    return  <h1>{this.props.title}</h1>;
  }
});