AppHeader = React.createClass({
  getDefaultProps() {
    return {
      appTitle: "App Title",
      userNav: null
    };
  },
  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">{this.props.appTitle}</a>
          </div>
          {this.props.userNav}
       </div>
     </nav>
    )
  }
});