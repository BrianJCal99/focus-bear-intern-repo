import { fireEvent, render, screen } from '@testing-library/react-native';
import HelloWorld from '../components/hello-world';

describe('HelloWorld', () => {
  it('renders the "Hello World" message', () => {
    render(<HelloWorld />);
    expect(screen.getByText('Hello World')).toBeTruthy();
  });

  it('shows a message after pressing the button', () => {
    render(<HelloWorld />);

    expect(screen.queryByText('Button was pressed!')).toBeNull();

    fireEvent.press(screen.getByText('Click me!'));

    expect(screen.getByText('Button was pressed!')).toBeTruthy();
  });
});
