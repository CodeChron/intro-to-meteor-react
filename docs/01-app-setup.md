# Step 1: App Setup

- Clone the tutorial repo and cd into it: ```git clone https://github.com/CodeChron/intro-to-meteor-react.git```,```cd intro-to-meteor-react```
- _If you are not cloning the tutorial repo, create a meteor app and cd into it:_ ```meteor create meteor-react-intro && cd meteor-react-intro```
- Cd into the ```app``` directory and run the app: ```cd app && meteor```
- Open a browser window and enter the URL: http://localhost:3000 
- You should see the default Meteor app.
- Leave this window open while building the app. Meteor will auto-refresh as you make changes.
- I also recommend having the console open in this window.  ([Viewing the console in Chrome](https://developer.chrome.com/devtools/docs/console).)


## Comparing Blaze and React
When installing a Meteor app, by default it uses [Blaze](https://github.com/meteor/blaze) for handling the view layer.  If you're interested in understanding how Blaze and React differ, [check out this repo](https://github.com/CodeChron/react-v-blaze), in which I've re-created the default Meteor app functionality using React, and then discuss some key differences.