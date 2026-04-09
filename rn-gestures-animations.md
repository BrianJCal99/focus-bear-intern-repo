## Reflection

## What are the differences between Animated and react-native-reanimated?

From my experience, the key difference comes down to performance and how each library executes animations. The built-in Animated API is easier to get started with and works well for simple animations like fades or basic transitions. However, because it mainly runs on the JavaScript thread, I noticed that performance can drop when the app is under load or handling multiple tasks.

In contrast, react-native-reanimated feels significantly more robust for complex or interactive animations. It runs animations on the UI thread, which makes them much smoother and more consistent. When I experimented with gesture-based animations, Reanimated handled them far better, with no noticeable lag. Overall, Animated is good for simple use cases, while Reanimated is better suited for production-level, high-performance interactions.

## How does react-native-gesture-handler improve gesture performance?

react-native-gesture-handler improves performance by handling gestures closer to the native layer rather than relying heavily on the JavaScript thread. From what I observed, this reduces delays and makes gestures feel more immediate and responsive.

When I tested interactions like swiping and dragging, they felt much smoother compared to the default gesture system. Even when the app was doing other work in the background, the gestures remained consistent. This shows that gesture-handler minimizes the communication overhead between JavaScript and native code, which is critical for maintaining a fluid user experience.

## When would you use gestures instead of buttons in a UI?

I would use gestures in situations where speed and intuitiveness are important. For example, swiping to delete or dragging to reorder items feels more natural and efficient than tapping buttons. These interactions improve the overall user experience by making the app feel more dynamic and modern.

That said, I’ve learned that gestures should not completely replace buttons. Buttons provide clarity and accessibility, especially for users who may not be familiar with gesture-based controls. A good approach is to use gestures as an enhancement while still keeping buttons as a fallback, ensuring both usability and discoverability.

## Why is InteractionManager.runAfterInteractions necessary?

InteractionManager.runAfterInteractions is important for maintaining smooth performance during user interactions. It allows heavy or non-urgent tasks to be delayed until after animations and gestures have completed.

From my testing, running expensive operations during animations can cause noticeable frame drops and make the UI feel unresponsive. By deferring these tasks, the app prioritizes smooth interactions first, then processes additional work afterward. This results in a more polished and responsive user experience, which is especially important in mobile applications.