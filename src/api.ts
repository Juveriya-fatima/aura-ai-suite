const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// For login
export async function login(data: any) {
  const response = await fetch(${BASE_URL}/login, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  });
  return response.json();
}

// For signup
export async function signup(data: any) {
  const response = await fetch(${BASE_URL}/signup, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  });
  return response.json();
}

// Get user profile
export async function getProfile() {
  const response = await fetch(${BASE_URL}/profile, {
    method: "GET",
    credentials: "include",
  });
  return response.json();
}

// Save form data
export async function saveForm(data: any) {
  const response = await fetch(${BASE_URL}/submit-form, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  });
  return response.json();
}

// AI Feature Example
export async function analyzeResume(data: any) {
  const response = await fetch(${BASE_URL}/analyze-resume, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  });
  return response.json();
}
