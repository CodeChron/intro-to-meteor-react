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
