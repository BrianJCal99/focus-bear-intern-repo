# Tasks

## Research how native modules work in React Native
Native modules in **React Native** allow JavaScript code to access platform-specific functionality by acting as a bridge between the JS layer and native APIs. These modules are written in platform languages (Java/Kotlin for Android and Objective-C/Swift for iOS) and expose methods that can be invoked from JavaScript. When a method is called, React Native sends the request across the bridge, executes it natively, and returns the result asynchronously. This architecture enables developers to extend app capabilities beyond what is available in the standard React Native API.

## Explore existing React Native libraries that use native modules
Many popular libraries rely on native modules to provide advanced functionality. For example:

- `react-native-device-info` – accesses device-specific information like model, OS version, and battery status.
- `react-native-fs` – enables file system access such as reading/writing files on the device.
- `react-native-push-notification` – handles local and push notifications using native APIs.
- `react-native-camera` – interacts directly with the device camera hardware.

These libraries demonstrate how native modules are commonly used to bridge gaps between JavaScript and device-level functionality.

## Understand how to bridge Java/Kotlin (Android) and Objective-C/Swift (iOS) with JavaScript
Bridging involves defining native methods and exposing them to JavaScript through a standardized interface. On Android, developers create a class (in Java or Kotlin) that extends a base module class and annotate methods to make them accessible. On iOS, developers define a module using Objective-C or Swift and export methods using specific macros or annotations. Once exposed, these methods can be called from JavaScript as if they were part of a normal module. Communication is typically asynchronous, using promises or callbacks, and data passed between layers must be serialized into compatible formats (e.g., JSON-like structures).

## Look into react-native-config for handling environment variables
`react-native-config` is a library that uses native modules to securely manage environment variables in a React Native project. It allows developers to define variables (e.g., API URLs, keys, feature flags) in `.env` files and access them in both JavaScript and native code. This is important because sensitive configuration data often needs to be available at build time and across platforms. By leveraging native modules, `react-native-config` ensures that environment variables are properly injected into Android and iOS builds, improving security and maintainability compared to hardcoding values directly in the app.

# Reflection

## Why would you need to use native modules in a React Native app?
Native modules are necessary when React Native’s JavaScript layer does not provide access to specific platform features or when higher performance is required. For example, interacting with low-level device capabilities such as Bluetooth, background services, system notifications, or secure storage often requires direct access to Android (Kotlin/Java) or iOS (Swift/Objective-C) APIs. Additionally, native modules are useful when integrating existing platform-specific SDKs that do not have a JavaScript wrapper. In the context of Focus Bear, this is especially relevant for features like system-level focus controls, background tracking, or deep OS integrations that cannot be reliably implemented using only JavaScript.

## How does React Native communicate with native code?
React Native communicates with native code through a “bridge” that connects the JavaScript thread with the native platform threads. When a JavaScript function calls a native module, the request is serialized and sent across the bridge to the native side, where it is executed. The result is then sent back asynchronously to JavaScript via callbacks, promises, or events. This communication is asynchronous by design to prevent blocking the UI thread and ensure smooth performance. Newer architectures, such as the JSI (JavaScript Interface) and TurboModules, aim to improve this by enabling more direct and efficient communication, reducing the overhead of serialization.

## What are some challenges of maintaining native bridges?
Maintaining native bridges introduces several complexities. Firstly, developers must manage platform-specific code for both Android and iOS, which increases the maintenance burden and requires knowledge of multiple languages and ecosystems. Secondly, debugging becomes more difficult because issues can arise across the JavaScript and native layers, making them harder to trace. Version compatibility is another challenge, as updates to React Native or native SDKs can break existing bridges. Performance can also be impacted if too many bridge calls are made, due to the overhead of serialization and asynchronous communication. Finally, ensuring consistency between platforms can be difficult, as slight differences in native implementations may lead to inconsistent behaviour across devices.