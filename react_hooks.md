### Reflection

## What problem does useCallback solve?
useCallback prevents unnecessary re-renders by keeping the same function reference between renders. In React, functions are recreated on every render, which can cause child components (especially memoized ones) to re-render even if nothing meaningful changed. useCallback fixes this by memoizing the function so it only changes when its dependencies change.

## What does useCallback work differently from useMemo?
useCallback memoizes a function, while useMemo memoizes a computed value. useCallback returns the same function reference unless dependencies change, whereas useMemo runs a function and returns its result. In short, useCallback is for functions, useMemo is for values.

## When would useCallback not be useful?
useCallback is not useful when the function is cheap to recreate or not passed to memoized children. It can also add unnecessary complexity if overused. If there is no performance issue or no dependency on referential equality, using useCallback may actually make the code harder to read without providing benefits.
