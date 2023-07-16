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
    <div>
      <h3>Add a comment</h3>
      <label htmlFor="name">
        Name:
        <input
          // to way binding betweem input & state
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        />
      </label>
      <label htmlFor="comment">
        Comment:
        <textarea
          id="comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          rows={4}
          cols={50}
        />
      </label>
      <button className="" onClick={addComment} type="submit">
        Add Comment
      </button>
    </div>
  );
}

export default AddCommentForm;
