import QuoteForm from '../quotes/QuoteForm';
import { useNavigate } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import { addQuote } from '../../lib/api';
import { useEffect } from 'react';

const NewQuote = () => {
  const navigate = useNavigate();
  const { sendRequest, status } = useHttp(addQuote);

  useEffect(() => {
    if (status === 'completed') {
      navigate('/quotes');
    }
  }, [status, navigate]);

  const onAddQuote = (newQuote) => {
    // console.log('new quote data', newQuote);
    sendRequest(newQuote);
  };
  return <QuoteForm onAddQuote={onAddQuote} isLoading={status} />;
};

export default NewQuote;
