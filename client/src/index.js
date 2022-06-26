import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AppContainer from './Components/SignInSingUp/AppContainer';
import { BrowserRouter , Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/admin' element={<App/>}/>
        <Route path='/logs' element={<AppContainer/>}/>
      </Routes>
    </BrowserRouter>
    {/* <App /> */}
     {/* <AppContainer/> */}
    
  </React.StrictMode>
);
