import React from 'react';
import { render, screen } from '@testing-library/react';
import { BookStoreThemeProvider } from '../context/ThemeContext';
import InputText from './InputText';

describe('InputText Component Test', () => {
  it('Check Render', () => {
    render(
      <BookStoreThemeProvider>
        <InputText placeholder="여기에 입력" />
      </BookStoreThemeProvider>,
    );

    expect(screen.getByPlaceholderText('여기에 입력')).toBeInTheDocument();
  });

  it('forwardRef Text', () => {
    const ref = React.createRef<HTMLInputElement>();

    render(
      <BookStoreThemeProvider>
        <InputText placeholder="여기에 입력" ref={ref} />
      </BookStoreThemeProvider>,
    );

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
