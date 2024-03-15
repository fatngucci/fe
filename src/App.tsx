import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Navigate, Route, Routes } from 'react-router-dom';
import ImpressumPage from './pages/ImpressumPage';
import AdminPage from './pages/AdminPage';
import DatenschutzPage from './pages/DatenschutzPage';
import NewsletterTestPage from './pages/NewsletterTestPage';
import { AdminIDContext } from './components/AdminIDContext';
import { getAdminIdFromJWT } from './backend/api';
import KuenstlerCreate from './pages/KunstlerCreate';
import GalerieCreate from './pages/GalerieCreate';
import GalerieEdit from './pages/GalerieEdit';
import KunstwerkCreate from './pages/KunstwerkCreate';
import KunstwerkEdit from './pages/KunstwerkEdit';
import DashboardPage from './pages/DashboardPage';
import DashboardKuenstlerPage from './pages/DashBoardKuenstlerPage';
import KuenstlerListPage from './pages/KuenstlerListPage';
import KuenstlerEdit from './pages/KuenstlerEdit';
import GalerieTour from './pages/GalerieTour';
import NewsUnsubPage from './pages/NewsUnsubPage';
import GalerieListPage from './pages/GalerieListPage';
import KunstwerkListPage from './pages/KunstwerkListPage';
import DashboardKunstwerkPage from './pages/DashBoardKunstwerkPage';
import DashboardGaleriePage from './pages/DashBoardGaleriePage';
import NewsletterCreate from './pages/NewsletterCreate';
import NewsletterEdit from './pages/NewsletterEdit';
import NewsletterListPage from './pages/NewsletterListPage';
import DashboardNewsletterPage from './pages/DashBoardNewsletterPage';
import NewKunstwerkePage from './pages/KunstwerkePage';
import NewHomePage from './pages/HomePage';
import NewKunstwerkPage from './pages/KunstwerkPage';
import NewNewsPage from './pages/NewsPage';
import NewGalerienPage from './pages/GalerienPage';
import NewGaleriePage from './pages/GaleriePage';

function App() {
  const [adminID, setAdminID] = React.useState(getAdminIdFromJWT());

  return (
    <AdminIDContext.Provider value={{ adminID, setAdminID }}>
      <React.StrictMode>
        <Header />
        <Routes>
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/dashboard/kuenstler' element={<DashboardKuenstlerPage />} />
          <Route path='/dashboard/galerie' element={<DashboardGaleriePage />} />
          <Route path='/dashboard/kunstwerk' element={<DashboardKunstwerkPage />} />
          <Route path='/dashboard/newsletter' element={<DashboardNewsletterPage />} />
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/datenschutz' element={<DatenschutzPage />} />
          <Route path='/galerien' element={<NewGalerienPage />} />
          <Route path='/galerie/create' element={<GalerieCreate />} />
          <Route path='/galerie/list' element={<GalerieListPage />} />
          <Route path='/galerie/:galerieId/edit' element={<GalerieEdit />} />
          <Route path='/galerie/:galerieId' element={<NewGaleriePage />} />
          <Route path='/galerie/:galerieId/tour' element={<GalerieTour />} />
          <Route path='/imprint' element={<ImpressumPage />} />
          <Route path='/kuenstler/list' element={<KuenstlerListPage />} />
          <Route path='/kuenstler/create' element={<KuenstlerCreate />} />
          <Route path='/kuenstler/:kuenstlerId/edit' element={<KuenstlerEdit />} />
          <Route path='/kunstwerke' element={<NewKunstwerkePage />} />
          <Route path='/kunstwerk/:kunstwerkId' element={<NewKunstwerkPage />} />
          <Route path='/kunstwerk/:kunstwerkId/edit' element={<KunstwerkEdit />} />
          <Route path='/kunstwerk/create' element={<KunstwerkCreate />} />
          <Route path='/kunstwerk/list' element={<KunstwerkListPage />} />
          <Route path='/news' element={<NewNewsPage />} />
          <Route path='/newsletterTest' element={<NewsletterTestPage />} />
          <Route path='/newsletter/list' element={<NewsletterListPage />} />
          <Route path='/newsletter/create' element={<NewsletterCreate />} />
          <Route path='/newsletter/:newsletterId/edit' element={<NewsletterEdit />} />
          <Route path='/unsub/:mailId' element={<NewsUnsubPage />} />
          <Route path='/' element={<NewHomePage />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
        <Footer />
      </React.StrictMode>
    </AdminIDContext.Provider>
  );
}

export default App;