Session.setDefault('counter', 0);
Meteor.startup(function () {
  ReactDOM.render(<Hello />, document.getElementById("hello"));
});