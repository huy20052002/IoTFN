import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import DatasensorPage from './pages/DataPage';
import HistoryPage from './pages/HistoryPage';
import ProfilePage from './pages/ProfilePage';
import HistoryTable from './components/HistoryTable';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='' element={<DashboardPage />} />
        <Route path='/data' element={<DatasensorPage />} />
        <Route path='/history' element={<HistoryPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/history1' element={<HistoryTable />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
