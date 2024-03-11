import React, { useEffect, useState } from 'react';
import { getAllPosts } from '../utils/api'; 

function PostsList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllPosts();
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setPosts(data.posts); 
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title} - {post.content}</li> 
        ))}
      </ul>
    </div>
  );
}

export default PostsList;
