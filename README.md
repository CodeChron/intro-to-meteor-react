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
- Associate the app component with the placeholder on startup: ```touch client/startup.jsx``

```js
Meteor.startup(function () {
  ReactDOM.render(<App />, document.getElementById("react-root"));
});
```

- You should now see the text '(App Content)' in your browser.


## Step 3:Routing and Main App Views
- Remove the default files: ```rm app*```
- Install the packages we'll need for this step: 
- Add Bootstrap for basic look and feel

## Step 3: Add Routing and Main App Views 
- Add Bootstrap for basic look and feel

## Step 4: Add Login/Authentication
- Sidebar(?): We’ll first look at the default password UI package and then create our own very basic password-based login and registration.
- Why create your own login/authentication? One reason for this is that this gives us much more flexibility in how we handle login.  For example, we may want to redirect a user to a login view if they try to access a restricted page. With the default package, that is not possible. (You’d have to display a message and tell a user to click on sign in.)  Don’t get me wrong, I think the default package is great for quick prototyping, but if you are a building a production app, you will want to create your own custom login. Another reason: the current major custom login package, useraccounts, is still Blaze-based and you have to jump through several hoops to make it work in React.  It is definitely possible, but I’d recommend rolling your own.
- Add app header component with login info
- Add dropdown component 
- Rediret anonymous users accessing the homepage.

##  5: Add data to React components
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

