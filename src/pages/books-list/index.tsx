import React, { FC, ReactElement } from 'react';
import InfiteScroll, {
  InfiniteScrollItemType,
} from '../../components/infinite-scrool';
import './style.css';
import {
  useBooksProvider,
} from '../../contexts/Books';
import { apiBooksListRequest } from '../../api/books/list';
import { useBooksSelectionProvider } from '../../contexts/BooksSelection';

const BooksListPage: FC = (): ReactElement => {
  
  const {
    values: { request },
    setSuccessRequest,
    setLoading
  } = useBooksProvider();

  const fetchBooks = () => {
    if (request.isLoading) return false;
    setLoading(true);

    apiBooksListRequest({
      page: request.page,
      onSuccess: (response) => {
        setSuccessRequest(response.results);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const {
    getTotal: getTotalBooksSelected,
    clearSelection: clearBooksSelected
  } = useBooksSelectionProvider();

  return (
    <section
      className="book-list-container"
      aria-label="Books list"
    >
      <div className="book-list-container-header">
        <h1>Books</h1>
      </div>
      <div className='book-list-container-counter'>
        <h3 data-testid='counter-title'>{request.list.length ?? 0}({getTotalBooksSelected()} selected)</h3>
        <div>
          <button disabled={getTotalBooksSelected() === 0} onClick={()=>clearBooksSelected()}>Clear Selection</button>
        </div>
      </div>
      <div className="book-list-container-list">
        <InfiteScroll
          currentPage={request.page}
          fetchData={fetchBooks}
          itemType={InfiniteScrollItemType.book}
          isLoading={request.isLoading}
          list={request.list}
          loadingMessage="Fetching books..."
        />
      </div>
    </section>
  );
};

export default BooksListPage;
