import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { BottomNav } from './components/layout/BottomNav';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { JournalListPage } from './pages/JournalListPage';
import { JournalDetailPage } from './pages/JournalDetailPage';
import { BucketListPage } from './pages/BucketListPage';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';
import { JournalFormModal } from './components/forms/JournalFormModal';
import { BucketListFormModal } from './components/forms/BucketListFormModal';
import { RandomizerModal } from './components/ui/RandomizerModal';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <div className="min-h-screen flex flex-col bg-cream-50 text-neutral-800 antialiased selection:bg-brand-100 selection:text-brand-900">
          {/* Top Navbar */}
          <Navbar />

          {/* Main Content Area */}
          <main className="flex-1 w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 pt-6 sm:pt-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/jurnal" element={<JournalListPage />} />
              <Route path="/jurnal/:id" element={<JournalDetailPage />} />
              <Route path="/bucket-list" element={<BucketListPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />

          {/* Mobile Bottom Navigation Bar with FAB */}
          <BottomNav />

          {/* Global Interactive Modals */}
          <JournalFormModal />
          <BucketListFormModal />
          <RandomizerModal />
        </div>
      </HashRouter>
    </AppProvider>
  );
};

export default App;
