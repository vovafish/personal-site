interface Comments {
  postedBy: string;
  text: string;
}

function CommentsList({ comments }: { comments: Comments[] }) {
  return (
    <>
      <h3>Comments:</h3>
      {comments?.map((comment: Comments) => (
        <div className="" key={`${comment.postedBy}: ${comment.text}`}>
          <h4>{comment?.postedBy}</h4>
          <p>{comment?.text}</p>
        </div>
      ))}
    </>
  );
}

export default CommentsList;
