import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  BrowserRouter,
} from "react-router-dom";
// import router from './router/router.jsx';
import App from './App.jsx';
import 'react-toastify/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <RouterProvider router={router} /> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
