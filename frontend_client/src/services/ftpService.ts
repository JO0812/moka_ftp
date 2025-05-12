import axios from 'axios';

const API_URL = 'http://localhost:8082/api/ftp';

export interface FtpFileDto {
  name: string;
  path: string;
  size: number;
  directory: boolean;
  lastModified: string;
  permissions: string;
}

export interface DirectoryListingResponse {
  success: boolean;
  message: string;
  currentPath: string;
  files: FtpFileDto[];
}

export const listDirectory = async (
  host: string,
  port: number,
  username: string,
  password: string,
  path: string = '/',
  token: string
): Promise<DirectoryListingResponse> => {
  try {
    const response = await axios.post<DirectoryListingResponse>(
      `${API_URL}/list`,
      { host, port, username, password, path },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data as DirectoryListingResponse;
    }
    throw new Error(
      error.message || 'A network error occurred while fetching directory listing.'
    );
  }
};
