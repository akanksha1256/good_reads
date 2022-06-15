import {useParams} from 'react-router-dom';
import {useState, useEffect, useCallback} from 'react';
import useHttp from '../../hooks/use-http';
import {getAllComments} from '../../lib/api';
import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import CommentsList from './CommentsList';
import LoadingSpinner from '../UI/LoadingSpinner';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();
  const {sendRequest, data, status, error} = useHttp(getAllComments);

  const {quoteId} = params;
  useEffect(() => {
    const fetchAllComments = async () => {
      await sendRequest(quoteId);
    };
    fetchAllComments();
  }, [quoteId, sendRequest]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  const addNewCommentHandler = useCallback(() => {
    sendRequest(quoteId);
    // setIsAddingComment(false);
  }, [quoteId, sendRequest]);

  let retElem = <p>No Comment found. Add new comment.</p>;
  if (status === 'pending') {
    retElem = (
      <div className='centered'>
        <LoadingSpinner/>
      </div>
    );
  }
  if (status === 'completed' && data.length > 0 && error === null) {
    retElem = <CommentsList comments={data}/>;
  }
  if (error) {
    retElem = <p>Unable to fetch comments. Please try again.</p>;
  }

  return (
    <section className={
      classes.comments
    }>
      <h2>User Comments</h2>
      {
      !isAddingComment && (
        <button className='btn'
          onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )
    }
      {
      isAddingComment && (
        <NewCommentForm quoteId={quoteId}
          addNewCommentHandler={addNewCommentHandler}/>
      )
    }
      {/* <p>Comments...</p> */}
      {retElem} </section>
  );
};

export default Comments;
