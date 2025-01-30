import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import App from './App';
import { AppProvider } from '../app/AppProvider';

export default function RootApp() {
  return (
    <AppProvider>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Fast Copy
          </Typography>
        </Toolbar>
      </AppBar>

      <Router>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}
