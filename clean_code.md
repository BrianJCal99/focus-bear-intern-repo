# Clean Code Principles (Summary)

## 1. Simplicity
Simplicity means writing code that does exactly what is needed—no more, no less. Avoid unnecessary complexity, extra features, or overly clever solutions. Simple code is easier to debug, test, and maintain.

**Important:** If it can be simpler, it should be.

## 2. Readability
Code should be easy for humans to read and understand. This includes:
- Clear variable and function names  
- Consistent formatting  
- Logical structure  

Since code is read more often than written, readability is extremely important.

**Important:** Someone else (or future you) should understand it quickly.

## 3. Maintainability
Maintainable code is easy to update, fix, and extend over time. This can be achieved by:
- Writing small, focused functions  
- Avoiding duplication (DRY principle)  
- Separating responsibilities  

**Important:** Code should be easy to change without breaking everything.

## 4. Consistency
Consistency means following the same style and conventions across the codebase:
- Naming conventions  
- File structure  
- Formatting rules  

This makes collaboration easier and reduces confusion.

**Important:** Similar things should look and behave the same.

## 5. Efficiency
Efficiency is about writing code that performs well without overcomplicating it. Avoid premature optimization—focus on clean design first, then optimize where necessary.

**Important:** Balance performance with simplicity.

# Example of Messy Code

```js
function d(a,b,c){
    var x = 0;
    for(var i=0;i<a.length;i++){
        if(a[i] > 10){
            x += a[i]*b;
        } else {
            x += a[i]*c;
        }
    }
    return x;
}
```
Why this is hard to read
- Poor naming (d, a, b, c, x) makes the purpose unclear
- No explanation of what the function does
- Magic number (10) with no context
- Everything is packed into one function
- Formatting is cramped and harder to scan

# Example of Clean Code

```js
function calculateWeightedSum(numbers, highMultiplier, lowMultiplier) {
    const THRESHOLD = 10;
    let total = 0;

    for (let i = 0; i < numbers.length; i++) {
        const value = numbers[i];

        if (value > THRESHOLD) {
            total += value * highMultiplier;
        } else {
            total += value * lowMultiplier;
        }
    }

    return total;
}
```
Why this is easier to read
- Descriptive function and variable names
- Clear purpose and intent
- Magic number replaced with a named constant
- Improved formatting and readability
- Easier to maintain and modify

## Key Takeaway

Clean code is not just about appearance, but it’s about writing code that is:

- Easy to understand
- Easy to maintain
- Reliable over time

This is what separates basic working code from professional-quality code.