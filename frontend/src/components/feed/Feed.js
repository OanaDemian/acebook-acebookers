import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import CreatePost from "../createPost/CreatePost";
import Navbar from "../navbar/Navbar";

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  // This is triggered whenever the page is loaded as token exists
  // Changing the state of the posts and token hooks
  useEffect(() => {
    if (token) {
      fetch("https://acebookers-5bku.onrender.com/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setPosts(data.posts);
        });
    }
  }, [token]);

  if (token) {
    return (
      <>
        <Navbar />
        <body className="text-center">
          <main className="col-md-6  mx-auto">
            <div className="container-fluid">
              <div className="card">
                <CreatePost setPosts={setPosts} token={token} />
              </div>
              <br></br>
              <br></br>
              <div className="card">
                <div className="container-fluid " id="feed" role="feed">
                  {/*  <h4 className="bg-primary-subtle text-emphasis-primary">Posts</h4> */}
                  {/* {console.log(posts)} */}
                  {posts.map((post) => (
                    <Post
                      post={post}
                      token={token}
                      setPosts={setPosts}
                      key={post._id}
                    />
                  ))}
                </div>
              </div>
            </div>
          </main>
        </body>
      </>
    );
  } else {
    navigate("/signin");
  }
};

export default Feed;
