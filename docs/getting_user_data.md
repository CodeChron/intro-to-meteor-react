*Get caught up to this step*
- Check out the branch for the previous step: ```git checkout 05-user-auth``` 

<hr>

# Step 6: Getting (User) Data with Publications and Subcriptions

_Add publications and subscriptions for user data, and display a user nav._

As we can see, our app still just displays the Login and Signup links even if we are signed in.  For users who are signed in, let's instead display a dropdown with user info and the ability to sign out.

## Publish user data from the server

In order to do this, we need to get data about the current user from the server.

### Remove Autopublish
By default, Meteor has a package called [autopublish](https://atmospherejs.com/meteor/autopublish) that automatically publishes all data from the server.  Here, we'll remove that package and instead set up actual Publications and Subscriptions so we can understand this core concept.

To remove the package, type ```meteor remove autopublish```

Now, only data which we choose to publish from the server will be accessible by the client. 

**Add a publication:**

Create a 'server' directory in the root of your app directory. Code inside this directory will only be run on the server.

``` /server/publications.js: ```

```js
 Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId});
  } else {
    this.ready();
  }
});
``` 

This will publish data about the current user via the handle "userData" if a signed in user is found


**Add a subscription in a React component:** 

We now need to subscribe to this data on the client. Since we are using React, we will achieve this using the [ReactMeteorData](https://atmospherejs.com/meteor/react-meteor-data) Mixin.

As discussed earlier, the App component will be responsible for getting user data, so let's update that component with the necessary code for handling that:

``` /client/components/App.jsx: ```

```js
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
  
  ...
  
  render() {

    return this.data.subReady?
      <div className="app-container">
        <AppHeader appTitle="Meteor React Todo App" userNav={this.showUserNav()} />
       <main className="container">
         {this.props.content}
       </main>
     </div>
    :
      <div className="app-container">
        Loading...
      </div>
    ;

  }
});

```


**Waiting for subscriptions to be ready**

Here, using ```subscription.ready()``` add a boolean that returns true if the most recent published data for that subscription has been delivered.  Then, we update our render method to display a "Loading..." message while waiting for subscriptions and then displaying the current data.

Including a handler like this is essential when using a Pub/Sub model, since you otherwise run the risk of having data request return a value of undefined.


## Add a Dropdown component (for the UserNav)

Let's update our UserNav to display the data we are subscribing to.  We'll display user info in the form of a dropdown.

We are likely to want to use dropdowns elsewhere in our application, so let's create a general Dropdown component, which we'll then use here.

```/client/components/navigation/Dropdown.jsx: ```

```js
Dropdown = React.createClass({
  propTypes: {
    dropDownOptions: React.PropTypes.array.isRequired
  },
  getDefaultProps() {
    return {
      dropDownTitle: "Select..."
    };
  },
  getDropdownItems(){
    return this.props.dropDownOptions.map((item, index) => {
      return <li key={index}>
                <a href={item.path}>{item.label}</a>
              </li>;
    });
  },
  render() {
    return  <ul className="nav navbar-nav navbar-right">
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{this.props.dropDownTitle} <span className="caret"></span></a>
                <ul className="dropdown-menu">
                  {this.getDropdownItems()}
                </ul>
             </li>
            </ul>;

    }
});
```

**The propTypes "API"**

Note the use of ```  dropDownOptions: React.PropTypes.array.isRequired``` in propTypes.  Think of propTypes as a kind of API for your component. This is where you list what needs to be provided to the component and what optional features it supports.  In our case, for a dropdown to be useful, it needs to have one or more options, so we made an options array required.

## Add User Info to the User Nav

Now, let's make use of our Dropdown as we upate ```showUserNav()``` so that it toggles based on if there is a currentUser or not.

```js
App = React.createClass({
...
    showUserNav(){
    let userNavLinks = [
      {
        label: "Sign Out",
        path: "/logout"
      },
      {
        label: "My Profile",
        path: "/profile"
      }
    ];
    
    return this.data.signedIn?
      <Dropdown
        dropDownTitle={this.data.currentUser.emails[0].address}
        dropDownLinks={userNavLinks}
      />
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
        <AppHeader appTitle="Meteor React Todo App" />
       <main className="container">
         {this.props.content}
       </main>
     </div>
    );
  }
});

```

If you look in your browser, you will now see,  if you are signed in, a dropdown with your email address. Note that we did not touch AppHeader to make these upates.  It simply accepts props.

## Add the ability to sign out
We need to add the "Signout" functionality in the dropdown.  We'll do this by using the "/logout" route to sign users out.

Add the following to the ```/client/routes.jsx``` file:

```js
FlowRouter.route('/logout', {
  name: 'logout',
  action: function() {
    Meteor.logout(function(){
      FlowRouter.go('home');
      sAlert.info("You've been signed out.", {effect: 'stackslide', position: 'top-left', timeout: 2000,});
    });
  }
});
```

**Add alerts:**
Note the reference to "sAlert" which is a widely used [alerts package](https://github.com/juliancwirko/meteor-s-alert) for Meteor, which we'll use to alert the user they've been signed out.

 ```meteor add juliancwirko:s-alert-stackslide```

Update the ```/client/index.html``` file to include a  reference to the package:

```html
<body>
  <div id="react-root"></div>
  {{> sAlert}}
</body>

```

This is an example of how one can include a Blaze package in combination with a React app, by placing it outside the React root placeholder.  It's a bit hacky, but it works.

(Also, note that there is a [React version of this package](https://www.npmjs.com/package/react-s-alert), but integrating it into the current version of Meteor, 1.2.1, is somewhat challenging. However, that may change with the [upcoming version 1.3](https://github.com/meteor/meteor/issues/5788).)

Now, if you try signing out, you should see an alert message displayed.








