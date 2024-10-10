import axios, { AxiosError } from 'axios';

export async function apiFetch<T>(url: string, json?: Record<string, unknown>, method?: string): Promise<T> {
  method ??= json ? "POST" : "GET";

  try {
    const token = localStorage.getItem('jwtToken');
    const response = await axios({
      url: `http://127.0.0.1:8000/api${url}`,
      method,
      data: json,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      },
      withCredentials: true, // pour inclure les cookies
    });

    return response.data as T; // axios retourne directement les données JSON

  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new ApiError(error.response.status, error.response.data);
    }
    throw error; // pour toute autre erreur (réseau, etc.)
  }
}

class ApiError extends Error {
  constructor(public status: number, public data: Record<string, unknown>) {
    if(status === 401) {
      localStorage.removeItem('account')
      window.location.reload()
    }
    super(`API Error: ${status}`);
  }
}
