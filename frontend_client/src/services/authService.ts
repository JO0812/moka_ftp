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
    if (axios.isAxiosError(error)) {
      // Check if there's a response from the server
      if (error.response) {
        return error.response.data as LoginResponseDto; // Backend might send error details in data
      }
      
      // No response received - likely CORS or network issue
      if (error.message.includes('Network Error')) {
        console.error('CORS or network error:', error);
        throw new Error(
          'Unable to connect to the backend server. Please ensure the server is running at http://localhost:8082 and CORS is properly configured.'
        );
      }
    }
    // Other unexpected issues
    throw new Error(
      error.message || 'A network error occurred. Please try again.'
    );
  }
};