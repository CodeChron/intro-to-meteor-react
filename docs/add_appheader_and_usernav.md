# Step 4: Add AppHeader and UserNav
*Get caught up to this step*

- Check out the branch for the previous step: ```git checkout 03-routing``` 

<hr>

_Overview_

In this step, we'll do some basic setup for using React in a Meteor app.


**Add a AppHeader component:**

``` /client/components/layout/AppHeader.jsx: ```

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

**Add the AppHeader component to the App component (```/client/components/App.jsx```):**

```js
...
 <div className="app-container">
    <AppHeader />
  <main className="container">
...

```

You should now see a basic app header in your browser. 

Notice that the AppHeader works "out of the box" because we added a default property. A well-designed component should work even if no props have been passed, OR necessary props should be explicitly required (We'll cover that later in the tutorial.)

**Set the name of the app as a prop of AppHeader:**

```js
...
 <div className="app-container">
  <AppHeader appTitle="Meteor React Todo App" />
 <main className="container">
...
```
Here, by passing in a prop for appTitle, we are overriding default prop we set earlier.

**Add a UserNav to the AppHeader:**

If we recall from our component overview, our App component is our "controller" component for user data and we therefore want to manage our userNav there.

**Add a function for handling display of the UserNav to the App component.**

For now, it will just display links for registering and signing in. Eventually, we'll add a signed in view as well. 

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

**Render the User Nav in the App Component: **

```js
 ...
   <div className="navbar-header">
     <a className="navbar-brand" href="/">{this.props.appTitle}</a>
     </div>
       {this.props.userNav}
     </div>
  ...
 ```

**In your browser, you should now see...**

- Login/Register links in the App header.
- Clicking on the links should display the Login and Register views we created previously.
