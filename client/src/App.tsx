import './App.css';
import Search from './components/Search';
import Results from './components/Results';
import Container from './components/Container';
import { SearchProvider } from './context/SearchContext';

function App() {
  return (
    <SearchProvider>
      <Container>
        <Search/>
        <Results/>
      </Container>
    </SearchProvider>
  );
}

export default App;
