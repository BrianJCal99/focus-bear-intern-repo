## Handling Errors & Edge Cases

### Research

Handling errors and edge cases is important to make code more reliable and prevent crashes or unexpected behavior.

Some common strategies:

- **Input validation**: Check if inputs are valid before using them.
- **Guard clauses**: Exit early if conditions are not met to avoid deep nesting.
- **Error handling (try/catch)**: Catch runtime errors and handle them gracefully.
- **Default values**: Provide fallback values when inputs are missing.
- **Fail fast**: Stop execution early when something is wrong.
- **Clear error messages**: Make it easier to debug issues.

---

### Example

**Original Code (poor error handling)**

```js
function calculateDiscount(price, discount) {
  return price - (price * discount);
}
```

### Issues

No validation for price or discount
Can break if inputs are null, undefined, or not numbers
Allows invalid values (e.g. negative discount, discount > 1)

---

### Improvements

**Improved Code (with error handling)**

```js
function calculateDiscount(price, discount) {
  if (typeof price !== "number" || typeof discount !== "number") {
    throw new Error("Price and discount must be numbers");
  }

  if (price < 0) {
    throw new Error("Price cannot be negative");
  }

  if (discount < 0 || discount > 1) {
    throw new Error("Discount must be between 0 and 1");
  }

  return price - (price * discount);
}
```

### Benefits

- Prevents crashes by validating inputs
- Provides clear error messages for debugging
- Ensures function behaves predictably even with bad inputs
- Makes it easier to maintain and extend code in the future

By handling errors and edge cases effectively, we can create more robust and user-friendly applications.

---

### Reflections

What was the issue with the original code?

The original function assumed that inputs would always be correct. It didn’t check for invalid types or values, which could lead to incorrect results or runtime errors. It also didn’t communicate what went wrong when something failed.

How does handling errors improve reliability?

Handling errors makes the code safer and more predictable. It prevents invalid data from being processed and helps catch problems early. This makes debugging easier and reduces the chance of bugs affecting other parts of the system.