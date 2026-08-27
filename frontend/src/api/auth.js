const API_BASE_URL = 'http://localhost:8000/api/auth';

/**
 * Registers a new user with email and password.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<object>} JSON response from backend server
 */
export const registerUser = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMsg =
      data.detail ||
      data.message ||
      (typeof data === 'object' ? Object.values(data).flat().join(' ') : 'Registration failed');
    throw new Error(errorMsg);
  }

  return data;
};

/**
 * Logs in a user with email and password.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<object>} JSON response containing access and refresh tokens
 */
export const loginUser = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMsg =
      data.detail ||
      data.message ||
      (typeof data === 'object' ? Object.values(data).flat().join(' ') : 'Invalid credentials');
    throw new Error(errorMsg);
  }

  return data;
};
