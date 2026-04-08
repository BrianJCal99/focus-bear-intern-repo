# Tasks

## Research core React Native components

React Native replaces traditional HTML elements with platform-specific components that render to native UI elements. Here are some of the core components:

- `View`
  Equivalent to a container (`div` in web). Used for layout and grouping elements.
- `Text`
  Used to display text. Unlike web, all text must be wrapped in a `Text` component.
- `Image`
  Displays images using a `source` prop instead of `src`.
- `ScrollView`
  A scrollable container for smaller datasets. Renders all children at once.
- `FlatList`
  Optimized for large lists. Uses lazy loading (renders only visible items), improving performance.


## Refactor an existing React component to use React Native components

### The Original React Web Component

This version uses standard HTML elements like div, h2, and p.

```jsx
import React from 'react';

const ProfileCard = ({ name, bio }) => {
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc' }}>
      <h2 style={{ fontSize: '24px', color: 'blue' }}>{name}</h2>
      <p style={{ fontSize: '16px' }}>{bio}</p>
    </div>
  );
};

export default ProfileCard;
```

### The Refactored React Native Component

In this version, I have mapped the web elements to their native counterparts: 

- `div` → `View`
- `h2` / `p` → `Text` (In React Native, all text are wrapped in a Text component)
- `style` → `StyleSheet.create` (Styles use camelCase and no units like 'px') 

```jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileCard = ({ name, bio }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.body}>{bio}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  title: {
    fontSize: 24,
    color: 'blue',
    fontWeight: 'bold',
  },
  body: {
    fontSize: 16,
  },
});

export default ProfileCard;
```

## Style the component using both inline styles and StyleSheet.create()

In React Native, you can combine StyleSheet (for reusable, performant styles) and inline styles (for dynamic values or quick adjustments). Here's an example of how to use both in the ProfileCard component:

```jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileCard = ({ name, bio, isHighlighted }) => {
  return (
    <View style={[
      styles.container, 
      // Inline style for dynamic background color
      { backgroundColor: isHighlighted ? '#e3f2fd' : '#fff' } 
    ]}>
      {/* StyleSheet for static title style */}
      <Text style={styles.title}>{name}</Text>
      
      {/* Inline style for quick, one-off font sizing */}
      <Text style={[styles.body, { fontSize: 18 }]}>
        {bio}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    color: 'blue',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  body: {
    color: '#333',
  },
});

export default ProfileCard;
```

**Why use both?**

- `StyleSheet.create`: Best for performance (styles are sent to the native bridge only once) and keeping your component clean.
- Inline Styles: Best for dynamic properties that change based on state or props (like the `isHighlighted` background above) since `StyleSheet` is static.

## Compare the differences in rendering and styling between web and React Native

**Rendering Differences**

- **React (Web):**
  - Uses the browser DOM (div, span, etc.)
  - Renders HTML elements
  - Styling handled via CSS

- **React Native:**
  - Uses native components (iOS/Android views)
  - No DOM — renders directly to native APIs
  - More performant for mobile UI interactions

**Styling Differences**

- **React (Web):**
  - Uses CSS, SCSS, or styled-components
  - Supports className
  - Styles cascade (CSS inheritance)

- **React Native:**
  - Uses JavaScript objects for styling
  - No CSS files
  - No cascading or inheritance like CSS
  - Uses Flexbox by default (but slightly different defaults)

Overall, React Native requires a different mindset for both rendering and styling compared to web development, but it allows you to create truly native mobile experiences.

# Reflection

**What are the key differences between `<View>` and `<div>`?**

`<View>` in React Native is similar to a `<div>` in React for the web, but they aren’t exactly the same. A `<div>` is part of the browser’s DOM and works with HTML and CSS, while `<View>` is mapped to native UI components on iOS and Android. Because of that, `<View>` doesn’t support things like standard CSS or DOM properties, and everything has to be styled using JavaScript instead.

**How does `StyleSheet.create()` improve performance compared to inline styles?**

`StyleSheet.create()` improves performance because the styles are defined once and then reused, instead of being recreated every time the component renders like inline styles. This makes the app more efficient, especially in larger applications, and also helps keep the code cleaner and easier to manage.

**Why doesn’t React Native use `className` like React web?**

React Native doesn’t use `className` because it doesn’t use CSS or the DOM like React on the web. Instead, styles are written as JavaScript objects and applied directly to components. This makes styling more consistent across different devices and avoids the need for things like CSS classes and cascading rules.