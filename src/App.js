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
// function App () {
//     return (<ChatPage/>);
// }

export default App;
