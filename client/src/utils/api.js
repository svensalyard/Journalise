export const getAllUsers = () => {
  return fetch('/api/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const createUser = (userData) => {
  return fetch('/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const updateUser = (userData) => {
  return fetch('/api/user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const getSingleUser = (userId) => {
  return fetch(`/api/user/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const deleteSingleUser = (userId) => {
  return fetch(`/api/user/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const createPost = (postData) => {
  return fetch(`/api/post/${postData}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });
};

export const getAllPosts = () => {
  return fetch('/api/post', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getSinglePost = () => {
  return fetch(`/api/post/${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const updatePost = (postData) => {
  return fetch('/api/post', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });
};

export const deleteSinglePost = (postId) => {
  return fetch(`/api/post/${postId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const createCategory = (categoryData) => {
  return fetch(`/api/category/${categoryData}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoryData),
  });
};

export const getAllCategories = () => {
  return fetch('/api/category', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getSingleCategory = () => {
  return fetch(`/api/category/${categoryId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const updateCategory = (categoryData) => {
  return fetch('/api/category', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoryData),
  });
};

export const deleteSingleCategory = (categoryId) => {
  return fetch(`/api/category/${categoryId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};