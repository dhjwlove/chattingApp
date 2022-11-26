import React from 'react';
// import ChatTest from './ChatTest';
import ChatPage from './pages/ChatPage';
import ErrorBoundary from './ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <ChatPage />
    </ErrorBoundary>
  );
}
export default App;
