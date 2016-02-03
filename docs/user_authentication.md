*Get caught up to this step*
- Check out the branch for the previous step: ```git checkout 04-app-header``` 

<hr>

# Step 5: User Authentication

_Add basic login and registration_

### Adding Login/Registration Manually
Meteor comes with a nice package that gives you everything you need for basic Login/Registration.  [Here's how to add it to a React app](https://www.meteor.com/tutorials/react/adding-user-accounts).

However, you are likely to find that you need more control over authentication in your app, and adding it manually is quite straightforward.  Here we'll therefore roll our own authentication.

**Add the Meteor core package for handling authentication via password:**

```meteor add accounts-password```


**Add an Email/Password form component:**

In our Login and Registration forms, we will in both cases be using a form with email and password.  With components, we can help keep our code [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) by using the same component in both forms.

**```/client/components/forms/EmailPasswordForm.jsx: ```** 

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

When using this component, one must provide a handler for the form submit. We therefore defined the "submitAction" prop as required.

We can now use this component in both the Login and Registration forms.


**Add the Registration View:**

``` /client/components/views/Register.jsx ```

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

- Setting a default component property via ```getDefaultProps()```: a link allowing users who already have an account to sign in.  Defining it in this way allows for easier customization.
- Adding a ```createUser()``` function for creating a user based on the values input into our form.  Here, we're using JQuery to get the form input values, though there are many other ways we could have done that (such as [react refs](https://facebook.github.io/react/docs/more-about-refs.html).)
- Finally, we are rendering our form, using some basic Bootstrap markup for styling.

This is a very basic registration form and does not include any form of validation (eg password matching) or security checks you would want in a production app.

**Try Registering**

Now, if you go to ```/register``` you should see the Register view we created. Try registering with an email and password (eg name@example.com and "password")

Meteor will, by default, automatically sign you in when registering.

**View db data on the client**

Install this handy package for viewing/editing data on the client: 

```meteor add msavin:mongol```

Now, use Ctrl + M, and you should see your login info.

<img width="400" alt="screen shot 2016-01-27 at 11 21 49 am" src="https://cloud.githubusercontent.com/assets/819213/12722917/2606bbf6-c8d5-11e5-803b-024f68d7fc59.png">

**Add the Login View**

This should be quite straightforward at this point

``` /client/components/views/Login.jsx: ```

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

Here, instead of creating an account, we are using the [Meteor.loginWithPassword](http://docs.meteor.com/#/full/meteor_loginwithpassword) function.

**View the Login page**

Now, if you go to "/login" you should see the view we just created.  Next, we'll actually display your login info and allow you to sign out.