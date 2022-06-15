import { Fragment } from 'react';
import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';
import { useNavigate, useLocation } from 'react-router-dom';

const QuoteList = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const sortQuotes = (quotes, ascending) => {
    return quotes.sort((quoteA, quoteB) => {
      if (ascending) {
        return quoteA.id > quoteB.id ? 1 : -1;
      } else {
        return quoteA.id < quoteB.id ? 1 : -1;
      }
    });
  };

  const isAsc = queryParams.get('sort') === 'asc';

  const sortChangeHandler = () => {
    navigate(`${location.pathname}?sort=${isAsc ? 'desc' : 'asc'}`);
  };

  const sortedList = sortQuotes(props.quotes, isAsc);

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={sortChangeHandler}>
          Sort by {isAsc ? 'Oldest' : 'Newest'} first
        </button>
      </div>

      <ul className={classes.list}>
        {sortedList.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
