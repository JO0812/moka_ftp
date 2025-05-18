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

### Detailed Project Organization

#### Backend Server (`backend_server/`)

- `src/main/java/com/jo/moka_ftp/`: Main source code directory
  - `MokaFtpApplication.java`: Spring Boot application entry point
  - `config/`: Configuration classes
    - `WebConfig.java`: CORS and web configuration
  - `controller/`: REST API endpoints
    - `AuthController.java`: Authentication endpoints (login)
    - `FtpController.java`: FTP operations endpoints (directory listing)
  - `dto/`: Data Transfer Objects
    - `DirectoryListingRequest.java`: Request model for directory listing
    - `DirectoryListingResponse.java`: Response model with directory contents
    - `FtpFileDto.java`: File/directory item representation
    - `LoginRequest.java`: Login credentials model
    - `LoginResponse.java`: Authentication response with JWT token
  - `infrastructure/ftp/`: FTP client implementation
  - `repository/`: Data access layer
    - `FtpRepository.java`: Repository for FTP operations
  - `security/`: Security-related classes
    - `JwtTokenProvider.java`: JWT token generation and validation
  - `service/`: Business logic layer
    - `AuthService.java`: Authentication service
    - `FtpService.java`: FTP operations service with debug mode support

- `src/main/resources/`: Configuration files
  - `application.properties`: Spring Boot configuration properties

- `build.gradle.kts`: Gradle build configuration with project dependencies

#### Frontend Client (`frontend_client/`)

- `src/`: Source code directory
  - `App.tsx`: Main application component with routing setup
  - `index.tsx`: Application entry point
  - `features/`: Feature modules
    - `auth/`: Authentication related components
      - `LoginScreen.tsx`: Login form and authentication handling
    - `ftp/`: FTP browser components
      - `FtpBrowserScreen.tsx`: Directory browser component
  - `services/`: Reusable services
    - `authContext.tsx`: Authentication state management context
    - `authService.ts`: API client for authentication operations
    - `ftpService.ts`: API client for FTP operations

- `public/`: Static assets and public files
- `vite.config.ts`: Vite build configuration
- `tsconfig.json`: TypeScript compiler configuration
- `package.json`: Project dependencies and scripts

#### Documentation and Configuration Files (Root)

- `README.md`: Project overview and setup instructions
- `Roadmap.md`: Future development plans and features
- `user-guide.md`: User documentation
- `TESTING.md`: Testing procedures and guidelines
- `final-implementation-report.md`: Implementation details and decisions
- `completion-report.md`: Project completion status report

## Setup Instructions

### Running the Application

To run the Moka FTP Client application, you need to start both the backend and frontend services separately.

#### Backend Server

1. Navigate to the backend directory:

   ```bash
   cd backend_server
   ```

2. Run the Spring Boot application:

   ```bash
   ./gradlew bootRun
   ```

   The backend will start on port 8082.

#### Frontend Client

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

The frontend will start on port 5173 or 5174.

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
- For CORS errors:
  - Ensure you're accessing the application from an allowed origin (`http://localhost:5173` or `http://127.0.0.1:5173`)
  - Check that the backend CORS configuration is correctly set up
  - Look for CORS-related error messages in the browser console
- For authentication issues, check the browser console for error messages

### CORS Troubleshooting

If you encounter CORS-related errors:

1. **Check the browser console** for specific CORS error messages
2. **Verify allowed origins** in the backend configuration
3. **Ensure credentials are included** in your frontend requests
4. **Check for typos in URLs** - `localhost` and `127.0.0.1` are treated as different origins

## Developer Guide

### Common Modifications

Here are some common modifications you might need to make to the codebase:

#### Enabling Real FTP Server Connections

By default, the application runs in debug mode, using mock data instead of connecting to a real FTP server:

1. Open `backend_server/src/main/java/com/jo/moka_ftp/service/FtpService.java`
2. Change the `debugMode` flag from `true` to `false`:

   ```java
   private final boolean debugMode = false; // Set to false to enable real FTP server connections
   ```

#### Modifying CORS Configuration

If you need to allow different origins:

1. Open `backend_server/src/main/java/com/jo/moka_ftp/config/WebConfig.java`
2. Edit the `corsFilter` method to add additional origins:

   ```java
   // Add your origin
   config.addAllowedOrigin("http://your-domain.com");
   ```

#### Adding New Features

1. **Backend**:
   - Add new endpoints in `controller/` package
   - Create DTOs in `dto/` package
   - Implement service logic in `service/` package

2. **Frontend**:
   - Create new feature components in `frontend_client/src/features/`
   - Add API methods in `frontend_client/src/services/`
   - Update routes in `frontend_client/src/App.tsx`

#### Security Improvements

For production use:

1. Move JWT secret to environment variables in `JwtTokenProvider.java`
2. Enable HTTPS by configuring SSL in Spring Boot
3. Add rate limiting to prevent brute force attacks
