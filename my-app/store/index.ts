import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import devToolsEnhancer from "redux-devtools-expo-dev-plugin";
import userReducer from "./userSlice";

const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
  devTools: false, // Disable default to use the Expo plugin
  // __DEV__ is a React Native global that is true in development and false in
  // production builds. Redux DevTools are only enabled in dev to avoid exposing
  // app state (user email, todos, etc.) in production.
  enhancers: (getDefaultEnhancers) => {
    console.log("[store] __DEV__:", __DEV__);
    return __DEV__
      ? getDefaultEnhancers().concat(devToolsEnhancer())
      : getDefaultEnhancers();
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
