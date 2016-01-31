Footer = React.createClass({

render(){
	return <footer className="footer">
      <div className="container">
        {this.props.footerTxt}
      </div>
    </footer>;
}
});