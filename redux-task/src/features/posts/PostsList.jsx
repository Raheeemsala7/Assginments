import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, addPost, deletePost } from "./postsSlice";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";


const schema = yup.object().shape({
  title: yup.string().required("Title is required").min(3, "Minimum 3 characters"),
  body: yup.string().required("Body is required").min(10, "Minimum 10 characters"),
});
const PostsList = () => {
  const dispatch = useDispatch();



  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })


  const posts = useSelector((state) => state.postsData.posts);
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const handleAddPost = (data) => {
    dispatch(addPost(data)).then(() => {
      reset();
      toast.success("Post added successfully");
    });
  };

  const handleDeletePost = (id) => {
    dispatch(deletePost(id)); 
  };


  return (
    <>
      <div className="posts-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {posts &&
                posts.map((post) => (
                  <div className="card post-item" key={post.id}>
                    <div className="card-body">
                      <h5>
                        {post.id} -    <Link to={`/post/${post.id}`}>{post.title}</Link>
                      </h5>
                      <p className="card-text">{post.body}</p>
                      <div className="postControlButtons">
                        <button className="btn btn-primary">
                          <FontAwesomeIcon icon={faEdit} /> Update
                        </button>
                        <button className="btn btn-danger" onClick={() => handleDeletePost(post.id)}>
                          <FontAwesomeIcon icon={faTrash} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="col-lg-4">
              <div className="add-post-form">
                <form onSubmit={handleSubmit(handleAddPost)}>
                  <input
                    type="text"
                    className={`form-control mb-2 ${errors.title ? "is-invalid" : ""}`}
                    placeholder="Title"
                    {...register("title")}
                  />
                  {errors.title && <p className="text-danger">{errors.title.message}</p>}

                  <textarea
                    className={`form-control mb-2 ${errors.body ? "is-invalid" : ""}`}
                    placeholder="Body"
                    rows="4"
                    {...register("body")}
                  />
                  {errors.body && <p className="text-danger">{errors.body.message}</p>}

                  <button className="btn btn-success" type="submit">
                    <FontAwesomeIcon icon={faPlus} /> Add Post
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default PostsList;
