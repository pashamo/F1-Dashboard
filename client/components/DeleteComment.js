import { useMutation } from 'urql';
import Link from '@material-ui/core/Link';

import styles from '../styles/CommentSection.module.css';

const deleteCommentMutation = `
  mutation ($id: String!) {
    deletef1comment (id: $id) {
      comment
      id
    }
  }
`;

const DeleteComment = (props) => {
  //Hook for deleting comment
  const [deleteCommentResult, deleteComment] = useMutation(deleteCommentMutation);

  const deleteCommentHandler = (e) => {
    e.preventDefault();
    let name = {id: e.target.getAttribute('name')};
    deleteComment(name).then(result => {
      console.log(result);
      if (result.error) {
        console.error('Oh no!', result.error);
      }
    });
  };


  return(
    <div className={styles.deleteLink}>
      <Link name={props.name} href="#" onClick={deleteCommentHandler}> Delete Comment</Link>
    </div>
  )
}

export default DeleteComment;