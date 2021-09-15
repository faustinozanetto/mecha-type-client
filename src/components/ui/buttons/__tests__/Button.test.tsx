import { render } from '@testing-library/react';
import { Button } from '../Button';

test('Renders Button component', () => {
  const { container, getByText } = render(
    <Button backgroundColor="#7C3AED" borderRadius="md">
      Hello test
    </Button>
  );
  expect(getByText('Hello test')).toBeInTheDocument();
  expect(getByText('Hello test')).toHaveStyle({ backgroundColor: '#7C3AE', borderRadius: '10px' });
});
