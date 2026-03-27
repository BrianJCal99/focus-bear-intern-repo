## Avoiding Code Duplication (DRY Principle)

### What is DRY?

The "Don't Repeat Yourself" (DRY) principle is about reducing repetition in code. Instead of writing the same logic multiple times, you create a single source of truth (like a function or reusable module) and reuse it wherever needed. This makes code easier to maintain and less error-prone.

---

### Example of Duplicated Code (Before Refactoring)

```js
function calculateAreaRectangle(width, height) {
  return width * height;
}

function calculateAreaSquare(side) {
  return side * side;
}

function calculateAreaRoom(width, height) {
  return width * height;
}
```

### Example of DRY Code (After Refactoring)

```js
function calculateArea(width, height) {
  return width * height;
}

function calculateAreaSquare(side) {
  return calculateArea(side, side);
}

function calculateAreaRectangle(width, height) {
  return calculateArea(width, height);
}

function calculateAreaRoom(width, height) {
  return calculateArea(width, height);
}
```

In the refactored version, we have a single `calculateArea` function that handles the logic for calculating the area of rectangles and rooms. The `calculateAreaSquare` function reuses this logic by passing the same value for width and height. This eliminates code duplication and makes it easier to maintain in the future.

### Benefits of Avoiding Code Duplication

1. **Easier Maintenance**: When you need to change the logic, you only have to update it in one place.
2. **Less Error-Prone**: Reduces the chances of introducing bugs when making changes, as you won't forget to update all instances of the duplicated code.
3. **Improved Readability**: It’s easier for developers to understand and follow the code when there’s a single source of truth for a particular logic.
4. **Better Reusability**: Functions or modules that follow the DRY principle can be reused across different parts of the application, promoting code reuse and reducing redundancy.

---

### Reflection

What were the issues with duplicated code?

The main issue with duplicated code is that the same logic exists in multiple places. If a bug is found or a change is needed, it has to be updated everywhere, which increases the risk of missing something. It also makes the code harder to read because similar logic is scattered instead of being centralized. Over time, duplication can lead to inconsistencies if one part is updated and others are not.

How did refactoring improve maintainability?

Refactoring improved maintainability by moving the shared logic into a single function. Now, any changes only need to be made in one place. This reduces the chance of errors and makes the code easier to understand. It also improves readability because the intent of the code is clearer, and functions are more reusable.