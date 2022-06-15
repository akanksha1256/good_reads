import { useRef, useEffect } from 'react';
import useHttp from '../../hooks/use-http';
import { addComment } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './NewCommentForm.module.css';

const NewCommentForm = (props) => {
  const { sendRequest, status, error } = useHttp(addComment);
  const commentTextRef = useRef();

  const submitFormHandler = async (event) => {
    event.preventDefault();
    await sendRequest({
      text: commentTextRef.current.value,
      quoteId: props.quoteId,
    });
  };
  const { addNewCommentHandler } = props;
  useEffect(() => {
    addNewCommentHandler();
  }, [status, error, addNewCommentHandler]);

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === 'pending' && (
        <div className='centered'>
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
