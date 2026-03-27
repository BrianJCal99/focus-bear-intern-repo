# Writing Small, Focused Functions

## Research: Best Practices

- Functions should do one thing and do it well.
- Keep functions short and focused on a single responsibility.
- Use descriptive names that clearly explain what the function does.
- Avoid deeply nested logic by splitting it into smaller helper functions.
- Keep the number of parameters low to reduce complexity.
- Make functions reusable and independent where possible.

## Example of a Complex Function

```js
function processOrder(order) {
  if (!order) return;

  let total = 0;

  for (let i = 0; i < order.items.length; i++) {
    const item = order.items[i];
    if (item.price && item.quantity) {
      total += item.price * item.quantity;
    }
  }

  if (order.discount) {
    total = total - order.discount;
  }

  if (total > 100) {
    total = total * 0.9;
  }

  if (order.user && order.user.email) {
    console.log("Sending confirmation email to " + order.user.email);
  }

  console.log("Final total:", total);
}
```

## Refactored Version with Small, Focused Functions

```js
function calculateItemTotal(item) {
  if (!item.price || !item.quantity) return 0;
  return item.price * item.quantity;
}

function calculateOrderTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += calculateItemTotal(items[i]);
  }
  return total;
}

function applyDiscount(total, discount) {
  if (!discount) return total;
  return total - discount;
}

function applyBulkDiscount(total) {
  if (total > 100) {
    return total * 0.9;
  }
  return total;
}

function sendConfirmationEmail(user) {
  if (user && user.email) {
    console.log("Sending confirmation email to " + user.email);
  }
}

function processOrder(order) {
  if (!order) return;

  let total = calculateOrderTotal(order.items);
  total = applyDiscount(total, order.discount);
  total = applyBulkDiscount(total);

  sendConfirmationEmail(order.user);

  console.log("Final total:", total);
}
```

In the refactored version, the `processOrder` function is now much cleaner and easier to read. Each helper function has a single responsibility, making the code more maintainable and reusable.

## Reflection

Breaking down functions is beneficial because it makes the code easier to read and understand. When a function only does one thing, it is much clearer what its purpose is without having to read through a large block of logic.

Refactoring improved the structure of the code by separating different responsibilities into their own functions. For example, calculating totals, applying discounts, and sending emails are now handled independently. This makes the code easier to maintain and update, since changes can be made to one part without affecting everything else.

It also makes the code more reusable. Smaller functions like `calculateItemTotal` or `applyDiscount` can be used in other parts of the program if needed.

Overall, the refactored version feels more organized and easier to follow compared to the original function.
