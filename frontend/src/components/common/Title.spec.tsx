import { render, screen } from '@testing-library/react'
import { BookStoreThemeProvider } from '../context/ThemeContext'
import Title from './Title'

describe('Title Component Test', () => {
  it('Check Render', () => {
    // 1. render
    render(
        <BookStoreThemeProvider>
          <Title size="large">Text</Title>
        </BookStoreThemeProvider>
    )

    // 2. check
    expect(screen.getByText('Text')).toBeInTheDocument()
  })

  it('size props test', () => {
    const { container } = render(
        <BookStoreThemeProvider>
          <Title size="large">Text</Title>
        </BookStoreThemeProvider>
    )

    expect(container?.firstChild).toHaveStyle({ fontSize: '2rem'})
  })

  it('color props test', () => {
    const { container } = render(
        <BookStoreThemeProvider>
          <Title size="large" color="primary">Text</Title>
        </BookStoreThemeProvider>
    )

    expect(container?.firstChild).toHaveStyle({ color: 'rgb(165, 42, 42)' })
  })
})