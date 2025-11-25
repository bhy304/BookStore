import { render, screen } from '@testing-library/react';
import { BookStoreThemeProvider } from '../context/ThemeContext';
import Button from './Button';

describe('Button Component Test', () => {
  it('Check Render', () => {
    render(
      <BookStoreThemeProvider>
        <Button size="large" scheme="primary">
          Button
        </Button>
      </BookStoreThemeProvider>,
    );

    expect(screen.getByText('Button')).toBeInTheDocument();
  });

  it('size props test', () => {
    render(
      <BookStoreThemeProvider>
        <Button size="large" scheme="primary">
          Button
        </Button>
      </BookStoreThemeProvider>,
    );

    expect(screen.getByRole('button')).toHaveStyle({ fontSize: '1.5rem' });
  });

  it('disabled props test', () => {
    render(
      <BookStoreThemeProvider>
        <Button size="large" scheme="primary" disabled>
          Button
        </Button>
      </BookStoreThemeProvider>,
    );

    expect(screen.getByRole('button')).toHaveStyle({ opacity: '0.5' });
    expect(screen.getByRole('button')).toHaveStyle({ pointerEvents: 'none' });
  });
});
