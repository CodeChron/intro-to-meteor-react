#Introduction to Meteor and React

<a href="http://intro-to-meteor-react.meteor.com/"><img width="569" alt="finished version of the app" src="https://cloud.githubusercontent.com/assets/819213/12563885/621f61e8-c37a-11e5-95f1-55d2ecb46a08.png"></a>

In this tutorial, we’re going to build a Todo app using Meteor and React.  We'll be taking a somewhat different approach from [the official Meteor React tutorial](https://www.meteor.com/tutorials/react/creating-an-app) and adding a few more bells and whistles along the way.

You can view the finished version of the app at: http://intro-to-meteor-react.meteor.com/

## What you'll learn
_TBD_

##Prerequisites 
- Basic knowledge of HTML, JavaScript, and use of a command line terminal.
- A laptop with a code editor of your choice.  We’ll be using [Sublime Text](http://www.sublimetext.com/3 ).
- Also, be sure to [install Meteor](https://www.meteor.com/install). We’ll be using Mac OSX. However, Meteor is available for Windows and Linux as well.

## Getting Started
Each step in the tutorial has a corresponding branch in the github repo.  I highly recommend that you follow the tutorial instructions and create the app on your own, but if you should get stuck, you can always check out the branch from the previous step to make sure you are on the right track.
 
## Step 1: App Setup
1. Create a project directory and cd into it: ```mkdir meteor_react_app && cd meteor_react_app```
2. _If you are not cloning the tutorial repo, I recommend adding a README file and then initializing your git repo at this point._
3. Create a default Meteor app named ‘app’:  ```meteor create app```
4. Cd into the app directory and run the app: ```cd app && meteor```
5. Open a browser window and enter the URL: http://localhost:3000  You should see the default Meteor app.
6. Leave this window open while building the app. Meteor will auto-refresh as you make changes. I also recommend having the console open in this window.  ([Viewing the console in Chrome](https://developer.chrome.com/devtools/docs/console).)

Why did we go to the trouble of creating a directory and then creating the meteor app inside that directory?  By doing this, it allows us to have additional files that are part of our project (and repo) that are not mixed in with the app files.

*Get caught up to this step*

1. Clone this repo: ```git clone https://github.com/CodeChron/intro-to-meteor-react.git```
2. Cd into the repo: ```cd intro-to-meteor-react```

##Sidebar: Comparing Blaze and React
When installing a Meteor app, by default it uses [Blaze](https://github.com/meteor/blaze) for handling the view layer.  If you're interested in understanding how Blaze and React differ, [check out this sidebar](https://github.com/CodeChron/react-v-blaze), in which I've re-created the default Meteor app functionality using React, and then discuss some key differences.

## The React Component Hierarchy
React is based on component relationships and hierarchies, and the model encourages taking a visual approach to defining your app.  (See [Thinking in React - “Start with a mock”](https://facebook.github.io/react/docs/thinking-in-react.html).) Therefore, let's start with some mockups of the app views we'll be creating:

![app-views](https://cloud.githubusercontent.com/assets/819213/12585736/57349d88-c41b-11e5-8032-692898d72335.png)

Our app will have three main views: Homepage, login, and registration.  Next, let's look at a possible component hierarchy for one of these views, the homepage:

![components-homepage](https://cloud.githubusercontent.com/assets/819213/12586611/f4755792-c41e-11e5-8e74-4a8f9c90229c.png)

Let's look at some of the major components we've defined here, and their respective responsibilities.

### App Component
- DATA/PARAMS: Users, current route

### App Header
- Just a container

### App Title
- You guessed it, display the app title

### Dropdown
- Display a list of links.
- The instance invoked in the app header will be displaying user actions.

### Tasks List (Homepage)
- This is the "controller" component for the homepage.
- DATA: Tasks
- Handle Tasks CRUD

### Page Title
- Display the page title for a given view.

### List
- Listing items and much more.  This is a rich component, with many (optional) features. We'll discuss it in more detail later.

#### A few things to note about these components
- If possible, we try define components in terms of their abstract UI role or behavior rather than their specific instance usage.  For example, while our "Dropdown" component really is a User Nav in the specific instance where it is used, defining it more abstractly promote designing more reusable components.
- If possible, we try to keep componenents "Dumb" ie they will just accept properties and not really be responsible for handling data, etc.
- Only a small number of components are "controller" components, ie they handle data and events.  I try to limit controllers to be the app-level component and the view-level components.


## Step 2: React Setup 
- In this step, we'll do the basic setup for using React in a Meteor app.
- Install react package: Be sure you are in the app directory, then enter ```meteor add react```
- In the same directory remove the default html/css/js files: ```rm app*```
- Create a client directory (which tells meteor to only use those files on the client side): ```mkdir clients```
- Add a components directory and an index.html file to this directory: ```mkdir client/components```, ```touch client/index.html```
- Add the following placeholder for the React app in the index.html file:
```html
<body>
  <div id="react-root"></div>
</body>
```

- Add the App component (note the jsx extension and title case file name): ```touch client/components/App.jsx```

```js  
App = React.createClass({
  render() {
    return (
      <div className="app-container">
        (App Content)
     </div>
    );
  }
});
```
- Note the use of "className" rather than "class" - this is because JSX is still, in the end, just JavaScript, and "class" is a reserved word.
- Associate the app component with the placeholder on startup: ```touch client/startup.jsx``

```js
Meteor.startup(function () {
  ReactDOM.render(<App />, document.getElementById("react-root"));
});
```

- You should now see the text '(App Content)' in your browser.

*Get caught up to this step*
- Check out the Step 2 branch: ```git checkout 02-react-setup``` 

## Step 3: Routing and Main App Views
- Next we're going to add routing and create placeholders for the main views (or pages) of the application.  We'll be using [FlowRouter](https://github.com/kadirahq/flow-router#meteor-routing-guide) for our routing, but you may also wish to consider using [react router](https://github.com/thereactivestack/meteor-react-router/). 
- Add packages for routing, layout, and Bootstrap for basic look and feel: ```meteor add kadira:flow-router kadira:react-layout twbs:bootstrap```
- Add our "view" components: ```mkdir client/components/views```, ```cd client/components/views```, ```touch Login.jsx Register.jsx Taskslist.jsx```
- Add placeholders to each view: 

```js
[Login/Register/TasksList] = React.createClass({
  render() {
    return <div>[Login/Register/TasksList] view</div>;
  }
});
```
- Cd back to the client dir and add a routing file and routes for each view: ```touch routes.jsx```

```js
FlowRouter.route('/', {
  name: 'home',
  action: function() {
    ReactLayout.render(App, {
      content: <TasksList />
    });
  }
});

FlowRouter.route('/login', {
  name: 'login',
  action: function() {
    ReactLayout.render(App, {
      content: <Login />
    });
  }
});

FlowRouter.route('/register', {
  name: 'register',
  action: function() {
    ReactLayout.render(App, {
      content: <Register />
    });
  }
});

FlowRouter.notFound = {
  action: function() {
   FlowRouter.go('home');
  }
};

```
- Add a AppHeader placeholder and a reference to where content props should be displayed in the app component:

```js 
App = React.createClass({
  render() {
    return (
      <div className="app-container">
        (App Header)
       <main className="container">
         {this.props.content}
       </main>
     </div>
    );
  }
});
```
- Remove the files we used for the original React setup (they are no longer needed with React-Layout added): ```rm client/index.html rm client/startup.jsx```

- You should now see "TasksList view" in the browser.  If you go to "/login" and "/register" you should also see the corresponding view names.  If you go to any other route, eg "/bananas" you will be redirected back to the homepage. (Normally, you might display a "404 - Not Found" page here, but this is a simple way to handle undefined routes.)

*Get caught up to this step*
- Check out the Step 3 branch: ```git checkout 03-routing``` 


## Step 4: Add AppHeader and UserNav

Let's add an AppHeader with a UserNav, so users can view their login info, and/or sign/register.
1. *Add the AppHeader component:*
```/client/components/layout/AppHeader.jsx```:

```js
AppHeader = React.createClass({
  getDefaultProps() {
    return {
      appTitle: "App Title",
      userNav: null
    };
  },
  render() {
    return (
      <nav className="navbar">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">{this.props.appTitle}</a>
          </div>
       </div>
     </nav>
    )
  }
});
```
- Then, insert the AppHeader component into the App component (```/client/components/App.jsx```):

```js
...
 <div className="app-container">
    <AppHeader />
  <main className="container">
...
```
- You should now see a basic app header in your browser.
- Notice that the AppHeader works "out of the box" because we added a default property. _A well-designed component should work even if no props have been passed, OR necessary props should be explicitly required (See below.)_
- *Set the name of the app as a prop of AppHeader:*

```js
...
 <div className="app-container">
  <AppHeader appTitle="Meteor React Todo App" />
 <main className="container">
...
```
- Here, we are passing in the appTitle as a component prop, which overrides the default prop.

- *Add a UserNav to the AppHeader:*  If we recall from our component overview, our App component is our "controller" component for user data and we therefore want to manage our UserNave there, while keeping the AppHeader component a "dumb" recipient of whatever props are passed to it.
- Add a function for showing the UserNav to the App component.  For now, it will just display links for registering and signing in. Also, add a "userNav" property to the AppHeader where we make the return value of this function available to the AppHeader component.

```js
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

```

- Now in the AppHeader component, let's render "userNav":

```js
 ...
   <div className="navbar-header">
     <a className="navbar-brand" href="/">{this.props.appTitle}</a>
     </div>
       {this.props.userNav}
     </div>
  ...
 ```

- In your browser, you should now see Login/Register links in the App header.  Clicking on the links should display the Login and Register views we created previously.

*Get caught up to this step*
- Check out the Step 4 branch: ```git checkout 04-app-header``` 

## Step 5: User Authentication

- Meteor comes with a nice package that gives you everything you need for basic Login/Registration.  [Here's how to add it to a React app](https://www.meteor.com/tutorials/react/adding-user-accounts).
- However, you are likely to find that you need more control over authentication in your app, and adding it manually is quite straightforward.  Here we'll therefore roll our own authentication.
- Add the Meteor core package for handling authentication via password, as well as a handy package we'll use for viewing/editing data on the client: ```meteor add accounts-password msavin:mongol```
- *Add an Email/Password form:* In our Logina and Registration forms, we will in both cases be using a form with email and password.  With components, we can help keep our code DRY and use the same component for both forms.
- Create the file  ```client/components/forms/EmailPasswordForm.jsx``` and add this code:

```js
EmailPasswordForm = React.createClass({
  propTypes: {
    submitAction: React.PropTypes.func.isRequired
  },
  getDefaultProps() {
    return {
      submitBtnLabel: "Submit"
    };
  },
  render() {
    return (
      <form onSubmit={this.props.submitAction}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input placeholder="Email" type="email" id="email" className="form-control"/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input placeholder="Password" type="password" id="password" className="form-control"/>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">{this.props.submitBtnLabel}</button>
        </div>
      </form>
    )
  },
}); 
```

- When using this component, one must provide a handler for the form submit. We therefore defined the "submitAction" prop as required:

```js
  propTypes: {
    submitAction: React.PropTypes.func.isRequired
  },
```

We can now use this component in both the Login and Registration forms:
- *Create the Registration View:* update ```client/components/views/Register.jsx``` as follows:

```js
Register = React.createClass({
  getDefaultProps() {
    let loginMsg = "Already have an account?";
    return {
      loginLink: <p>{loginMsg} <a href="/login">Sign In</a></p>
    };
  },
  createUser(e) {
    e.preventDefault();
    const
      email = $('#email').val(),
      password = $('#password').val().trim()
    ;

    Accounts.createUser(
      {
        email: email,
        password: password
      },
      function(error) {
        if (error) {
          console.log("there was an error: " + error.reason);
        } else { 
          FlowRouter.go('home');
        };
      }
    );
  },
  render() {
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <h1>Register</h1>
            <EmailPasswordForm
              submitBtnLabel="Register"
              submitAction={this.createUser}
            />
	 {this.props.loginLink}
        </div>
      </div>
    )
  }
});

```

Here, we added the following:

- Setting a default component property: a link allowing users who already have an account to sign in.  Defining it in this way allows for easier customization.
- Adding a function for creating a user based on the values input into our form.  In this approach, we are using JQuery to get the form input values, though there are many other ways we could have done that (such as [react refs](https://facebook.github.io/react/docs/more-about-refs.html).) Note that this is a very basic registration form and does not include any form of validation (eg password matching) or security checks you would want in a production app.
- Finally, we are rendering our form, using some basic Bootstrap markup for styling.
- Now, if you go to "/register" you should see the Register "view" component we created.
- Try registering with an email and password (eg name@example.com and "password")
- Meteor will, by default, automatically sign you in when registering. Display our db utlity using Ctrl + M, and you should see your login info.

<img width="522" alt="screen shot 2016-01-27 at 11 21 49 am" src="https://cloud.githubusercontent.com/assets/819213/12619941/40250ae2-c4e8-11e5-8a1e-3ff6caa0d74c.png">

Let's now also add our Login view, which is quite straightforward at this point. Update ```client/components/views/Login.jsx``` as follows:

```js
Register = React.createClass({
  getDefaultProps() {
    let registerMsg = "Don't have an account?";
    return {
      registerLink: <p>{registerMsg} <a href="/register">Register</a></p>
    };
  },
  loginWithPassword(e) {
    e.preventDefault();
    const email = $('#email').val(),
          password = $('#password').val().trim()
    ;

    Meteor.loginWithPassword(email, password, function(error) {
      if (error) {
        console.log("There was an error:" + error.reason);
      } else {
        FlowRouter.go('/');
      }
    });
  }, 
  render() {
		return (
			<div className="row">
        <div className="col-md-6 col-md-offset-3">
          <h1>Register</h1>
            <EmailPasswordForm
              submitBtnLabel="Register"
              submitAction={this.createUser}
            />
			      {this.props.loginLink}
        </div>
      </div>
		)
	}
});
```
- Here, instead of creating an account, we are using the [Meteor.loginWithPassword](http://docs.meteor.com/#/full/meteor_loginwithpassword) function.

*Get caught up to this step*
- Check out the Step 5 branch: ```git checkout 05-user-auth``` 

## Step 6: Getting (User) Data with Publications and Subcriptions
- As we can see, our app still just displays the login and signup links even if we are signed in.  Let's instead a dropdown with user info and the ability to sign out, for users who are signed in.
- In order to do this, we need to get data about the current user from the server.  By default, Meteor has a package called [autopublish](https://atmospherejs.com/meteor/autopublish) that automatically publishes all data from the server.  Here, we'll remove that package and instead set up actual Publications and Subscriptions so we can understand this core concept.
- *Remove autopublish:* Let's begin by removing the autopublish package: ```meteor remove autopublish```
- *Publish data from the server:* Only data which we choose to publish from the server will be accessible by the client.
- *Add server side code:* This can be achieved by simply creating a 'server' directory: ```mkdir server``` Code inside this directory will only be run on the server.
- *Add a user data publication:*  Create the file ```server/publications.js``` and add the following code:

```js
 Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId});
  } else {
    this.ready();
  }
});
``` 

- This code will make available user data for the current user via the subscription handle "userData".
- *Get Meteor data in a React component via a subscription:*  We now need to subcribe to this data on the client. Since we are using React, we will achieve this using the [ReactMeteorData](https://atmospherejs.com/meteor/react-meteor-data) Mixin.
- As mentioned earlier, the App component will be repsonsible for getting user data, so let's update that component with the necessary code for handling that:
- INSERT CODE INTO APP.JSX JUST FOR GETTING DATA AND HANDLING SUBS READY
- [What we did here, including waiting for subs ready]

- [Add Dropdown]

- *Create a Dropdown component* that we can then user for our UserNav.
- Add the file ```/client/components/navigation/Dropdown.jsx``` with the following code:

```js
Dropdown = React.createClass({
  getDefaultProps() {
    return {
      dropDownTitle: "Select...",
      dropDownItems: []
    };
  },
  getDropdownItems(){
    return this.props.dropDownItems.map((item, index) => {
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

- Note the use of ```  dropDownOptions: React.PropTypes.array.isRequired``` in propTypes. If no dropDownOptions are provided, you'll get an error in the console.

- [UPDATE SHOW USERNAV] Now, let's upate showUserNav so that it toggles based on if there is a currentUser or not.

```js
App = React.createClass({
...
  mixins: [ReactMeteorData],
  getMeteorData() {
    let userDataSubscription = Meteor.subscribe("userData"),
        currentUser = Meteor.user()
    ;
	
   return {
      currentUser: currentUser,
      signedIn: Meteor.user() != null
   }

  },
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
        dropDownTitle={this.data.currentUser.profile.email}
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

- Here, we've updated the showUSernav function. If you look in your browser, you will now see a dropdown if you are signed in.  Note that we did not touch AppHeader to make these upates.  It simply accepts props.


### Refactoring our component: Add PageTitle and EmailPasswordForm Component

### Create Login Component

### Add logout
- Add a package we'll use for alerting users they've been signed out:  ```meteor add juliancwirko:s-alert-stackslide```



- Why create your own login/authentication? One reason for this is that this gives us much more flexibility in how we handle login.  For example, we may want to redirect a user to a login view if they try to access a restricted page. With the default package, that is not possible. (You’d have to display a message and tell a user to click on sign in.)  Don’t get me wrong, I think the default package is great for quick prototyping, but if you are a building a production app, you will want to create your own custom login. Another reason: the current major custom login package, useraccounts, is still Blaze-based and you have to jump through several hoops to make it work in React.  It is definitely possible, but I’d recommend rolling your own.
- Add app header component with login info
- Add dropdown component 
- Rediret anonymous users accessing the homepage.

##  5: Add Data
- Let’s create a Tasks collection and then display the data in that collection in the app.
- Add the Mongo Collection
- Add the React Mixin to our TasksList controller component
- Create a basic list component
- Use the faker package to generate dummy data
- Create a basic list and display the data 
 
## 6: Publications and Subscriptions
- Explain subscription here instead of in the intro? Blog post?
- Turn off autopublish
- Add publish and subscribe
- Why no data?
- Wait for subscriptions to be ready?
- Ok, data is displaying but we want to be able to allow the user to create and manage their own tasks.  For that, we need a full-featured component that can support all this.

## 7: Create, Edit, and Delete

