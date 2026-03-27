## Research: Best Practices for Comments and Documentation

- Write comments that explain **why**, not **what** (the code should show what it does).
- Keep comments clear, concise, and up to date.
- Use meaningful naming to reduce the need for comments.
- Document public APIs, functions, and complex logic.
- Avoid redundant or obvious comments.
- Update or remove comments when code changes.

## Example

### Poorly Commented Code

```js
// loop through array
for (let i = 0; i < arr.length; i++) {
  // add numbers
  sum += arr[i];
}
```

### Well Commented Code

```js
// Calculate the total sum of all values in the array
for (let i = 0; i < arr.length; i++) {
  sum += arr[i];
}
```

### Documentation Example

```js
/**
 * Calculates the total sum of all values in the array.
 *
 * @param {number[]} arr - An array of numbers to be summed.
 * @returns {number} The total sum of the array values.
 *
 * @example
 * sumArray([1, 2, 3]); // returns 6
 */
function sumArray(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}
```

### Reflections

When should you add comments?

- When the logic is complex or not immediately obvious.
- To explain the purpose or reasoning behind code decisions.
- When writing functions, APIs, or modules that others will use.
- To clarify edge cases, assumptions, or important constraints.

When should you avoid comments and instead improve the code?

- When comments only repeat what the code already shows.
- When better variable or function names can make the code clearer.
- When the code can be simplified or refactored instead of explained.
- When comments become outdated and misleading.

From my perspective, I found that relying too much on comments can hide poor code quality. It is better to write clean and readable code first, then use comments only where necessary to explain intent.