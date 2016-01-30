Login = React.createClass({
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
          <h1>Sign In</h1>
            <EmailPasswordForm
              submitBtnLabel="Sign In"
              submitAction={this.loginWithPassword}
            />
			      {this.props.registerLink}
        </div>
      </div>
		)
	}
});
