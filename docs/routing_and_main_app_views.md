# Step 3: Routing and Main App Views

*Get caught up to this step*
- Check out the branch for the previous step: ```git checkout 02-react-setup``` 

<hr>

*Overview*

Add routing and create placeholders for the main views (or pages) of the application. We'll be using [FlowRouter](https://github.com/kadirahq/flow-router#meteor-routing-guide) for handling routing.


**Add packages for routing, layout, and Bootstrap for basic look and feel:**

```meteor add kadira:flow-router kadira:react-layout twbs:bootstrap```


**Add our "view" components:**

``` /client/views/[Login/Register/TasksList].jsx ``` 


**Add placeholders for each view:** 

```js
[Login/Register/TasksList] = React.createClass({
  render() {
    return <div>[Login/Register/TasksList] view</div>;
  }
});
```

**Add a routing file and routes for each view:** 


``` /client/routes.jsx ```

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

**Add a AppHeader placeholder and a location for main app content (```{this.props.content}```):**

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

**Remove the files we used for the original React setup:**
(they are no longer needed with React-Layout added)
```rm client/index.html rm client/startup.jsx```

**You should now see...**
- "TasksList view" in the browser.
- If you go to "/login" and "/register" you should also see the corresponding view names.
- If you go to any other route, eg "/foo" you will be redirected back to the homepage. (Normally, you might display a "404 - Not Found" page here, but this is a simple way to handle undefined routes.)

