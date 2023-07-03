import React, { useCallback } from "react";

import { useSelector } from "react-redux";
import { Post } from "./Post";
import { useNavigate } from "react-router-dom";
import { Dialog } from "../Dialog /Dialog";
export const Posts = () => {
  const { posts } = useSelector((state) => state.socialReducer);

  const navigate = useNavigate();

  const handleUserClick = useCallback(
    (id) => {
      navigate(`/Users/${id}`);
    },
    [navigate]
  );

  return (
    <div className="posts-contianer">
      {posts &&
        posts.length > 0 &&
        posts.map((post, i) => (
          <Post
            {...post}
            key={`${post._id}--${i}`}
            handleUserClick={handleUserClick}
          />
        ))}
      <Dialog />
    </div>
  );
};
