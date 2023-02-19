import React, { useEffect, useState } from "react";
import Comment from "../comment/Comment";
import CreateComment from "../createComment/CreateComment";

const Comments = ({ post_id }) => {
  const [comments, setComments] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  // This is triggered whenever the page is loaded as token exists
  // Changing the state of the comments and token hooks
  useEffect(() => {
    if (token) {
      fetch("https://acebookers-5bku.onrender.com/comments", {
        headers: {
          Authorization: `Bearer ${token}`,
          post_id: `${post_id}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          window.localStorage.setItem("token", data.token);
          setToken(data.token);
          setComments(data.comments);
        });
    }
  }, [token, post_id]);

  return (
    <>
    
      <div id="comments">
  
        {comments
          .filter((comment) => comment.post_id === post_id)
          .map((comment) => (
            <Comment comment={comment} key={comment._id} post_id={post_id}  />
          ))}
      </div>
      <br></br>
      <div className="container-fluid">

      <CreateComment post_id={post_id} token={token} setToken={setToken} setComments={setComments}/>
      </div>
      <br></br>
    </>
  );
};

export default Comments;
