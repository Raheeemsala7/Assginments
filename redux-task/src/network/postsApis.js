import {  createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  return response.json();
});

export const addPost = createAsyncThunk("posts/addPost", async (newPost) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(newPost),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
});

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    return id; 
  }
  throw new Error("Failed to delete post");
});

