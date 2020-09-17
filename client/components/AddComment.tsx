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
  const [localComment,setLocalComment] = useState();
 
  //Hook for adding comment
  const [addCommentResult, addComment] = useMutation(addCommentMutation);
  

  //Function executed on POST COMMENT click
  const addCommentHandler = () => {
    //Set my comment state with local state
    props.setComment(localComment);
    props.setLocalComments(
      [...props.localComments, 
        {
          comment: localComment, 
          id: (new Date()).toString()
        }
      ]
    );
    //Add comment to Database
    addComment({comment: localComment}).then(result => {
      console.log(result);
      if (result.error) {
        console.error('Oh no!', result.error);
      }
    });

    //Query once again for comments
    //props.reFetch({ requestPolicy: 'network-only' });
  };


  return(
    <div>
      <form noValidate autoComplete="off">
        <TextField 
          className={styles.commentbox} 
          id="outlined-basic" 
          label="Leave a comment" 
          variant="outlined" 
          onChange={(e)=>setLocalComment(e.target.value)}
        />
        <Button 
          size="small" 
          variant="contained" 
          color="primary" 
          name="AddComment" 
          onClick={addCommentHandler}
        >
          Post Comment
        </Button>
      </form>
    </div>
  )
}

export default AddComment;