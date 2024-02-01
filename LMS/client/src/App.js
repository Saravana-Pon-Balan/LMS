// App.jsx
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './components/Sidebar';
import Router from "./components/Router";
import { BrowserRouter } from 'react-router-dom';
const App = () => {

  return (
    <div>
      <CssBaseline />
      <BrowserRouter>
      <Sidebar />
      <Router/>
      </BrowserRouter>

    </div>
  );
};

export default App;
