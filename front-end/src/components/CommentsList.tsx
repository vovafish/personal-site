/* eslint-disable jsx-a11y/anchor-is-valid */

interface Comments {
  postedBy: string;
  text: string;
  date: Date;
}

function CommentsList({ comments }: { comments: Comments[] }) {
  if (comments) {
    return (
      <article className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
        <div className="text-gray-500 dark:text-gray-400">
          {comments?.map((comment) => (
            <div key={`${comment.date}:${comment.text}:${Math.random()}`}>
              <div className="my-4 bg-white rounded-lg p-6">
                <footer className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                      {comment.postedBy}
                    </p>
                    {comment.date ? ( // Add conditional check here
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {comment.date.toString()}
                      </p>
                    ) : null}
                  </div>
                </footer>
                <p className="text-gray-500 dark:text-gray-400">
                  {comment?.text}
                </p>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </article>
    );
  }
  return <p className="text-gray-500 dark:text-gray-400">No comments yet :(</p>;
}

export default CommentsList;
