import { GlobalStyle } from './style/global';
import { ThemeProvider } from 'styled-components';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import { dark, light } from './style/theme';

function App() {
  return (
    <ThemeProvider theme={dark}>
      <GlobalStyle themeName='light' />
      <Layout>
        <Home />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
