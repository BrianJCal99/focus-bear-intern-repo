## Tasks

### Task 1 – Types of Navigation in React Native

In React Navigation, I learned that there are three main types of navigation.

- **Stack navigation** is like moving forward and backward between screens. For example, going from a home screen to a detail screen, then back again.
- **Tab navigation** is used to switch between main sections of the app using a bottom tab bar. It feels quick and easy because you can jump between screens anytime.
- **Drawer navigation** is a side menu that slides in. It’s usually used for things like settings or profile pages that aren’t needed all the time.

### Task 2 – What I Implemented

For this task, I built a small app that combines stack, drawer, and tab navigation together. (Codebase available on GitHub.)

- I used a stack navigator as the root, which controls main transitions like opening a detail screen or showing a modal.
- Inside the stack, I added a drawer navigator with screens like Home, Settings, and Profile.
- Inside the drawer, I also used a tab navigator for the Home section, with tabs like Home and Explore.

To test navigation:

- I opened the drawer using the menu button
- Switched between tabs at the bottom
- Pressed buttons to push a detail screen and open a modal

This helped me understand how different navigators can be combined in a real app.

### Task 3 – Deep Linking & Navigation State

From my research, deep linking lets the app open directly to a specific screen using a link (like a URL). For example, instead of opening the home screen, it can go straight to a detail page.

I also learned that React Navigation keeps track of everything using a navigation state. This includes:

- which screen you’re currently on
- the history of screens you visited
- any data passed between screens

Each navigator (stack, tab, drawer) manages its own part of this state, which makes the app feel smooth when moving around.

### Task 4 – Navigation Props in Function Components

I learned that navigation is handled using props or hooks in function components.

- Each screen automatically gets a navigation prop, which I can use to move between screens.
- If I’m inside a smaller component, I can use a hook to access navigation instead.
- I can also pass data between screens when navigating, which is useful for things like showing details of a selected item.

From using it, it felt pretty straightforward once I understood how the navigation object works.

## Reflection

In React Native, navigation is a crucial aspect of building mobile applications. It allows users to move between different screens and components seamlessly. There are several libraries available for handling navigation in React Native, with React Navigation being one of the most popular choices.

React Navigation provides a simple and flexible API for managing navigation in React Native apps. It supports various types of navigation, including stack navigation, tab navigation, drawer navigation, and more. This allows developers to create complex navigation structures that suit their app's needs.

**What are the key differences between stack, tab, and drawer navigation?**

The main difference is how users move between screens.

- **Stack navigation** is linear and follows a push/pop pattern. It’s best for flows like moving from a list to a detail screen.
- **Tab navigation** is used for switching between main sections of the app. It keeps screens mounted and preserves state.
- **Drawer navigation** provides a global menu that can be accessed from anywhere, usually for less frequently used screens like settings.

Overall, stack is for flow, tabs are for quick switching, and drawer is for global navigation.

**How does React Navigation handle screen transitions?**

React Navigation handles transitions automatically based on the navigator type.

- **Stack navigator** uses animations like slide (iOS style) or fade (Android style)
- **Modal screens** appear differently (e.g., from bottom)
- **Tab navigation** switches instantly without full screen transitions
- **Drawer navigation** slides in from the side

These transitions are built-in but can also be customized using options like `animation`, `presentation`, and `gestureEnabled`.

**How would you implement deep linking in a React Native app?**

I would implement deep linking by configuring a linking object in the NavigationContainer.

Define a URL scheme (e.g., `myapp://`) and set up a linking configuration that maps URL paths to screens in the app. For example, if I have a detail screen that takes an ID as a parameter, I would map it to a path like `detail/:id`. 

Then, I would pass this linking configuration to the NavigationContainer component. This allows the app to handle incoming URLs and navigate to the appropriate screen based on the URL structure.

Which is useful for things like email links or notifications.