import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Main } from './views/Main/Main';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path='/' element={<Main />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
