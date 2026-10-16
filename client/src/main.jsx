
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router";
import App from './App.jsx'
import MainRoutes from './Routes/MainRoutes/MainRoutes.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
   <MainRoutes/>
    
  </BrowserRouter>,
)
