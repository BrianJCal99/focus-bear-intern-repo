import * as Sentry from '@sentry/react-native';
import { Button } from 'react-native';

export function HelloWave() {
  return (
    <Button title="Try!" onPress={() => { Sentry.captureException(new Error('First error')); }} />
  );
}
