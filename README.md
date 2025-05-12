# Moka FTP Client

A mobile-friendly FTP client for browsing and managing remote files.

## Technologies Used

### Frontend
- **React** (v18.3) - UI framework
- **TypeScript** (v5.4) - Type-safe JavaScript
- **Material UI** (v5.15) - UI component library
- **React Router DOM** (v6.23) - Navigation and routing
- **Axios** (v1.7) - HTTP client for API requests
- **Vite** (v5.4) - Build tool and development server

### Backend
- **Spring Boot** (v3.2.5) - Java application framework
- **Java** (v21) - Programming language
- **Apache Commons Net** (v3.10) - FTP client library
- **JJWT** (v0.11.5) - JWT token creation and validation
- **Gradle** - Build tool

## Project Structure

The application consists of two main components:

1. **Frontend Client**: React-based UI for authentication and FTP browsing
2. **Backend Server**: Spring Boot server that handles FTP operations

## Setup Instructions

### Backend Server

1. Navigate to the backend directory:
   ```bash
   cd backend_server
   ```

2. Run the Spring Boot application:
   ```bash
   ./gradlew bootRun
   ```
   
   The backend will start on port 8082.

### Frontend Client

1. Navigate to the frontend directory:
   ```bash
   cd frontend_client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   
   The frontend will start on port 5173.

## Manual Testing Guide

### Testing Login Functionality

1. **Start both the backend and frontend** using the instructions above.

2. **Open the application** by navigating to `http://localhost:5173` in a browser.

3. **Test debug login**:
   - Enter the following credentials:
     - Host: `localhost` (or any value, as debug mode ignores the host)
     - Port: `21` (or any value, as debug mode ignores the port)
     - Username: `test`
     - Password: `password`
   - Click "Sign In"
   - You should be authenticated and redirected to the browse page

4. **Test invalid credentials**:
   - Enter incorrect credentials (e.g., username: `wrong`, password: `wrong`)
   - You should see an error message

5. **Test against a real FTP server** (if available):
   - Enter valid FTP server details:
     - Host: `<your-ftp-server>`
     - Port: `21` (or your FTP server port)
     - Username: `<your-username>`
     - Password: `<your-password>`
   - Click "Sign In"
   - You should be authenticated and redirected to the browse page

### Testing JWT Token Features

1. **Check token storage**:
   - After successful login, open the browser's developer tools
   - Navigate to Application > Local Storage
   - Verify that `ftp_token` is stored with a JWT value

2. **Test token persistence**:
   - After login, refresh the page
   - You should remain logged in and not be redirected to the login page

3. **Test logout functionality**:
   - Click the "Logout" button in the navigation bar
   - Verify that you're redirected to the home page
   - Check local storage to confirm the token has been removed

### Testing Protected Routes

1. **Access a protected route without authentication**:
   - Logout if you're currently logged in
   - Try to navigate directly to `http://localhost:5173/browse`
   - You should be prevented from accessing the page and see a message to login

2. **Access a protected route with authentication**:
   - Login with valid credentials
   - Navigate to `http://localhost:5173/browse`
   - You should be able to view the browse page

## Troubleshooting

### Backend Issues

- If you see connection errors, verify that the backend server is running on port 8082
- For FTP authentication failures, double-check your FTP server credentials
- For JWT token issues, check the server logs for detailed error information

### Frontend Issues

- If the UI doesn't load, verify that the frontend development server is running
- For CORS errors, ensure that the backend has proper CORS configuration
- For authentication issues, check the browser console for error messages
