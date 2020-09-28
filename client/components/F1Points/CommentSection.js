import { useQuery } from 'urql';
import { useState , useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';


import styles from '../../styles/CommentSection.module.css';

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
  const [comment,setComment] = useState();
  const [localComments,setLocalComments] = useState([]);

  //Querying comments
  const [queryResult, reexecuteQuery] = useQuery({
    query: commentsQuery
  });
  
  //Deconstructing query result for data
  const {data, fetching, error} = queryResult;
  if (fetching) {
    return(
      <div>
        <CircularProgress color="secondary" />
      </div>
    ); 
    //<p>Loading...</p>;
  } 
  if (error) {return <p>Errored!</p>;}
  console.table(data.f1comments);
  console.table(localComments);


  return(
    <div className={styles.commentField}>
      <AddComment 
        comment={comment} 
        setComment={setComment} 
        reFetch={reexecuteQuery}
        setLocalComments={setLocalComments}
        localComments={localComments}
      />
      {
        data.f1comments.map(f1comment => (
          <div className={styles.singleComments} key={f1comment.id}>
            <p>{f1comment.comment}</p>
            <p className={styles.commentID}>
              {f1comment.id} 
              <DeleteComment 
                name={f1comment.id} 
                dbFlag
              />
            </p>
          </div>
        ))
      }
      {
        localComments.map(lcomment => (
          <div className={styles.singleComments} key={lcomment.id}>
            <p>{lcomment.comment}</p>
            <p className={styles.commentID}>
              {lcomment.id} 
              <DeleteComment 
                name={lcomment} 
                localComments={localComments} 
                setLocalComments={setLocalComments}
              />
            </p>
          </div>
        ))
      }
    </div>
  )
}

export default CommentSection;