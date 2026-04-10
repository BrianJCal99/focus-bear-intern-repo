import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

/**
 * Listens for incoming deep links and navigates to the matching route.
 *
 * Supported URL schemes:
 *   Custom scheme : myapp://<path>
 *   Universal link: https://myapp.example.com/<path>
 *
 * Route mapping (matches Expo Router file structure):
 *   myapp://          → app/(tabs)/index   (Home tab)
 *   myapp://explore   → app/(tabs)/explore (Explore tab)
 *   myapp://modal     → app/modal
 */
export function useDeepLink() {
  const router = useRouter();

  useEffect(() => {
    // Handle links that open the app from a cold/background state
    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink(url);
    });

    // Handle links received while the app is already running
    const subscription = Linking.addEventListener('url', ({ url }) => {
      handleDeepLink(url);
    });

    return () => subscription.remove();
  }, []);

  function handleDeepLink(url: string) {
    const { hostname, path } = Linking.parse(url);

    // Linking.parse("myapp://explore") → { hostname: "explore", path: null }
    // Linking.parse("myapp://explore/details") → { hostname: "explore", path: "details" }
    // Combine hostname + path to reconstruct the full route
    const segments = [hostname, path].filter(Boolean).join('/');
    const route = segments ? `/${segments}` : '/';

    router.push(route as Parameters<typeof router.push>[0]);
  }
}
