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
