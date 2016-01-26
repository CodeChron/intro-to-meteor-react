Dropdown = React.createClass({
  getDefaultProps() {
    return {
      dropDownTitle: "Select...",
      dropDownItems: []
    };
  },
  getDropdownItems(){
    return this.props.dropDownItems.map((item, index) => {
      return <li key={index}>
              <a href={item.path}>{item.label}</a>
             </li>;
    });
  },
  render() {
    return  <ul className="nav navbar-nav navbar-right">
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{this.props.dropDownTitle} <span className="caret"></span></a>
                <ul className="dropdown-menu">
                  {this.getDropdownItems()}
                </ul>
              </li>
             </ul>;

  }
});