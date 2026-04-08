### Reflection

**How does Metro help in debugging a React Native app?**
Metro plays a key role in debugging because it acts as both the JavaScript bundler and a live feedback system during development. It continuously watches the project files and rebuilds the app whenever changes are made, which allows for fast refresh. This makes debugging much more efficient since you can instantly see the impact of your changes without restarting the app.

In terms of debugging specifically, Metro provides detailed logs directly in the terminal, including errors, warnings, and stack traces. These messages often point to the exact file and line number where an issue occurred, which helps narrow down problems quickly. It also works with the in-app error overlay, which displays runtime errors in a clear and readable format on the device or emulator.

Overall, Metro improves the debugging workflow by giving immediate, real-time feedback and reducing the time between identifying and fixing issues. It essentially acts as the first line of debugging before using more advanced tools.

**What debugging features does Flipper provide?**
Flipper is a powerful debugging platform that was previously the default tool for React Native applications. It provides a more visual and interactive way to debug compared to relying only on console logs. One of its main features is integration with React DevTools, which allows you to inspect the component hierarchy, view props and state, and even modify them in real time. This is especially useful for understanding how data flows through the app and identifying issues related to state management.

Flipper also includes a logs viewer, which presents console logs in a more organised and filterable format than the terminal. Another key feature is the network inspector, where you can monitor API requests, view request/response data, check headers, and identify failed calls. This is extremely helpful when debugging backend integration issues.

In addition, Flipper supports plugins such as layout inspection and performance monitoring. These tools help analyse UI structure and detect performance bottlenecks, which is important for maintaining a smooth user experience.

However, in newer versions of React Native, Flipper is no longer the default debugging tool. It has been largely replaced by built-in React Native DevTools, which provide similar capabilities such as component inspection, profiling, and debugging directly within the development environment. Despite this shift, Flipper is still relevant when working with older projects or when more advanced plugin-based debugging is needed.

**How can you inspect network requests in React Native?**
Network requests in React Native can be inspected using dedicated debugging tools like React Native DevTools or Flipper. In environments where Flipper is available, the network plugin allows you to view all outgoing requests in detail. This includes request URLs, HTTP methods, headers, request bodies, response data, and status codes. It makes it much easier to debug issues such as incorrect endpoints, missing headers, or unexpected API responses.

In more modern setups, React Native DevTools provide similar functionality, allowing developers to monitor network activity alongside component state and performance data. This integration creates a more streamlined debugging experience since everything can be accessed in one place.

Another basic method is using console logs to manually log request and response data. While this can be useful for quick checks, it becomes inefficient and harder to manage in larger applications. Compared to this, tools like Flipper and DevTools provide a much clearer and structured view of network activity.

Being able to inspect network requests is essential when working with APIs, as it helps verify that data is being sent and received correctly, and allows developers to quickly identify and fix issues related to data fetching and backend communication.