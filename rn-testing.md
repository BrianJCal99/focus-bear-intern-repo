# Tasks

## What's the Difference Between Between Unit, Integration, and End-to-End Testing?

**Unit testing** focuses on testing small, individual parts of the code in isolation, such as a single function or component. The goal is to make sure each piece works correctly on its own without depending on other parts of the system. These tests are usually fast and simple because they don’t involve things like APIs or databases. I’d use unit testing when building features to quickly confirm that each part is working before moving on.

**Integration testing** checks how different parts of the application work together. Instead of testing one piece in isolation, it focuses on whether components interact correctly, such as a form sending data to an API and receiving a response. It’s a bit more complex than unit testing because it involves multiple parts, but it helps catch issues that only appear when things are connected. I’d use this after unit testing to make sure everything works when combined.

**End-to-end (E2E) testing** looks at the entire application from the user’s perspective. It simulates real user actions, like logging in, navigating through screens, and completing tasks, to ensure the whole system works as expected. These tests are slower but more realistic because they cover the full flow of the app. I’d use E2E testing before releasing to make sure the app behaves correctly in real-world scenarios.

## Set up Jest and React Native Testing Library

For this task, I configured a testing environment for a React Native Expo project from scratch. I installed `jest`, `jest-expo`, `@testing-library/react-native`, and `@types/jest`, then wired everything up through the `jest` config in `package.json` using the `jest-expo` preset. I also added `"types": ["jest"]` to `tsconfig.json` so TypeScript recognised `jest` as a global value.

One challenge I ran into was Expo 55's "winter" runtime, which registers global polyfills that are incompatible with Jest's module system. The error would crash the test worker before any tests could run. I fixed it by adding `moduleNameMapper` entries in the jest config to stub out the problematic `expo/src/winter` modules, replacing them with simple no-op mock files.

## Write a Test for a Simple React Native Component

I wrote component tests for `PostsList` in `__tests__/components/PostsList.test.tsx` using React Native Testing Library. The tests cover the main states the component can be in: a loading spinner on mount, posts rendering after a successful fetch, and an error message when the fetch fails. I used `render`, `screen`, `waitFor`, and `fireEvent` from RNTL to interact with and assert on the rendered output.

## Mock API Requests and Test Components with Data Fetching

For this task I worked at two levels. In `__tests__/services/api.test.ts`, I tested the `fetchPosts` function directly by mocking `axios` at the module level. I used `jest.mock` with a factory to return a controlled axios instance, then retrieved the mock via `jest.requireMock` after the module loaded. This let me verify that `fetchPosts` sends the correct `_start` and `_limit` params, returns the response data, and propagates errors correctly.

In the component tests, I mocked the entire `@/services/api` module with `jest.mock('@/services/api')` and controlled what `fetchPosts` returned per test using `mockResolvedValueOnce` and `mockRejectedValue`. This let me test the pagination flow end to end - verifying that pressing "Load 10 more" triggers a second fetch with the right offset and appends the new posts to the list.

# Reflection

## Why is Testing Important in React Native Development?

Before doing this assignment I honestly thought testing was something you only really needed for large production apps. But after going through this I get why it matters even on smaller projects. React Native runs on both iOS and Android, and the same component can behave differently depending on the platform, the device, or even the OS version. Without tests, you're relying entirely on manual testing every time you make a change, which gets tedious and unreliable fast.

What clicked for me was writing the `PostsList` tests. Once those were in place, I could refactor the component - change how pagination worked, update the error handling - and immediately know if I'd broken anything. That feedback loop is way faster than spinning up a simulator every time.

There's also the async side of things. React Native apps talk to APIs constantly, and testing that your component handles loading states, success, and error responses correctly is hard to do manually every time. Tests let you simulate all those scenarios reliably.

## The Difference Between Unit, Integration, and End-to-End Testing

Doing this assignment made these distinctions feel concrete rather than theoretical.

**Unit tests** test one thing in isolation. In my project, the `api.test.ts` file is a unit test - it tests `fetchPosts` on its own, with axios fully mocked out. There's no network, no component, just the function and controlled inputs and outputs.

**Integration tests** test how multiple pieces work together. My `PostsList.test.tsx` is closer to this - it renders the real component, uses the real `useEffect` and state logic, but mocks the API layer. It's testing that the component and its data-fetching logic integrate correctly, without needing a real server.

**End-to-end tests** test the full flow from the user's perspective - real app, real navigation, real API calls (or a staging server). Tools like Detox handle this for React Native. I didn't write E2E tests for this assignment but I understand they sit at the top of the pyramid: slowest to run, hardest to set up, but the closest to real user behaviour.

## How Do You Mock API Calls in Tests?

I used two approaches depending on what I was testing.

When testing the API service itself (`fetchPosts`), I mocked `axios` at the module level using `jest.mock`. I gave `axios.create` a mock return value with a `get: jest.fn()` on it, then retrieved that mock via `jest.requireMock` so I could control what it returned per test. This let me test that `fetchPosts` passes the right params and handles rejections without ever making a real HTTP request.

When testing the `PostsList` component, I mocked the whole `@/services/api` module instead - `jest.mock('@/services/api')`. This is cleaner at the component level because I don't care how the API call is made internally, just what data comes back. I used `mockResolvedValueOnce` to return a fake list of posts and `mockRejectedValue` to simulate a failure, then checked that the component rendered the right thing in each case.
