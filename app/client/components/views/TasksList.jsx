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
  handleInsertTask(inputValue) {
  	let taskAttributes = {
      title: inputValue,
      createdAt: new Date(),
      done: false,
      ownerId: Meteor.userId()
    };
    Tasks.insert(taskAttributes);

	   // Meteor.call('/task/insert', inputValue, function(err, result){
	   // 	 if (err) { console.log('there was an error: ' + err.reason); };
    // });
  },
  render() {
    return (
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
           <h1>My Tasks</h1>
    <ul className="list-group">
        <li className="list-group-item editable">
            <SingleFieldSubmit
              placeholder="New task..."
              handleInput={this.handleInsertTask}
             />
        </li>
    </ul>
          </div>
        </div>
      );
  }
});