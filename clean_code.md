## Writing Unit Tests for Clean Code

### Importance of Unit Testing

Unit testing is important because it helps make sure each part of the code works correctly on its own. It improves reliability by catching bugs early before they become bigger issues. It also makes it easier to refactor code, since tests can confirm that changes did not break existing functionality. Overall, unit tests support clean code by enforcing structure and encouraging simpler, more modular functions.

### Testing Framework

I used Jest for JavaScript. It is easy to set up and provides clear syntax for writing and running tests.

### Example Function

```js
function divide(a, b) {
  return a / b;
}
```

### Unit Tests

```js
test("divides two numbers correctly", () => {
  expect(divide(10, 2)).toBe(5);
});

test("returns Infinity when dividing by zero", () => {
  expect(divide(10, 0)).toBe(Infinity);
});

test("handles negative numbers", () => {
  expect(divide(-10, 2)).toBe(-5);
});
```
### Reflections

Unit tests help keep code clean because they force me to think about edge cases and expected behavior before writing or changing code. This leads to better function design and clearer logic. They also make it easier to maintain code since I can quickly verify if something breaks.

While testing, I found that the function did not properly handle invalid inputs like strings or null values. This showed me that the function needed better validation. Writing tests helped reveal these weaknesses and made the code more robust.