import { useQuery } from 'urql';
import { useState } from 'react';

import styles from '../styles/CommentSection.module.css';

import AddComment from './AddComment';
import DeleteComment from './DeleteComment';

const commentsQuery = `
  query {
    f1comments {
      comment
      id
    }
  }
`;

const CommentSection = (props) => {
  //Querying comments
  const [queryResult, reexecuteQuery] = useQuery({
    query: commentsQuery
  });

  //Deconstructing query result for data
  const {data, fetching, error} = queryResult;

  if (fetching) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Errored!</p>;
  }

  console.log(data);

  return(
    <div className={styles.commentField}>
      <AddComment />
      {
        data.f1comments.map(f1comment => (
          <div className={styles.singleComments}>
            <p>{f1comment.comment}</p>
            <p className={styles.commentID}>
              {f1comment.id} 
              <DeleteComment name={f1comment.id} />
            </p>
          </div>
        ))
      }
    </div>
  )
}

export default CommentSection;