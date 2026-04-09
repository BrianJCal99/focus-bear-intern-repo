**Tasks**

**How React Testing Library works with Jest**

React Testing Library works alongside Jest by focusing on testing components the way users actually interact with them. Jest acts as the test runner—it runs the tests, provides assertions (like `expect`), and handles things like mocking and test structure. React Testing Library sits on top of that and helps render components into a virtual DOM so we can interact with them.

Instead of testing internal functions or state, React Testing Library encourages testing what appears on the screen. You render a component using `render()`, then use queries like `getByText` or `getByRole` to find elements, just like a user would. From there, you simulate actions like clicking or typing using utilities like `fireEvent` or `userEvent`, and then use Jest assertions to check if the UI updated correctly. Overall, Jest handles the testing framework, while React Testing Library handles how we interact with and inspect the UI.

---

**Reflection** 

**Benefits of using React Testing Library**

One of the biggest benefits is that it focuses on user behaviour instead of implementation details. This means tests are more realistic because they check what the user actually sees and does, rather than things like internal state or specific function calls. Because of that, the tests are less likely to break when you refactor your code. For example, if you change how a component is implemented internally but the UI stays the same, your tests will still pass.

Another benefit is that it encourages better coding practices. Since you're testing from the user’s perspective, it naturally pushes you to build more accessible and well-structured components. It also makes the tests easier to understand, because they read more like real user actions rather than technical steps.

**Challenges when simulating user interaction**

One challenge I ran into was understanding the difference between different query methods, like `getBy`, `queryBy`, and `findBy`. At first, it was confusing when tests failed because I used the wrong one, especially with asynchronous updates.

Another issue was simulating more realistic user interactions. Using basic events like `fireEvent` felt a bit limited, and switching to `userEvent` introduced more complexity because it behaves more like a real user (for example, typing is not instant). This sometimes caused timing issues in tests, especially when components updated asynchronously.

I also found it tricky to debug failing tests, because sometimes the issue wasn’t obvious just from the error message. I had to get used to using tools like `screen.debug()` to see what was actually being rendered. Over time it got easier, but at the start it definitely slowed me down.
