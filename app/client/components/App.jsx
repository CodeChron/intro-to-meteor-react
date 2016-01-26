App = React.createClass({
  render() {
    return (
      <div className="app-container">
        <AppHeader appTitle="Meteor React Todo App" />
       <main className="container">
         {this.props.content}
       </main>
     </div>
    );
  }
});