import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Details } from './pages/Details/Details';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path='/' element={<Dashboard />} />
          <Route path='/details/:id' element={<Details />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
