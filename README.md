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
- Next we're going to add (client-side) routing and create placeholders for the main views (or pages) of the application.  We'll be using [FlowRouter](https://github.com/kadirahq/flow-router#meteor-routing-guide) for our routing, but you may also wish to consider using [react router](https://github.com/thereactivestack/meteor-react-router/). 
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

## Step 4: Add Login View/Basic Authentication
- Meteor comes with a very nice core package that supports everything you need for authentication.  [Here's how to add it to a React app](https://www.meteor.com/tutorials/react/adding-user-accounts).
- However, you are likely to find that you need more control over how authentication works, and adding it manually is quite straightforward.  Here we'll therefore roll our own authentication.
- Add the Meteor core package for handling authentication via password, as well as a very handy package we'll use for viewing data on the client side:  ```meteor add accounts-password msavin:mongol```

### Create the Registration Component
- update ```client/components/views/Register.jsx``` as follows:

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
	  const email = $('#email').val(),
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
          <form onSubmit={this.createUser}>
	          <div className="form-group">
	            <label htmlFor="email">Email:</label>
	            <input placeholder="Email" type="email" id="email" className="form-control"/>
	          </div>
	          <div className="form-group">
	            <label htmlFor="password">Password:</label>
	            <input placeholder="Password" type="password" id="password" className="form-control"/>
	          </div>
	          <div className="form-group">
	            <button type="submit" className="btn btn-primary">Sign In</button>
	          </div>
          </form>
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
- Finally, we are rendering our form, using some basic bootstrap markup for styling purposes.

- Now, if you go to "/login" you should see the Login component we created.
- Try registering with an email and password (eg name@example.com and "password") and then display our db utlity using Ctrl + M, and you should see your login info.


*Get caught up to this step*
- Check out the Step 4 branch: ```git checkout 04-login-auth``` 



### Refactoring our component: Add PageTitle and EmailPasswordForm Component

### Create Login Component

### Add logout
- Add a package we'll use for alerting users they've been signed out:  ```meteor add juliancwirko:s-alert-stackslide```


### Create the Dropdown component and use it as a UserNav in the AppHeader






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

