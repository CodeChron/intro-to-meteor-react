TasksList = React.createClass({
	mixins: [ReactMeteorData],
  getMeteorData() {
    const
      subscription = Meteor.subscribe("myTasks"),
      subsReady = subscription.ready()
    ;

    return {
      subsReady: subsReady,
      tasks: Tasks.find({}, {sort: { createdAt: -1 }}).fetch()
    }
  },
  render() {
    return (
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
           <h1>My Tasks</h1>
              <ul className="list-group">
                  <li className="list-group-item editable">
                  Some Task
                  </li>
              </ul>
          </div>
        </div>
      );
  }
});