### Reflection

Using selectors instead of directly accessing state improves code organization and maintainability. Selectors act as a single source of truth for how state is retrieved, so if the state structure changes, only the selector needs to be updated rather than every component.

They also make components cleaner and easier to read, since the logic for accessing state is separated from the UI. This helps improve separation of concerns and keeps components more focused on rendering.

Additionally, selectors are reusable across multiple components, which reduces duplication. They can also be optimized (e.g. with memoization) to improve performance by preventing unnecessary re-renders.

Overall, selectors make the codebase more scalable, easier to maintain, and more consistent.
