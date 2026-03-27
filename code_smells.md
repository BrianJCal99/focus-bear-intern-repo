# Identifying & Fixing Code Smells

## Code Smells Found

While reviewing my code in the [repository](https://github.com/BrianJCal99/WearCollective), I found several common code smells:

**1. Magic Numbers & Strings**
I had hardcoded values like `3600` for seconds in an hour and `"error"` as a status string in multiple places. Using raw numbers and strings made the code harder to understand.

**2. Long Functions**
One function handled user input validation, data processing, and output formatting all in one. It was over 50 lines long and difficult to follow.

**3. Duplicate Code**
I noticed repeated logic for calculating discounts in two different functions instead of reusing a single helper function.

**4. Large Classes (God Objects)**
A single class managed database access, API calls, and business logic. It had too many responsibilities and was hard to maintain.

**5. Deeply Nested Conditionals**
Some functions had multiple nested `if/else` statements (4-5 levels deep), which made it confusing to trace logic paths.

**6. Commented-Out Code**
There were several blocks of commented-out code that were no longer needed, cluttering the file.

**7. Inconsistent Naming**
Variables like `x`, `val`, and `data1` were used inconsistently, making it hard to understand their purpose without reading the whole function.

## Refactoring Changes

1. Replaced Magic Numbers & Strings
Defined constants for commonly used numbers and strings, e.g.:

```js
const SECONDS_IN_HOUR = 3600;
const STATUS_ERROR = "error";
```

2. Split Long Functions
Broke large functions into smaller, single-purpose functions:

```js
function validateInput(input) { ... }
function processData(input) { ... }
function formatOutput(data) { ... }
```

3. Removed Duplicate Code
Created reusable helper functions for repeated logic, e.g., calculateDiscount(price, rate).

```js
function calculateDiscount(price, rate) {
  return price * rate;
}
```

4. Simplified Large Classes
Split the class into smaller classes or modules, each handling a specific responsibility like DatabaseService or APIService.

5. Flattened Nested Conditionals
Used early returns and guard clauses to reduce nesting:

```js
if (!user) return null;
if (!user.isActive) return "inactive";
```

6. Deleted Commented-Out Code
Removed old code blocks to declutter and improve readability.

7. Renamed Variables for Clarity
Changed ambiguous names to descriptive ones:

```js
let userAge = ageInput;
let discountRate = rate;
let processedData = transform(rawData);
```

## Reflections
- Identifying code smells made me realize how small issues like inconsistent naming or magic numbers can make the code harder to read and maintain.
- Refactoring improved readability by breaking large blocks into smaller, understandable pieces. It also made maintenance easier, since each function now has a single responsibility.
- Avoiding code smells will make future debugging faster because the code is clearer, reusable, and easier to reason about.
- Overall, applying these refactoring practices increases code quality, reduces errors, and improves collaboration for anyone working on the codebase.