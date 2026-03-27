## Reflection

### When should you use useEffect instead of handling logic inside event handlers?
useEffect should be used when logic needs to run automatically as a side effect of rendering, such as:
- Fetching data when a component mounts
- Subscribing to services (e.g., event listeners, websockets)
- Syncing state with external systems

Event handlers should be used for user-triggered actions (e.g., button clicks). If logic depends on lifecycle or state changes rather than direct user interaction, useEffect is more appropriate.

---

### What happens if you don’t provide a dependency array?
If no dependency array is provided, the useEffect runs after every render. This means:
- The effect will re-run whenever state or props change
- It can easily lead to unnecessary repeated executions
- It may cause infinite loops if the effect updates state

---

### How can improper use of useEffect cause performance issues?
Improper use of useEffect can lead to:
- Unnecessary re-renders if effects run too often
- Expensive operations (like API calls) being triggered repeatedly
- Memory leaks if cleanup functions are missing (e.g., event listeners not removed)
- Infinite loops when state updates inside an effect trigger continuous re-renders

To avoid this:
- Always define the correct dependency array
- Keep effects minimal and focused
- Use cleanup functions when needed