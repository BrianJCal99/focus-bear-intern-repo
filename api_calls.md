### Reflection

---

```ts
import axios from "axios";

// Generate a simple request ID
const generateRequestId = () => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
};

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000, // 10 seconds
  headers: {
    accept: "*/*",
  },
});

// REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use(
  (config) => {
    // Attach dynamic request ID
    config.headers["X-Request-ID"] = generateRequestId();

    // Get token from localStorage
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
```

api/axiosInstance.ts — Axios instance with:

- baseURL: https://jsonplaceholder.typicode.com
- Default header: accept: "_/_"
- timeout: 10,000ms (10 seconds)
- Request interceptor that:
  - Dynamically generates and attaches X-Request-ID on every request
  - Reads authToken from localStorage and attaches it as Authorization: Bearer <token> if present
  - Propagates errors via Promise.reject

---

```ts
export const createAbortController = () => {
  const controller = new AbortController();

  return {
    signal: controller.signal,
    cancel: () => controller.abort(),
  };
};
```

api/cancelRequest.ts — createAbortController() utility that wraps AbortController, returning a signal (passed to  
 Axios) and a cancel() function to abort the request.

---

```ts
import axiosInstance from "./axiosInstance";
import { createAbortController } from "./cancelRequest";
export const createUser = async (data: { name: string; email: string }) => {
  const controller = createAbortController();

  try {
    const response = await axiosInstance.post("/users", data, {
      signal: controller.signal,
    });

    console.log("Created user:", response.data);
    return response.data;
  } catch (error: any) {
    // Handle cancellation
    if (error.name === "CanceledError") {
      console.log("Request canceled");
    } else {
      console.error("API Error:", error.response?.data || error.message);

      // Example: redirect if unauthorized
      if (error.response?.status === 401) {
        window.location.href = "/login";
      }
    }

    throw error;
  }
};
```

api/testRequest.ts — createUser() function that:

- POSTs to /users with name and email params
- Passes an AbortController signal for cancellation
- Redirects to /dashboard on 201 Created
- Handles CanceledError (aborted requests) separately from other errors
- Redirects to /login on 401 Unauthorized

---

```ts
import React from "react";
import { createUser } from "api/testRequest";

const TestComponent = () => {
  const handleSubmit = async () => {
    try {
      await createUser({
        name: "John Doe",
        email: "john@example.com",
      });
    } catch (err) {
      console.error("Failed request");
    }
  };

  return (
    <button onClick={handleSubmit}>
      Create User
    </button>
  );
};

export default TestComponent;
```

app/routes/home.tsx — wires it all together with a "Create User" button that calls createUser.

## Reflection

**Why is it useful to create a reusable Axios instance?**
Creating a reusable Axios instance helps centralize configuration like the base URL, headers, and timeout settings. Instead of repeating this setup in every API call, you define it once and reuse it across the app. This improves consistency, reduces duplication, and makes it easier to update things later (for example, changing the API base URL or adding new headers). It also keeps API-related logic organized in one place, which makes the codebase easier to maintain.

**How does intercepting requests help with authentication?**
Request interceptors allow you to automatically attach authentication data (like a token) to every outgoing request. Instead of manually adding the token each time, the interceptor retrieves it (e.g., from local storage) and adds it to the headers. This ensures all protected requests include the correct credentials and reduces the chance of errors. It also makes it easier to update authentication logic globally, such as handling expired tokens or adding additional security headers.

**What happens if an API request times out, and how can you handle it?**
If an API request times out, Axios throws an error indicating that the request took too long and was aborted. This usually happens when the server is slow or unreachable. You can handle this by catching the error and providing feedback to the user (e.g., showing a message like "Request timed out, please try again"). You can also implement retry logic, increase the timeout if appropriate, or cancel the request using AbortController to prevent unnecessary waiting. Proper timeout handling improves user experience and prevents the app from hanging.
