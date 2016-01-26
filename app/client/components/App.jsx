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