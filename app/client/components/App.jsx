App = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
   let currentUser;
   const 
        subscription = Meteor.subscribe("userData"),
        subReady = subscription.ready()
   ;

   if (subReady) {
    currentUser = Meteor.user();
   };
   
   return {
      subReady: subReady,
      currentUser: currentUser,
      signedIn: Meteor.user() != null
   }
  },
  showUserNav(){
    let userNavOptions = [
      {
        label: "Sign Out",
        path: "/logout"
      }
    ];

    return this.data.signedIn?
      <Dropdown
        dropDownTitle={this.data.currentUser.emails[0].address}
        dropDownOptions={userNavOptions}
      />
    :
      <ul className="nav navbar-nav navbar-right">
        <li><a href="/login">Login</a></li>
        <li><a href="/register">Register</a></li>
      </ul>
    ;
  },
  render() {

    let footerText = <p>Demo app for <a href="https://github.com/CodeChron/intro-to-meteor-react">Intro to Meteor and React</a>.</p>;

    return this.data.subReady?
      <div className="app-container">
        <AppHeader appTitle="Meteor React Todo App" userNav={this.showUserNav()} />
       <main className="container">
         {this.props.content}
       </main>
       <Footer footerTxt={footerText} />
     </div>
    :
      <Loading />
    ;

  }
});