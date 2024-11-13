import './App.css';
import Main from './Pages/Main';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()
function App() {
  return (
  <>
  <QueryClientProvider client={queryClient}>
  <Main/>
  </QueryClientProvider>
  </>
  );
}

export default App;
