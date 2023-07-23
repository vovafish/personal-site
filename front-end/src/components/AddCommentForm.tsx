import axios from 'axios';
import { useState } from 'react';

function AddCommentForm({ projectLink, onProjectUpdated }: any) {
  const [name, setName] = useState('');
  const [commentText, setCommentText] = useState('');

  const addComment = async () => {
    const response = await axios.post(`/api/projects/${projectLink}/comments`, {
      postedBy: name,
      text: commentText,
    });
    const updatedProject = response.data;
    onProjectUpdated(updatedProject);
    setName('');
    setCommentText('');
  };
  return (
    <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">Add a comment</h3>
      <label htmlFor="name" className="block mb-2">
        Name:
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-lg px-3 py-2"
        />
      </label>
      <label htmlFor="comment" className="block mb-2">
        Comment:
        <textarea
          id="comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          rows={4}
          cols={50}
          className="w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-lg px-3 py-2"
        />
      </label>
      <button
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={addComment}
        type="submit"
      >
        Add Comment
      </button>
    </div>
  );
}

export default AddCommentForm;
