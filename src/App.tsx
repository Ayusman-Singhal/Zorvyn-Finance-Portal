import { useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './components/Dashboard';
import { useTransactions } from './hooks/useTransactions';

function App() {
  const { initializeMockData } = useTransactions();

  useEffect(() => {
    initializeMockData();
  }, [initializeMockData]);

  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
}

export default App;
