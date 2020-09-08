import { useMutation } from 'urql';
import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import styles from '../styles/CommentSection.module.css';

const addCommentMutation = `
  mutation ($comment: String!) {
    addf1comment (comment: $comment) {
      comment
      id
    }
  }
`;

const AddComment = (props) => {
  //Using state hook for user comment. comment is used to add to table
  const [comment, setComment] = useState();

  //Hook for adding comment
  const [addCommentResult, addComment] = useMutation(addCommentMutation);
  
console.log(comment);

  const addCommentHandler = () => {
    addComment({comment: comment}).then(result => {
      console.log(result);
      if (result.error) {
        console.error('Oh no!', result.error);
      }
    });
  };

  return(
    <div>
      <form noValidate autoComplete="off">
        <TextField className={styles.commentbox} id="outlined-basic" label="Leave a comment" variant="outlined" onChange={(e)=>setComment(e.target.value)}/>
        <Button size="small" variant="contained" color="primary" name="AddComment" onClick={addCommentHandler}>Post Comment</Button>
      </form>
    </div>
  )
}

export default AddComment;