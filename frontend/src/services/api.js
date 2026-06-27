/**
 * Centralized API client for SmartTrip Planner.
 * Provides helper functions for making authenticated HTTP requests
 * to the FastAPI backend.
 */

const BASE_URL = '/api';

/**
 * Get the stored JWT token from localStorage.
 * @returns {string|null} The JWT token or null.
 */
function getToken() {
  return localStorage.getItem('smarttrip_token');
}

/**
 * Build request headers with optional JWT authorization.
 * @param {boolean} auth - Whether to include the Authorization header.
 * @returns {HeadersInit} The headers object.
 */
function buildHeaders(auth = true) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
}

/**
 * Parse the API response and throw on error status codes.
 * @param {Response} response - The fetch Response object.
 * @returns {Promise<any>} The parsed JSON data.
 * @throws {Error} With the error message from the API.
 */
async function handleResponse(response) {
  // 204 No Content — no body to parse
  if (response.status === 204) {
    return null;
  }

  let data;
  const text = await response.text();
  try {
    data = text ? JSON.parse(text) : {};
  } catch (err) {
    data = { detail: text || `Request failed with status ${response.status}` };
  }

  if (!response.ok) {
    const message = data.detail || data.message || `Request failed with status ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

// ── API Methods ──────────────────────────────────────────────────────────────

/**
 * Make an authenticated GET request.
 * @param {string} endpoint - The API endpoint path (e.g., '/trips').
 * @returns {Promise<any>} The response data.
 */
export async function apiGet(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: buildHeaders(),
  });
  return handleResponse(response);
}

/**
 * Make an authenticated POST request.
 * @param {string} endpoint - The API endpoint path.
 * @param {object} body - The request body to send as JSON.
 * @param {boolean} [auth=true] - Whether to include auth header.
 * @returns {Promise<any>} The response data.
 */
export async function apiPost(endpoint, body, auth = true) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: buildHeaders(auth),
    body: JSON.stringify(body),
  });
  return handleResponse(response);
}

/**
 * Make an authenticated PUT request.
 * @param {string} endpoint - The API endpoint path.
 * @param {object} body - The request body to send as JSON.
 * @returns {Promise<any>} The response data.
 */
export async function apiPut(endpoint, body) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'PUT',
    headers: buildHeaders(),
    body: JSON.stringify(body),
  });
  return handleResponse(response);
}

/**
 * Make an authenticated DELETE request.
 * @param {string} endpoint - The API endpoint path.
 * @returns {Promise<any>} null on success (204).
 */
export async function apiDelete(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'DELETE',
    headers: buildHeaders(),
  });
  return handleResponse(response);
}
