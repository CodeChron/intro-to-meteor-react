function redirectIfNotSignedIn(context, redirect) {
  AppLibRedirectPath = context.path; 
  var notSignedIn = !Meteor.userId() && !Meteor.loggingIn();
  if (notSignedIn) {
    FlowRouter.go('login');
    sAlert.info("Please sign in to continue.", {effect: 'stackslide', position: 'top-left', timeout: 2500,});
  };
};


FlowRouter.route('/', {
  name: 'home',
  triggersEnter: [redirectIfNotSignedIn],
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

FlowRouter.route('/logout', {
  name: 'logout',
  action: function() {
    Meteor.logout(function(){
      FlowRouter.go('home');
      sAlert.info("You've been signed out.", {effect: 'stackslide', position: 'top-left', timeout: 2000,});
    });
  }
});


FlowRouter.notFound = {
  action: function() {
   FlowRouter.go('home');
  }
};

