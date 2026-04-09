# Tasks

**Mocking API Calls in Jest**

Mocking API calls in Jest allows you to simulate server responses without actually making network requests. This makes tests faster, more reliable, and independent of external systems.

**1. Using `jest.fn()`**

`jest.fn()` creates a mock function that you can control. You can specify what it should return when called.

```js
const mockFetch = jest.fn();

mockFetch.mockResolvedValue({
  json: async () => ({ data: "test data" })
});
```

Example usage in a test:

```js
test("fetches data", async () => {
  const fetchData = async () => {
    const res = await mockFetch();
    return res.json();
  };

  const data = await fetchData();

  expect(data).toEqual({ data: "test data" });
  expect(mockFetch).toHaveBeenCalled();
});
```

*Key idea: You manually define what the API should return.*

**2. Using `jest.mock()`**

`jest.mock()` replaces an entire module (like Axios or fetch).

```js
import axios from "axios";

jest.mock("axios");

test("fetches users", async () => {
  axios.get.mockResolvedValue({
    data: [{ id: 1, name: "John" }]
  });

  const fetchUsers = async () => {
    const res = await axios.get("/users");
    return res.data;
  };

  const users = await fetchUsers();

  expect(users).toEqual([{ id: 1, name: "John" }]);
  expect(axios.get).toHaveBeenCalledWith("/users");
});
```
*Key idea: You mock the entire module, so all calls to it are controlled. You replace real API calls with controlled fake responses.*

# Reflection

Why is it important to mock API calls in tests?

Mocking API calls in tests is important because it allows developers to isolate the specific functionality they are testing without relying on external systems. Real API calls can introduce variability due to network latency, server errors, or changing data, which can make tests unreliable and slow. By mocking these calls, tests become deterministic and run consistently regardless of external conditions. This also enables developers to simulate different scenarios, such as successful responses, failures, or edge cases, which may be difficult to reproduce with real APIs. As a result, mocking improves both the reliability and efficiency of the testing process.

What are some common pitfalls when testing asynchronous code?

Testing asynchronous code presents several common challenges. One major pitfall is failing to properly handle promises, such as forgetting to use `async/await` or not returning a promise from the test, which can cause tests to complete before the asynchronous logic finishes executing. Another issue is incorrectly mocking resolved or rejected values, leading to misleading test results. Developers may also neglect to include sufficient assertions, particularly when testing error cases, which can result in false positives. Additionally, not resetting or clearing mocks between tests can cause unintended interactions and unreliable outcomes. These pitfalls can make asynchronous tests difficult to debug and maintain if not handled carefully.
