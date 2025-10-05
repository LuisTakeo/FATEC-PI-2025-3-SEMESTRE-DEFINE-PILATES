import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import MainRoutes from './routers.tsx';
import './index.css';
import Header from './components/Header';
import Footer from './components/Footer'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
        <MainRoutes />
      <Footer/>
    </BrowserRouter>
  </StrictMode>
);