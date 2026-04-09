# Tasks

## How API calls work in React Native (fetch vs Axios)

In React Native, API calls are used to communicate with external servers to get or send data (like user info, login details, etc.).

There are two main ways to do this:

- **fetch (built-in):**
    - This comes with JavaScript, so no extra installation is needed. It works fine for simple requests, but it can feel a bit basic and requires more manual setup, especially for handling errors and responses.
- **Axios (library):**
    - Axios is a popular external library that makes API calls easier and cleaner. It automatically converts JSON data, has better error handling, and allows features like interceptors (which help manage requests globally).

From what I’ve seen, Axios just feels more structured and easier to manage in larger apps compared to fetch.

## Implement API calls using Axios

I implemented API calls in React Native using Axios to fetch posts from **JSONPlaceholder**. I set up an Axios instance with a base URL and timeout, then built a component that handles loading, error, and success states. I also implemented pagination, loading 10 posts at a time using `_start` and `_limit` query parameters.

To monitor and debug the API calls, I used Expo Network to check the device's network connectivity before making requests. This helped me understand how to handle scenarios where the network might be unavailable and gave me visibility into the connection state during development. It was a useful layer on top of Axios for catching network-related issues early rather than letting them surface as cryptic fetch errors.

Overall, combining Axios for the requests and Expo Network for connectivity awareness gave me a more complete picture of how API communication works in a mobile environment.

## Use Axios-Retry to handle network failures

I integrated axios-retry into the existing Axios setup to automatically handle network failures. I configured it directly on the Axios instance with three retries, exponential backoff using the exponentialDelay helper, and isNetworkOrIdempotentRequestError as the retry condition so it only retries on genuine network errors and safe request types.

The main benefit is that transient failures — like a dropped connection or a momentary server hiccup — are handled automatically without any extra logic in the components. If a request fails, axios-retry quietly retries it before the error ever surfaces to the UI.

This approach significantly improves the user experience by reducing the likelihood of showing error messages for temporary issues, while still ensuring that persistent problems are eventually reported after the retries are exhausted. It’s a great way to add resilience to API calls without complicating the component code.

## Error handling and response caching strategies

When working with APIs, things can go wrong (like no internet or server errors), so handling that properly is important.

**Error handling strategies:**

- Use try/catch blocks to catch failed requests
- Show user-friendly messages instead of crashing the app
- Handle different error types (e.g. network error vs server error)
- Retry failed requests if needed

**Response caching strategies:**

- Store API responses locally (e.g. AsyncStorage) to avoid repeated calls
- Cache frequently used data (like user profile info)
- Use caching libraries or tools to manage this automatically
- Helps improve performance and allows some offline functionality

# Reflection

**Why is Axios preferred over fetch in some cases?**

Axios is preferred because it simplifies a lot of things that fetch makes more manual. For example, Axios automatically handles JSON data, has cleaner syntax, and provides built-in error handling. It also supports features like request/response interceptors, which are really useful in real apps.

From my experience, fetch works fine for small tasks, but Axios is easier to scale when the app gets more complex.

**How does Axios-Retry improve network reliability?**

Axios-Retry helps by automatically retrying failed API requests. This is useful when the failure is temporary, like a weak internet connection or a timeout.

Instead of the app failing immediately, Axios-Retry will try again a few times before giving up. This improves reliability because users are less likely to experience errors from small network issues.

**How would you handle API failures gracefully in a React Native app?**

I would handle API failures by making sure the app doesn’t crash and the user still has a smooth experience.

Some ways I would do this:

- Show a clear error message (instead of technical errors)
- Add retry options so users can try again
- Use loading states so users know something is happening
- Cache important data so the app still works offline or with poor connection
- Log errors for debugging without affecting the user

Overall, the goal is to make the failure feel less frustrating and keep the app usable even when something goes wrong.