# Tasks

## Common React Native Performance Bottlenecks

Before you can fix performance issues you need to know where they come from. React Native has a distinct threading model that makes some bottlenecks very different from plain React on the web.

### The JavaScript thread and the 16ms budget

React Native targets 60 FPS, which means every frame has a 16.67ms budget. All business logic - API calls, state updates, event handling, and React's reconciler - runs on a single JavaScript thread. If any one of those tasks takes longer than 16ms without yielding, frames get dropped and the UI visibly stutters. This is the root cause behind most React Native performance complaints: not that the framework is slow, but that it's easy to accidentally pile work onto one thread.

In `PostsList`, loading 10 posts per page and avoiding heavy synchronous transforms keeps the JS thread clear during scrolling. If I'd processed or sorted a large dataset on every render, that single thread would have been the bottleneck.

### The bridge (old architecture)

In the original architecture, the JS thread and the native UI thread can't call each other directly - all communication goes through an asynchronous serialised bridge. Every time React wants to update a native view, it serialises a JSON payload, sends it across the bridge, and the native side deserialises and applies it. This round-trip adds latency and becomes a throughput bottleneck under heavy rendering loads. Benchmarks have found bridge communication accounts for up to 80% of render duration in some apps.

The New Architecture (Fabric + TurboModules, now the default from RN 0.74+) replaces the bridge with JSI - a C++ layer that lets JavaScript hold direct references to native objects and call them synchronously, cutting that overhead by up to 40%.

### Unnecessary re-renders

Every call to a component function costs CPU time and memory allocation. In a list with 100 cards, a single unrelated state change in the parent (say, `loadingMore` toggling from false to true) would previously cause all 100 `PostCard` instances to re-evaluate unless something stops them. This is exactly what `React.memo` prevents. At scale, unnecessary re-renders are one of the most common and most fixable performance drains.

### Unvirtualised long lists

`ScrollView` renders every child at mount time and keeps them all in memory. For a list of 100 posts this is manageable, but at 1,000+ items it causes slow initial renders, high memory use, and janky scrolling. The solution is a virtualised list - `FlatList` renders only what's visible, recycling cells as the user scrolls. For even better performance, Shopify's `FlashList` improves on `FlatList` by reusing fully-rendered components rather than just recycling cell containers, reducing JS-thread work during fast scrolls significantly.

### Images

Unoptimised images are consistently one of the biggest real-world memory sinks. Loading large bitmaps into memory without resizing or caching can trigger OS memory warnings and eventual crashes. Best practices include: serving correctly-sized images, using WebP format (30–40% smaller than JPEG/PNG at comparable quality), and caching aggressively with libraries like `react-native-fast-image`.

### console.log in production

Every `console.log` call goes through the bridge even in production builds. In a hot render path - inside a `FlatList` `renderItem`, for example - a single log statement can halve throughput. The fix is using a Babel plugin (`babel-plugin-transform-remove-console`) to strip all log statements from production bundles automatically.

### Development mode overhead

Running in `dev=true` mode (the default when using Metro) disables minification, enables extra runtime warnings, and includes the full React error overlay. This can make dev builds 50–70% slower than a release build. Always profile against a release build - otherwise you're optimising phantom problems that don't exist in production.

---

## useMemo, useCallback, and React.memo

Working through this task gave me a clearer picture of how unnecessary re-renders sneak into a React Native app and how the three memoization tools each solve a different piece of that problem.

---

### React.memo

I wrapped `ThemedText` and `ThemedView` in `React.memo`. These are shared components used throughout the app, and without memoization they re-render every time their parent renders - even when their own props haven't changed at all. `React.memo` tells React to skip the re-render if the props are referentially equal to the last render. `PostCard` was already wrapped this way, which is why it doesn't re-render when unrelated state like `loadingMore` changes in the parent list.

---

### useMemo

Both `ThemedText` and `ThemedView` were building a new style array literal on every render, like `[{ color }, styles.default, style]`. Even if `color` and `style` hadn't changed, JavaScript creates a new array object each time, so any downstream comparison sees it as different. I wrapped those arrays in `useMemo` so the array is only recreated when one of its actual inputs - `color`, `type`, or `style` - changes.

I also used `useMemo` for `hasMore` in `PostsList`. The calculation itself (`posts.length < TOTAL_POSTS`) is trivial, but memoizing it makes the dependency explicit and keeps the render return clean. More importantly, it reinforced to me that `useMemo` is the right tool for any derived value - not just expensive ones.

---

### useCallback

This one clicked for me once I thought about how `Pressable` works. Every render of `PostsList` was creating a brand-new `handleLoadMore` function, so the `Pressable` received a new `onPress` reference every time - even when nothing relevant had changed. `useCallback` caches the function and only recreates it when its dependencies (`load`, `posts.length`) change.

I also extracted the inline retry handler from the error state JSX into its own `useCallback`. It was easy to overlook because it was buried inside a conditional render block, but it had the same problem - a new function on every render passed down to a `Pressable`.

---

### The pattern I took away

- **React.memo** - stops a component from re-rendering when its props are the same
- **useMemo** - stops a value or object from being recreated when its inputs are the same
- **useCallback** - stops a function from being recreated when its inputs are the same

They all serve the same underlying goal: preserve referential equality across renders so that child components and hooks that depend on those references don't do unnecessary work. The key thing I learned is that it's not just about expensive computations - even a style array or an event handler matters because React uses reference equality, not value equality, when deciding whether to re-render.

---

## How React Native Handles Memory and Garbage Collection

### Two heaps, one app

A React Native app runs memory in two separate worlds simultaneously. The JavaScript engine manages a JS heap containing all JS objects, closures, and component state. The native runtime (Android's ART or iOS's Objective-C/Swift runtime) manages a separate native heap containing view objects, image bitmaps, and native module state. Developers rarely think about this split, but it matters when data crosses the boundary - every `ArrayBuffer`, image asset, or native module reference involves allocations on both sides.

### Mark-and-sweep garbage collection

JavaScript uses a mark-and-sweep GC. Starting from a set of root objects (global variables, active call stack frames), the GC traverses the object graph, marks everything reachable as "in use", and then sweeps - freeing everything that wasn't marked. This means as long as a reference to an object exists somewhere in your code, that object will never be collected. The most common memory leak pattern in React Native is an event listener or subscription that holds a reference to a component's closure after the component has unmounted - the component's state and props stay alive in memory indefinitely.

```tsx
// Memory leak: the interval holds a reference to setCount forever
useEffect(() => {
  const id = setInterval(() => setCount((c) => c + 1), 1000);
  // Missing return () => clearInterval(id);
}, []);
```

The fix is always returning a cleanup function from `useEffect` to remove listeners and cancel subscriptions on unmount.

### Hermes and the Hades GC

React Native ships Hermes as the default JavaScript engine (from RN 0.70+). Hermes was purpose-built for mobile: it compiles JavaScript to bytecode at build time rather than JIT-compiling at runtime, which reduces startup time and memory pressure significantly.

Hermes's garbage collector is called Hades. It is a mostly-concurrent GC - the bulk of the mark phase runs on a background thread while JavaScript continues executing, so GC pauses are very short. On 64-bit devices Hades pauses for just ~48ms at p99.9, compared to ~1,400ms for the previous GenGC at the same percentile - a 34× improvement. On 32-bit devices it falls back to incremental mode (~88ms at p99.9), interleaving GC work with normal JS execution in small slices.

The practical effect is that Hades nearly eliminates the long "GC hiccup" freezes that older React Native apps were known for. CPU-intensive workloads at Facebook improved 20–50% after switching to Hades.

### The async boundary problem

One nuanced memory issue comes up when passing `ArrayBuffer` data across the JS/native boundary asynchronously. The JS garbage collector only tracks references on the JS heap. If native code captures a raw pointer to a buffer's backing memory and the JS object goes out of scope before the async work completes, the GC may reclaim that memory - leaving native code with a dangling pointer. The safe solutions are: keeping work synchronous (hold the reference throughout), copying data into native-owned memory before crossing the boundary, or using native-allocated buffers that are exposed to JS rather than the other way around.

---

## Performance Monitoring Tools

### React Native DevTools (built-in)

The DevTools profiler is the first place to look. Accessible by pressing `j` in the Metro terminal or through the in-app developer menu, it records a flamegraph of every component render - showing how long each component took, why it rendered, and which renders were unnecessary. The "Highlight Updates" overlay flashes components as they re-render in real time, making it easy to spot components that update too frequently without touching anything.

### Flipper

Flipper is Facebook's desktop debugging platform for React Native. It connects to a running simulator or physical device and provides plugins for: inspecting the component tree, monitoring network requests with full request/response bodies, viewing SQLite/MMKV storage, and profiling the JS thread. The `react-native-performance` Flipper plugin adds a live graph of JS/UI thread frame times. From RN 0.73 onwards Flipper is no longer bundled by default, but it can still be installed manually.

### Flashlight

Flashlight is a newer tool focused on Android performance. It wraps Android's systrace and `adb` tooling into an approachable UI, recording frame rate (FPS), total CPU usage, and per-thread CPU usage over a test session. The output is a shareable performance report - useful for comparing before/after an optimisation or catching regressions in CI. It's particularly good at exposing janky scroll sessions that don't show up in unit tests.

### Perfetto

Perfetto is Google's system-level tracing platform. For React Native it provides the most detailed view available - kernel-level scheduling, GPU activity, memory allocations, and JavaScript bytecode execution - all correlated on a single timeline. It's overkill for most day-to-day work, but when you have a reproducible performance issue that DevTools and Flashlight can't explain, Perfetto can pinpoint whether the bottleneck is in JS, in native rendering, or at the OS scheduler level.

### Sentry Performance

Sentry's React Native SDK includes a production profiler that samples the JS call stack at runtime and aggregates it across real user sessions. Unlike DevTools (which only works in development), Sentry shows which functions are slowest for actual users on real devices - including low-end Android phones that your development machine doesn't represent. It can also track custom performance marks and measures, making it possible to track things like "time from pressing Load More to cards appearing on screen" as a tracked metric over time.

---

## Reflection

### What are the most common performance issues in React Native?

From what I've researched and worked through, the most common issues fall into a few clear categories.

The first is **JS thread congestion**. Because all React logic runs on one thread, anything synchronous and expensive - a heavy filter over a large array, a deeply nested state update, or just too many component re-renders stacking up - can push frame time past 16ms. This is invisible in dev mode because the extra overhead disguises where the real time is being spent, which is why profiling in a release build matters.

The second is **unnecessary re-renders**. Without memoization, every state change in a parent re-renders the entire subtree, even when most components' props haven't changed. In a list of 100 items, that's 100 component functions calling on every `loadingMore` toggle. This is fixable with `React.memo`, `useCallback`, and `useMemo`, which is exactly what I did in this project.

The third is **unvirtualised lists**. Using `ScrollView` for long lists means every item is in the DOM at once. Switching to `FlatList` (or `FlashList` for heavier cards) means only the visible window is rendered, keeping memory use flat regardless of total list length.

The fourth is **image memory pressure**. Oversized images silently inflate the native heap. It's easy to miss because it doesn't cause immediate crashes - it just slowly degrades performance until the OS forces a memory reclamation.

The fifth is **bridge overhead** in the old architecture. Frequent calls from JS to native modules, or very high-frequency view updates, serialise through a JSON bridge that adds latency. The New Architecture's JSI layer eliminates most of this, but it's still worth knowing why certain operations were slow in older apps.

### How do useMemo and useCallback improve performance?

Both hooks work by memoising a value across renders - they return the cached result from the previous call unless one of the listed dependencies has changed.

`useCallback` memoises a function reference. Without it, every render creates a new function object, so any child component that receives that function as a prop sees a changed prop and re-renders, even if the function's behaviour hasn't changed at all. In `PostsList`, `handleLoadMore` was recreated on every render and passed to a `Pressable`. With `useCallback([load, posts.length])`, the same function object is reused until `posts.length` or `load` changes - which only happens after a pagination fetch completes.

`useMemo` memoises any computed value. In `ThemedText` and `ThemedView`, style arrays like `[{ color }, styles.default, style]` were being constructed as new array literals on every render. JavaScript object identity means a new array is always a different reference, so any `React.memo`-wrapped child receiving that array as a prop would still re-render. `useMemo` caches the array until `color`, `type`, or `style` actually changes.

The key insight is that both hooks are fundamentally about **referential stability**, not just computation cost. They prevent the cascading re-render problem that happens when a parent's render produces new object or function references that look different to child components even though their content is the same.

One important caveat I picked up: these hooks are not free - they have their own overhead (the dependency comparison on every render). On trivially cheap computations with no downstream subscribers, memoisation can cost more than it saves. The right question to ask is: "does something that receives this value use reference equality to decide whether to update?" If yes, memoisation is worth it.

### What tools can you use to measure and monitor app performance?

The starting point is **React Native DevTools** - it's built in, requires no setup, and the flamegraph + highlight-updates overlay answer the most common question ("why is this re-rendering?") quickly.

For deeper JS thread analysis, **Flipper** with the performance plugin gives a live frame-time graph and the full component inspector, though it needs manual setup from RN 0.73 onwards.

**Flashlight** is the best option for Android-specific profiling - it captures FPS, CPU usage per thread, and produces a shareable report. It made me realise that the same app can perform very differently on a mid-range Android device versus a simulator.

**Perfetto** goes a level deeper into system traces when you need to correlate JS execution with GPU activity or OS scheduling. It's more complex to read, but for hard-to-reproduce jank it's irreplaceable.

For production monitoring, **Sentry Performance** is the practical choice. DevTools only works in development; Sentry captures real user sessions on real devices and aggregates them into actionable data. It means you catch regressions before users complain rather than after.
