import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AppProvider } from '../app/AppProvider';
import App from './App';

export default function RootApp() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}
