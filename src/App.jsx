import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { ToastProvider } from './context/ToastContext';
import { EventProvider } from './context/EventContext';
import { RegistrationProvider } from './context/RegistrationContext';
import { BookmarkProvider } from './context/BookmarkContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Toast from './components/common/Toast';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <ToastProvider>
          <EventProvider>
            <RegistrationProvider>
              <BookmarkProvider>
                <div className="min-h-screen flex flex-col bg-[#0b0c13] text-slate-100 selection:bg-rose-600 selection:text-white">
                  
                  {/* Sticky Top Navigation */}
                  <Navbar />

                  {/* Main Page Content */}
                  <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <AppRoutes />
                  </main>

                  {/* Footer */}
                  <Footer />

                  {/* Global Toast Alerts */}
                  <Toast />

                </div>
              </BookmarkProvider>
            </RegistrationProvider>
          </EventProvider>
        </ToastProvider>
      </UserProvider>
    </BrowserRouter>
  );
}
