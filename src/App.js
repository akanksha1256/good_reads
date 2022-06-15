import React, { Suspense } from 'react';
import { Route, Routes, Navigate, Link } from 'react-router-dom';

import AllQuotes from './components/pages/AllQuotes';
import QuoteDetail from './components/pages/QuoteDetail';
import Layout from './components/layout/Layout';
import Comments from './components/comments/Comments';
import LoadingSpinner from './components/UI/LoadingSpinner';

const NewQuotes = React.lazy(() => import('./components/pages/NewQuote'));
const PageNotFound = React.lazy(() =>
  import('./components/pages/PageNotFound')
);

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className='centered'>
            <LoadingSpinner />
          </div>
        }
      >
        <Routes>
          <Route path='/' element={<Navigate to='/quotes' />} />
          <Route path='/quotes' element={<AllQuotes />} />
          <Route path='/quotes/:quoteId/*' element={<QuoteDetail />}>
            <Route
              path={''}
              element={
                <div className='centered'>
                  <Link to={`comments`} className='btn--flat'>
                    Load Comments
                  </Link>
                </div>
              }
            />
            <Route path={`comments`} element={<Comments />} />
          </Route>
          <Route path='/new-quote' element={<NewQuotes />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
