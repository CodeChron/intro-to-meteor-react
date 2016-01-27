App = React.createClass({
  showUserNav(){
    return  <ul className="nav navbar-nav navbar-right">
              <li><a href="/login">Login</a></li>
              <li><a href="/register">Register</a></li>
            </ul>;
  },
  render() {
    return (
      <div className="app-container">
        <AppHeader appTitle="Meteor React Todo App" userNav={this.showUserNav()} />
       <main className="container">
         {this.props.content}
       </main>
     </div>
    );
  }
});