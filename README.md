#Introduction to Meteor and React

<a href="http://intro-to-meteor-react.meteor.com/"><img width="569" alt="finished version of the app" src="https://cloud.githubusercontent.com/assets/819213/12563885/621f61e8-c37a-11e5-95f1-55d2ecb46a08.png"></a>

In this tutorial, we’re going to build a Todo app using Meteor and React.  We'll be taking a somewhat different approach from [the official Meteor React tutorial](https://www.meteor.com/tutorials/react/creating-an-app) and adding a few more bells and whistles along the way.

You can view the finished version of the app at: http://intro-to-meteor-react.meteor.com/

## What you'll learn
_TBD_

##Prerequisites 
- Basic knowledge of HTML, JavaScript, and use of a command line terminal.
- A laptop with a code editor of your choice.  We’ll be using [Sublime Text](http://www.sublimetext.com/3 ).
- Also, be sure to [install Meteor](https://www.meteor.com/install). We’ll be using Mac OSX. However, Meteor is available for Windows and Linux as well.

## Getting Started
Each step in the tutorial has a corresponding branch in the github repo.  I highly recommend that you follow the tutorial instructions and create the app on your own, but if you should get stuck, you can always check out the branch from the previous step to make sure you are on the right track.
 
## Step 1: App Setup
1. Create a project directory and cd into it: ```mkdir meteor_react_app && cd meteor_react_app```
2. _If you are not cloning the tutorial repo, I recommend adding a README file and then initializing your git repo at this point._
3. Create a default Meteor app named ‘app’:  ```meteor create app```
4. Cd into the app directory and run the app: ```cd app && meteor```
5. Open a browser window and enter the URL: http://localhost:3000  You should see the default Meteor app.
6. Leave this window open while building the app. Meteor will auto-refresh as you make changes. I also recommend having the console open in this window.  ([Viewing the console in Chrome](https://developer.chrome.com/devtools/docs/console).)

Why did we go to the trouble of creating a directory and then creating the meteor app inside that directory?  By doing this, it allows us to have additional files that are part of our project (and repo) that are not mixed in with the app files.

*Get caught up to this step*

1. Clone this repo: ```git clone https://github.com/CodeChron/intro-to-meteor-react.git```
2. Cd into the repo: ```cd intro-to-meteor-react```

