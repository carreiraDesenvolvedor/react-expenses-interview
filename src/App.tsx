import React from 'react';
import './App.css';
import BooksListPage from './pages/books-list';
import MainLayout from './layouts/main';
import BooksProvider from './contexts/Books';
import BooksSelectionProvider from './contexts/BooksSelection';

function App() {
  return (
    <div className="App">
      <MainLayout>
        <BooksProvider>
          <BooksSelectionProvider>
            <BooksListPage />
          </BooksSelectionProvider>
        </BooksProvider>
      </MainLayout>
    </div>
  );
}

export default App;
