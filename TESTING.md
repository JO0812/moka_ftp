# Manual Testing Guide for Moka FTP Client

This guide explains how to manually test the login functionality of the Moka FTP Client.

## Prerequisites

1. Backend server running on port 8082
2. Frontend client running on the default port (typically 3000 or 5173, depending on your setup)

## Starting the Servers

### Backend Server

1. Navigate to the backend directory:
```bash
cd /Users/jo/Repo/moka_ftp/backend_server
```

2. Start the Spring Boot server:
```bash
./gradlew bootRun
```

3. Verify the server starts without errors and is running on port 8082

### Frontend Client

1. Navigate to the frontend directory:
```bash
cd /Users/jo/Repo/moka_ftp/frontend_client
```

2. Install dependencies (if not already installed):
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

## Testing Login Functionality

### Test Case 1: Debug Mode Login (No FTP Server Required)

1. Open your web browser and navigate to the frontend application (e.g., http://localhost:5173).
2. Click on the "Login" link in the navigation bar.
3. Fill in the login form with the following test credentials:
   - Host: `localhost`
   - Port: `21`
   - Username: `test`
   - Password: `password`
4. Click the "Sign In" button.
5. Expected result: 
   - Success message is displayed: "Login successful!"
   - You are redirected to the /browse page
   - The navigation bar shows "Browse Files" and "Logout" options instead of "Login"

### Test Case 2: Invalid Credentials

1. If not already on the login page, click "Logout" then "Login" in the navigation bar.
2. Fill in the login form with the following invalid credentials:
   - Host: `localhost`
   - Port: `21`
   - Username: `invalid`
   - Password: `wrong`
3. Click the "Sign In" button.
4. Expected result: 
   - Error message is displayed indicating login failure
   - You remain on the login page

### Test Case 3: Authentication Persistence

1. Login successfully with test credentials as in Test Case 1.
2. Refresh the page.
3. Expected result:
   - You should still be logged in (not redirected back to login page)
   - The /browse page should still be accessible

### Test Case 4: Logout Functionality

1. Login successfully with test credentials as in Test Case 1.
2. Click on the "Logout" button in the navigation bar.
3. Expected result:
   - You are redirected to the homepage
   - The navigation bar shows the "Login" option instead of "Browse Files" and "Logout"
   - Attempting to navigate directly to /browse (by typing in the URL) should redirect you to login

## Testing Directory Listing (Debug Mode)

1. Login successfully with test credentials as in Test Case 1.
2. On the /browse page, you should see a mock directory listing showing:
   - folders: "documents" and "images"
   - file: "readme.txt"
3. Navigate into the "documents" folder by clicking on it.
4. Expected result:
   - You should see files: "report.pdf" and "spreadsheet.xlsx"

## Troubleshooting Common Issues

### Backend Connection Issues

If the frontend cannot connect to the backend:

1. Verify the backend server is running on port 8082
2. Check that CORS is properly configured in the backend
3. Inspect network requests in the browser developer tools for detailed error messages

### JWT Token Issues

If authentication is not persisting or tokens are being rejected:

1. Check browser localStorage to ensure the token is properly saved
2. Verify the token format matches what the backend expects
3. Check the token expiration time in the JwtTokenProvider class
