# Reflection Environment Setup

## What is the role of Metro in React Native development?

Metro is the default JavaScript bundler used in React Native, responsible for transforming and packaging application code and its dependencies into a format that can be executed on a mobile device. It builds a dependency graph, tracks changes in the codebase, and efficiently updates only the modified modules during development. This enables fast refresh, which significantly improves development speed by allowing near-instant updates without a full rebuild. Metro also handles asset loading and supports modern JavaScript features through transpilation.

## How does Expo simplify React Native development?

Expo simplifies React Native development by providing a managed environment that abstracts away much of the native configuration typically required. Instead of manually setting up Android or iOS build tools, developers can quickly initialise a project with a fully configured setup. Expo includes built-in APIs for common features such as device sensors, storage, and networking, reducing the need for third-party libraries or native code. Additionally, tools like Expo Go allow for rapid testing on physical devices, while features like live reloading and integrated debugging streamline the development workflow.

## What issues did you encounter, and how did you resolve them?

I did not encounter any significant issues during the setup process. The development environment, including dependencies and tooling, was installed successfully without errors. To ensure everything was functioning correctly, I verified that the Metro server started as expected and tested hot reloading within the application. Although no troubleshooting was required, this process helped confirm that the environment was correctly configured and ready for development.