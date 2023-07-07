import React, { memo, useEffect, useState } from "react";
import Avatar from "../Avatar/Avatar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { likePost, unlikePost } from "../../actions/social";

export const Post = memo(
  ({
    description,
    postBy,
    handleUserClick,
    url,
    _id,
    showDelete,
    handleShareClick,
    handleFollowers,
    handleDelete,
  }) => {
    const user = useSelector((state) => state.currentUserReducer);
    const dispatch = useDispatch();
    const [isFollow, setIsFollow] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    console.log(user);
    useEffect(() => {
      console.log(user, "user in post");
      let isOwner = !user
        ? undefined
        : user.posts?.findIndex((val) => val === _id);
      setIsOwner(isOwner !== undefined && isOwner !== -1 ? true : false);
    }, []);

    useEffect(() => {
      let isFollow = !user
        ? undefined
        : user.followers?.findIndex((val) => val === postBy._id);
      setIsFollow(isFollow !== undefined && isFollow !== -1 ? true : false);
    }, []);

    useEffect(() => {
      let isLiked = !user
        ? undefined
        : user.likedPosts?.findIndex((val) => val === _id);
      setIsLiked(isLiked !== undefined && isLiked !== -1 ? true : false);
    }, []);

    const handleIsLike = () => {
      isLiked ? dispatch(unlikePost(_id)) : dispatch(likePost(_id));
      setIsLiked(!isLiked);
    };

    return (
      <div className="post-container">
        <div className="post-card-header-container">
          <div
            className="post-card-name"
            onClick={() => {
              handleUserClick(postBy._id);
            }}
          >
            <Avatar classname={"avatar-user-nav"}>
              <p>{postBy.name[0]}</p>
            </Avatar>
            <p>{postBy?.name}</p>
          </div>
          {!isOwner ? (
            <button
              className="follow-btn"
              onClick={() => {
                handleFollowers(postBy._id, isFollow);
                setIsFollow(!isFollow);
              }}
            >
              {isFollow ? "unfollow" : "follow"}
            </button>
          ) : (
            showDelete && (
              <button
                className="follow-btn"
                onClick={() => {
                  handleDelete(_id);
                }}
              >
                {"Delete"}
              </button>
            )
          )}
        </div>
        <div className="image">
          <img
            src={url}
            alt={`${postBy.name}-post-${description.slice(0, 10)}`}
            width={"100%"}
            height={"100%"}
            className="post-image"
            loading="lazy"
          />
        </div>
        <section className="post-share-container">
          <FontAwesomeIcon
            icon={isLiked ? faHeart : regularHeart}
            size="xl"
            onClick={() => handleIsLike()}
            className="like-icon"
          />
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            size="lg"
            onClick={() => {
              handleShareClick(_id);
            }}
          />
        </section>
        <div className="post-card-footer-container">
          <p>{description}</p>
        </div>
      </div>
    );
  }
);
