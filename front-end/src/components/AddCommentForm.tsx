/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from 'axios';
import { useState } from 'react';
import useUser from '../auth/useUser';

function AddCommentForm({ projectLink, onProjectUpdated, comments }: any) {
  const user = useUser();
  const [commentText, setCommentText] = useState('');

  const addComment = async () => {
    const response = await axios.post(`/api/projects/${projectLink}/comments`, {
      postedBy: user.first_name,
      text: commentText,
    });
    const updatedProject = response.data;
    onProjectUpdated(updatedProject);
    setCommentText('');
  };

  return (
    <main className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
          {typeof comments !== 'undefined'
            ? `Discussion (${comments.length})`
            : 'Discussion 0'}
        </h2>
      </div>
      <form className="mb-6">
        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <label htmlFor="comment" className="sr-only">
            Your comment
          </label>
          <textarea
            id="comment"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            rows={6}
            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
            placeholder="Write a comment..."
            required
          />
        </div>
        <button
          type="submit"
          onClick={addComment}
          className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
        >
          Post comment
        </button>
      </form>
    </main>
  );
}

export default AddCommentForm;
