## Reflection

### What was the most challenging part of testing Redux?

The most challenging part of testing Redux for me was understanding how to properly isolate each part of the Redux flow, especially reducers, actions, and async logic like thunks. At first, it was confusing to figure out what exactly I should be testing versus what I should mock. For example, testing reducers was straightforward because they are pure functions, but once async actions were involved, things became more complex. Managing mocked API responses and ensuring the correct sequence of dispatched actions took some trial and error. I also found it tricky to set up a realistic test environment without overcomplicating the test setup, especially when middleware was involved.

### How do Redux tests differ from React component tests?

Redux tests differ from React component tests mainly in their focus and level of abstraction. Redux tests are more logic-oriented, where the goal is to verify that state changes correctly based on dispatched actions. This usually involves testing reducers, action creators, and sometimes the store itself. In contrast, React component tests focus more on user interaction and UI behaviour, checking what is rendered and how the component responds to events. Instead of testing internal logic directly, component tests aim to simulate how a user would interact with the app. Overall, Redux testing feels more like validating data flow and business logic, while React testing is more about ensuring the user experience works as expected.