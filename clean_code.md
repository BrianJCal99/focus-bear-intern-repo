# Naming Variables & Functions

## What makes a good variable or function name?

A good variable or function name clearly describes its purpose without needing extra explanation. It should be specific, meaningful, and easy to understand at a glance. For example, using `totalPrice` is much clearer than `tp`, and `calculateTotal()` is better than `doStuff()`.

Good names are also consistent with the rest of the codebase and follow common conventions like camelCase in JavaScript. Function names should usually be verbs because they perform actions, while variable names should be nouns because they store data.

Overall, a good name reduces the need for comments because the code explains itself.

## What issues can arise from poorly named variables?

Poorly named variables can make code confusing and harder to read. If names are too short, vague, or unrelated to what they store, it becomes difficult to understand what the code is doing. This can lead to mistakes, especially when modifying or debugging the code later.

It also slows down development because I (or other developers) have to spend extra time figuring out what each variable means. In team environments, this can cause miscommunication and bugs.

Another issue is that unclear names make the code less maintainable, since future changes become more risky when the intent of the code is not obvious.

## Example of unclear code

```js
function calc(a, b) {
  let x = a * b;
  let y = x * 0.1;
  return x + y;
}
```

In this example, the function name `calc` is too vague, and the variable names `a`, `b`, `x`, and `y` do not provide any context about what they represent. It's unclear what the function is calculating or what the variables are used for.

This code works, but the variable and function names don’t explain what is happening.

## Example of clear code

```js
function calculateTotalWithTax(price, quantity) {
  const subtotal = price * quantity;
  const taxAmount = subtotal * 0.1;
  return subtotal + taxAmount;
}
```

How did refactoring improve code readability?

Refactoring improved readability by making the purpose of each variable and function clear. Instead of guessing what `a`, `b`, or `x` mean, I can now immediately understand that the function calculates a total with tax based on price and quantity.

The new names make the code more self-explanatory, so it’s easier to read, debug, and maintain. It also reduces the need for comments because the intent is already clear from the naming.

Overall, the refactored code is easier to understand and would be much more helpful for someone else (or my future self) to work with.