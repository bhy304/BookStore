import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BookStoreThemeProvider } from './components/context/ThemeContext';
import Layout from './components/layout/Layout';
import ThemeSwitcher from './components/header/ThemeSwitcher';
import Home from './pages/Home';
import Error from './components/common/Error';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import Login from './pages/Login';
import Books from './pages/Books';

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
        <Books />
      </Layout>
    ),
  },
  {
    path: '/signup',
    element: (
      <Layout>
        <Signup />
      </Layout>
    ),
  },
  {
    path: '/login',
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
  },
  {
    path: '/reset',
    element: (
      <Layout>
        <ResetPassword />
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
