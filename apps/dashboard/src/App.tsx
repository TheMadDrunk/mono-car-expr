import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/layout/Layout';
import CarList from './components/cars/CarList';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Car Fleet</h1>
          <CarList />
        </div>
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
