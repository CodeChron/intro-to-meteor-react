App = React.createClass({
  getDefaultProps() {
    return {
      signedIn: false
    };
  },
  getInitialState() {
    return {
      signedIn: this.props.signedIn
    };
  },
  showUserNav(){
    
    let userNavLinks = [
      {
        label: "Sign Out",
        path: "/logout"
      }
    ];

    return this.state.signedIn?
      //Placeholder for a Dropdown with User Info
      <span>User Info</span>
    :
      <ul className="nav navbar-nav navbar-right">
        <li><a href="/login">Login</a></li>
        <li><a href="/register">Register</a></li>
      </ul>
    ;
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