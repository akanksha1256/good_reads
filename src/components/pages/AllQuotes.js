import QuoteList from '../quotes/QuoteList';
// import { DUMMY_QUOTES } from '../../constants/DUMMY_QUOTES';
import useHttp from '../../hooks/use-http';
import { getAllQuotes } from '../../lib/api';
import { useEffect } from 'react';
import LoadingSpinner from '../UI/LoadingSpinner';
import NoQuotesFound from '../quotes/NoQuotesFound';

const AllQuotes = () => {
  const { sendRequest, status, data, error } = useHttp(getAllQuotes, true);
  useEffect(() => {
    sendRequest();
  }, [sendRequest]);
  if (status === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return (
      <div className='centered focused'>
        <p>{error}</p>
      </div>
    );
  }
  return (
    <div>
      {data === null || data.length === 0 ? (
        <NoQuotesFound />
      ) : (
        <QuoteList quotes={data} />
      )}
    </div>
  );
};

export default AllQuotes;
