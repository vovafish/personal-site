/* eslint-disable jsx-a11y/anchor-is-valid */
import useUser from '../auth/useUser';

interface Comments {
  postedBy: string;
  text: string;
}

function CommentsList({ comments }: { comments: Comments[] }) {
  const user = useUser();
  if (comments) {
    return (
      <article className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
        <p className="text-gray-500 dark:text-gray-400">
          {comments?.map((comment) => (
            <div
              className="my-4 bg-white rounded-lg p-6"
              key={`${comment.postedBy}:${comment.text}:${Math.random() * 10}`}
            >
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                    {user.first_name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Time
                  </p>
                </div>
              </footer>
              <p className="text-gray-500 dark:text-gray-400">
                {comment?.text}
              </p>
            </div>
          ))}
        </p>
      </article>
    );
  }
  return <p className="text-gray-500 dark:text-gray-400">No comments yet :(</p>;
}

export default CommentsList;
