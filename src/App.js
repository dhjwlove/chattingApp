import React from 'react';
// import ChatTest from './ChatTest';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
// import ChatListPage from './pages/ChatListPage';
import LoginPage from './pages/LoginPage';
import ErrorBoundary from './ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/loginPage" element={<LoginPage />} />
          <Route path="/chatPage" element={<ChatPage />} />
          <Route exact path="/" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
export default App;
