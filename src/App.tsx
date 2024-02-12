import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard/Dashboard';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path='/' element={<Dashboard />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
