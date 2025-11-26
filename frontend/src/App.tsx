import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BookStoreThemeProvider } from './components/context/ThemeContext';
import Layout from './components/layout/Layout';
import ThemeSwitcher from './components/header/ThemeSwitcher';
import Home from './pages/Home';
import Error from './components/common/Error';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
    errorElement: <Error />,
  },
  {
    path: '/books',
    element: (
      <Layout>
        <div>도서 목록</div>
      </Layout>
    ),
  },
]);

function App() {
  return (
    <BookStoreThemeProvider>
      <ThemeSwitcher />
      <RouterProvider router={router} />
    </BookStoreThemeProvider>
  );
}

export default App;
