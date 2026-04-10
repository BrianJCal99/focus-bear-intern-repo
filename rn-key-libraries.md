# Tasks

## Three Libraries – Brief Explanation of Their Purpose

### Redux, Redux-Thunk, Redux-Persist
These libraries work together to manage global state in the app. Redux stores all shared data in a central place, making it easier to manage and access across different components. Redux-Thunk allows asynchronous actions, such as API calls, to be handled before updating the state. Redux-Persist ensures that important data is saved locally so it isn’t lost when the app restarts. Together, they create a more predictable and consistent way of managing data.

### react-native-async-storage/async-storage
This library is used to store small amounts of data locally on the user’s device. It works like a simple key-value storage system and is often used for saving things like user preferences or tokens. I found it useful because it allows the app to remember information even after it is closed, which improves the overall user experience.

### axios, axios-retry
Axios is used to make API requests to fetch or send data, and it simplifies handling responses compared to the native fetch API. Axios-retry adds an extra layer by automatically retrying failed requests, which is helpful when dealing with unstable network connections. This combination improves reliability and reduces the chances of the app failing due to temporary network issues.

## Unfamiliar Library – Redux (Summary of How It Works)

Redux is a state management library that follows a unidirectional data flow. It works using three main parts: the store, actions, and reducers. The store holds the entire application state, actions describe what changes should happen, and reducers update the state based on those actions.

When something happens in the app (like a user pressing a button), an action is dispatched. This action is sent to the reducer, which processes it and returns a new updated state. The store then updates, and any components connected to that state re-render automatically.

At first, Redux felt a bit complex because of the structure and extra setup, but after understanding the flow, it actually makes debugging easier since all state changes are predictable and traceable.

# Reflection

**What is the purpose of Redux-Persist, and why is it useful?**
redux-persist is used to save parts of the Redux state to local storage so that the data is not lost when the app restarts. Without it, every time the user closes the app, the state would reset back to the initial values. I found this especially useful for things like user sessions or preferences, because it creates a smoother experience where users don’t have to log in again or redo settings every time.

**How does react-native-background-fetch differ from a normal timer?**
A normal timer (like setInterval) only works while the app is running in the foreground. In contrast, react-native-background-fetch allows tasks to run even when the app is in the background or closed. This is important for apps like Focus Bear that need to perform scheduled actions (e.g., reminders or syncing data) reliably, even if the user isn’t actively using the app.

**Why does Focus Bear use Auth0 instead of handling authentication manually?**
Using Auth0 simplifies authentication by outsourcing complex and sensitive processes like login, token management, and security. If authentication was handled manually, it would require a lot more effort and introduce higher security risks. Auth0 provides built-in support for things like social logins and secure token handling, which makes development faster and more secure.

**How does PostHog help improve the user experience in Focus Bear?**
PostHog collects analytics data about how users interact with the app, such as which features are used most or where users drop off. This helps developers make informed decisions about improvements. For example, if a feature isn’t being used much, the team can investigate why and make changes to improve usability.

**What’s the difference between Sentry and PostHog, and when would you use each?**
Sentry is mainly used for error tracking and crash reporting, while PostHog is focused on analytics and user behavior. I’d use Sentry when I want to debug issues or monitor app stability, and PostHog when I want to understand how users interact with the app. They complement each other because one focuses on problems, and the other focuses on usage.

**How does react-native-localize work, and how does it interact with i18next?**
react-native-localize detects the user’s device settings, such as language and region. This information is then passed to i18next, which uses it to load the correct translations. Essentially, react-native-localize figures out what language to use, and i18next handles how the content is translated and displayed.

**If you had to remove one library and replace it with an alternative, which one would you choose and why?**
I would consider replacing axios with the native fetch API. While Axios provides useful features like interceptors and automatic JSON parsing, fetch is already built into React Native and reduces dependency on external libraries. With some additional setup, fetch can achieve similar functionality, which could simplify the project and reduce bundle size.