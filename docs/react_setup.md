# Step 2: React Setup

*Get caught up to this step*

1. Clone this repo: ```git clone https://github.com/CodeChron/intro-to-meteor-react.git```
2. Cd into the repo: ```cd intro-to-meteor-react```

<hr>

_Overview_

In this step, we'll do some basic setup for using React in a Meteor app.


- **Install the react package:** Be sure you are in the app directory, then enter ```meteor add react```
- **Remove the default html/css/js files:** ```rm app*```
- **Create a 'client' directory. This one of Meteor's [special directories](http://docs.meteor.com/#/full/structuringyourapp). Files in this directory will only be available to the client:** ```mkdir clients```
- **Add a components directory:** ```mkdir client/components```
- **Add an index file with a placeholder for the React app:** 

**```/client/index.html```** :

```html
  <body>
    <div id="react-root"></div>
  </body>
```

**Add an App component:**

**```/client/components/App.jsx```** :

(Note the 'jsx' extension and title case file name.)

```js  
App = React.createClass({
  render() {
    return (
      <div className="app-container">
        (App Content)
     </div>
    );
  }
});
```
Note the use of ```className``` rather than ```class```.  This is because JSX is, in the end, still just JavaScript, and ```class``` is a [reserved word](http://www.w3schools.com/js/js_reserved.asp).

**Associate the App component with the placeholder on startup:**  

**```/client/startup.jsx```**

```js
Meteor.startup(function () {
  ReactDOM.render(<App />, document.getElementById("react-root"));
});
```

You should now see the text '(App Content)' in your browser.
