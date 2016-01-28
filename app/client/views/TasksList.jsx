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
	   Meteor.call('/task/insert', inputValue, function(err, result){
	   	 if (err) { console.log('there was an error: ' + err.reason); };
    });
  },
  showTasks(){
  	return this.data.subsReady?
       <List
          collection={this.data.tasks} 
          handleAddItem={this.handleInsertTask}
          canAdd={true}
          newItemPlaceholder="New Task..."
        />
      :
       <Loading />
      ;

  },
  render() {

    return (
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <PageTitle title="My Tasks" />
             {this.showTasks()}
          </div>
        </div>
      );
    }
});