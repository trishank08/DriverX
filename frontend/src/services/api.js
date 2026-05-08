const BASE_URL = 'http://localhost:5000/api';

const request = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Something went wrong');
  return data;
};

// Car Models
export const getFeaturedModels = () => request('/models/featured');
export const getAllModels = (category = '') => {
  const query = category ? `?category=${category}` : '';
  return request(`/models${query}`);
};
export const getModelById = (id) => request(`/models/${id}`);

// Newsletter
export const subscribeNewsletter = (email, firstName = '', interests = []) =>
  request('/newsletter/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email, firstName, interests }),
  });

// Image Upload
export const uploadImage = async (file, usedIn = 'other') => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('usedIn', usedIn);
  const response = await fetch(`${BASE_URL}/upload`, {
    method: 'POST',
    body: formData,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Upload failed');
  return data;
};