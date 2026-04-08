# Tasks

## Research the differences between React Native Stylesheets and standard CSS

1. Platform Context and Rendering

Standard CSS is designed for the browser. It works with the DOM and is interpreted by a browser engine like Blink or WebKit. In contrast, React Native uses JavaScript to define styles, but these styles are ultimately translated into native UI components (iOS or Android). There is no DOM, and no browser rendering engine involved.

This means React Native styling is closer to native mobile layout systems than to traditional web styling.

2. Syntax and Structure

CSS is written as a separate stylesheet language using selectors:

```css
.container {
  display: flex;
  background-color: blue;
}
```

React Native uses JavaScript objects via StyleSheet.create():

```js
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
  },
});
```

Key differences:

- CSS uses kebab-case (background-color), React Native uses camelCase (backgroundColor)
- CSS is declarative text, React Native styles are JavaScript objects
- No selectors in React Native (e.g. no .class, #id, or element selectors)

3. Scope and Reusability

CSS supports cascading and inheritance. Styles can be applied globally, overridden, and reused via classes, IDs, and combinators. This allows for powerful styling patterns but can also lead to specificity conflicts.

React Native styles are scoped locally to components. There is no cascade, and styles do not automatically inherit (except for limited text properties). This results in:

- More predictable styling
- Less risk of unintended overrides
- More explicit style management

4. Layout System

Both CSS and React Native use Flexbox, but with important differences.

React Native:

Uses Flexbox by default (display: flex is implicit)
Default flexDirection is column

CSS:

Requires explicitly setting display: flex
Default flexDirection is row

Additionally, React Native supports a subset of Flexbox properties and lacks some advanced CSS layout features like Grid.

5. Units and Measurements

CSS supports a wide range of units:

`px`, `%`, `em`, `rem`, `vw`, `vh`, etc.

React Native:

- Uses unitless numbers (interpreted as density-independent pixels)
- No percentages in most layout contexts (though some newer versions allow limited use)

Example:

`width: 100 // instead of "100px"`

This simplifies calculations but reduces flexibility compared to CSS.

6. Styling Capabilities

CSS provides extensive styling features:

- Pseudo-classes (:hover, :focus)
- Animations and keyframes
- Media queries for responsive design
- Advanced selectors

React Native lacks many of these:

- No pseudo-classes like :hover (since mobile has no hover)
- No media queries (instead uses APIs like Dimensions)
- Animations handled via dedicated APIs (e.g. Animated)

7. Performance Considerations

CSS is highly optimized within browsers and benefits from hardware acceleration and decades of optimization.

React Native uses StyleSheet.create() to optimize styles by:

- Reducing object recreation
- Sending style references over the bridge efficiently

However, because styles are processed in JavaScript and passed to native components, performance considerations are more explicit for developers.

8. Dynamic Styling

React Native allows easy dynamic styling using JavaScript logic:

`<View style={[styles.box, isActive && styles.active]} />`

While CSS can achieve dynamic behavior (e.g. with classes or variables), it typically requires interaction with JavaScript or frameworks.

Standard CSS and React Native stylesheets serve similar purposes but operate in fundamentally different environments. CSS is powerful, flexible, and deeply integrated with the web’s document model, supporting cascading, inheritance, and a wide array of features. React Native styling, on the other hand, is more constrained and explicit, reflecting the needs of native mobile development. It trades flexibility for predictability and performance consistency across platforms.

For developers, this means that while prior CSS knowledge is helpful, adapting to React Native requires a shift in mindset—from global, cascading styles to modular, component-based styling.

## Experiment with both StyleSheet.create() and inline styles

For this task, I implemented two screens in the app to compare the two approaches:

`stylesheet-screen.tsx` — uses `StyleSheet.create()` at the bottom of the file with named style keys: - `ProfileCard` — a row with a circular avatar and `name`/`role` text

- ActionButton — a full-width "Follow" button

inline-screen.tsx — identical layout and components but all styles are written inline as object literals directly on each element.

Both screens are registered as tabs ("StyleSheet" and "Inline") in `\_layout.tsx.`

## Explore how styling frameworks like @rneui/themed or react-native-paper work

For this task, I chose to explore two popular React Native UI libraries that provide built-in styling and theming capabilities:

- react-native-paper — Material Design 3 component library by Callstack
- @rneui/themed + @rneui/base — React Native Elements UI kit

`paper-screen.tsx` — wraps the app in `<PaperProvider>`:

- PaperCard — uses `Card`, `Card.Title`, `Card.Content`, `Card.Actions`, `Button`
- PaperToggle — uses `Switch` + `Text` with Material variant prop for typography scale

rneui-screen.tsx — wraps the app in `<ThemeProvider theme={createTheme(...)}>` (required):

- RneuiCard — uses `Card`, `Card.Title`, `Card.Divider`, `Button`
- RneuiList — uses `ListItem`, `ListItem.Content`, `ListItem.Title`, `ListItem.Subtitle`, `Switch`

Key things to notice about both frameworks:

- They each require a Provider at the root to inject theming
- Both expose a `createTheme`/`custom` theme API to set your brand colors once and have them propagate everywhere
- Components accept a `containerStyle`/`style` prop for local overrides, but the default look comes "free" from the theme

Overall, the "vanilla" approaches (**StyleSheet** vs **inline**) are more flexible but require more boilerplate and maintenance, while the UI libraries provide a polished design system out of the box at the cost of some customizability and added dependencies.

## Test responsiveness using built-in React Native utilities

Component 1 — AdaptiveGrid (Dimensions API)

`const { width, height } = Dimensions.get('window');`

- Called once at module load — it's a static snapshot
- Used to derive breakpoints (`isTablet`, `numColumns`) and compute tile sizes
- The grid lays out 2 columns on phones, 3 on tablets (≥768px)
- Does not re-render on rotation — intentional, to contrast with Component 2

Component 2 — LiveInfo (useWindowDimensions + Platform)

`const { width, height, fontScale, scale } = useWindowDimensions();`

- A hook — re-renders the component automatically on rotation or window resize
- Shows live orientation detection (width > height) that changes the card's layout
- `Platform.OS`/ `Platform.Version`/ `Platform.select()` — lets you branch behaviour per platform without runtime checks scattered  
  through your JSX

Key takeaway to observe: rotate the device (or resize the web window) — the info card updates immediately; the grid stays fixed because `Dimensions.get()` is a one-time read.

# Reflection

**Why does React Native use camelCase instead of traditional CSS properties?**
React Native uses camelCase because styles are written as JavaScript objects rather than separate CSS files. Since JavaScript follows camelCase naming conventions, it makes sense to keep everything consistent within the same syntax. This also avoids issues with hyphenated property names (like `font-size`) which aren’t valid in standard JavaScript object keys unless written as strings. Overall, camelCase makes styling feel more natural when working directly inside a JavaScript/TypeScript environment and keeps the developer experience consistent.

**What are the benefits of using `StyleSheet.create()` over inline styles?**
Using `StyleSheet.create()` improves performance and maintainability. Styles are defined once and can be reused across components, which keeps the code cleaner and easier to manage, especially in larger projects. It also allows React Native to optimise and cache the styles internally instead of recreating them on every render like inline styles do. Additionally, having styles separated from the JSX structure improves readability and makes it easier to debug or update styling without affecting the component logic.

**How would you handle different screen sizes in React Native?**
Handling different screen sizes in React Native typically involves using flexible layouts and responsive design principles rather than fixed dimensions. I would use Flexbox for most layouts since it adapts well to different screen sizes. For more precise control, I can use utilities like `Dimensions` or `useWindowDimensions` to dynamically adjust styles based on screen width and height. Another approach is to use percentage-based widths/heights and scalable units where possible. In more complex cases, libraries like `react-native-responsive-screen` or implementing breakpoints similar to web development can help ensure the UI looks consistent across different devices.
