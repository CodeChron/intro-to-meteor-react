Hello = React.createClass({
  getInitialState() {
    return {
      counter:0
    };
  },
  handleCounter: function(){
  	this.setState({counter: this.state.counter + 1 });
  },
  render(){
    return (
        <div>
         <h1>React: Welcome to Meteor!</h1>
          <button onClick={this.handleCounter}>Click Me</button>
          <p>You've pressed the button {this.state.counter} times.</p>
        </div>
      )
  }
});
