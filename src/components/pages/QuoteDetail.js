import { useEffect } from 'react';
import { useParams, Outlet } from 'react-router-dom';
// import Comments from '../comments/Comments';
import HighlightedQuote from '../quotes/HighlightedQuote';
import NoQuotesFound from '../quotes/NoQuotesFound';
import LoadingSpinner from '../UI/LoadingSpinner';
import useHttp from '../../hooks/use-http';
import { getSingleQuote } from '../../lib/api';

const QuoteDetail = () => {
  const params = useParams();
  const {
    sendRequest,
    data: quote,
    status,
    error,
  } = useHttp(getSingleQuote, true);
  // const quote = DUMMY_QUOTES.find((item) => item.id === params.quoteId);
  const { quoteId } = params;

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === 'pending') {
    return <LoadingSpinner />;
  }
  if (error) {
    <div className='focused centered'>
      <p>{error}</p>
    </div>;
  }
  if (status === 'completed' && quote === null) {
    return <NoQuotesFound />;
  }
  return (
    <>
      <HighlightedQuote text={quote.text} author={quote.author} id={quote.id} />
      <Outlet />
    </>
  );
};

export default QuoteDetail;
