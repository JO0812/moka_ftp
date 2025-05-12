import axios from 'axios';

const API_URL = 'http://localhost:8082/api/auth'; // Backend running on port 8082

export interface LoginResponseDto {
  success: boolean;
  message: string;
  token?: string;
}

export const login = async (
  host: string,
  port: number,
  username: string,
  password: string
): Promise<LoginResponseDto> => {
  try {
    const response = await axios.post<LoginResponseDto>(
      `${API_URL}/login`,
      { host, port, username, password }
    );
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data as LoginResponseDto; // Backend might send error details in data
    }
    // Network error or other unexpected issue
    throw new Error(
      error.message || 'A network error occurred. Please try again.'
    );
  }
};