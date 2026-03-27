## Reflection

### How does `useMemo` improve performance?
`useMemo` improves performance by memoizing the result of an expensive computation and only recomputing it when its dependencies change. In my implementation, the heavy calculation over a large list only runs when the multiplier changes, not on every re-render. This prevents unnecessary work and keeps the UI responsive, especially when dealing with large datasets or complex calculations.

### When should you avoid using `useMemo`?
`useMemo` should be avoided when the computation is cheap or when there is no noticeable performance issue. It adds extra complexity and memory overhead, so using it unnecessarily can make the code harder to read without real benefits. It’s best used only for expensive operations or when preventing unnecessary re-renders is important.

### What happens if you remove `useMemo` from your implementation?
If `useMemo` is removed, the expensive calculation will run on every render, even when unrelated state (like count) changes. This leads to wasted computation and can slow down the application, especially with large lists. The UI may feel less responsive because the component is doing heavy work more often than needed.