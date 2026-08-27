const API_BASE_URL = 'http://localhost:8000/api/shop/';

/**
 * Creates a new shop instance for the authenticated user.
 * @param {object} shopData - Object containing shop name, business type, and selected features
 * @param {string} token - JWT access token
 * @returns {Promise<object>} JSON response containing created shop details and feature config
 */
export const createShop = async (shopData, token) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify(shopData),
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMsg =
      data.detail ||
      data.message ||
      (typeof data === 'object' ? Object.values(data).flat().join(' ') : 'Failed to create shop');
    throw new Error(errorMsg);
  }

  return data;
};
