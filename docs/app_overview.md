# App Overview (Component Hierarchy)

React uses a hierarchical component architecture.  The React model encourages taking a visual approach to defining your app.  (See [Thinking in React - “Start with a mock”](https://facebook.github.io/react/docs/thinking-in-react.html).) Therefore, let's start with some mockups of the app views we'll be creating.

A key purpose of this exercise is to think about what each component will be responsible for.

## "Controller" Components
A small number of top-level components will be what one can think of as "controller components," meaning they handle getting and updating app data and serve other functions we might associate with a Controller in an MVC model.

Here, the App component and the view-level components serve this function.

![top-hierarchy](https://cloud.githubusercontent.com/assets/819213/12720349/6230ba1c-c8c8-11e5-9726-b1a4b813d0bb.png)

The App component, for example, is responsible for handling User data and rendering an authenticated or anonymous view accordingly.

## "Dumb" components

We want most components to be "dumb," ie they are just recipients of props from parent components and render some UI accordingly.  Any user input they receive is passed up to a parent via a callback for handling.

For example our AppHeader component, as we will see is just a dumb container component and has no other responsibilities.


## A React Component Hierarchy

![components-homepage](https://cloud.githubusercontent.com/assets/819213/12586611/f4755792-c41e-11e5-8e74-4a8f9c90229c.png)

Looking at this component hierarchy, it consists of two controllers, the App and the TaskList Most everything else, as we'll see, is just a recipient of props.