import CommentModel from "../Models/comment";
const CommentPage: React.FC<{ comment: CommentModel }> = ({ comment }) => {
  console.log(comment);
  return (
    <div>
      comment
      {/* <strong>
        {comment.name} • {comment.email}
      </strong>
      <p>{comment.body}</p>
      <br /> */}
    </div>
  );
};

export default CommentPage
