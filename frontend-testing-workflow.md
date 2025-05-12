# Frontend Testing Workflow

Use this workflow to thoroughly test the frontend functionality with our backend.

## Prerequisites

1. Make sure the backend is running on port 8082:
   ```bash
   cd /Users/jo/Repo/moka_ftp/backend_server
   ./gradlew bootRun
   ```

2. Start the frontend development server:
   ```bash
   cd /Users/jo/Repo/moka_ftp/frontend_client
   npm run dev
   ```

3. Open the frontend application in your browser:
   http://localhost:5173

## Test Scenarios

### Scenario 1: Login with Debug Mode

1. Navigate to http://localhost:5173/login
2. Enter the following credentials:
   - Host: localhost
   - Port: 21
   - Username: test
   - Password: password
3. Click "Sign In"
4. Expected result:
   - You should see a success message
   - You should be redirected to the FTP Browser page
   - The navigation bar should show "Browse Files" and "Logout" options

### Scenario 2: Test Directory Browsing

1. After logging in, you should see the FTP Browser screen
2. The browser should display mock files and folders:
   - documents (folder)
   - images (folder)
   - readme.txt (file)
3. Click on the "documents" folder
4. Expected result:
   - You should navigate to the documents directory
   - You should see the file listing for the documents folder:
     - report.pdf
     - spreadsheet.xlsx
5. Click on the "Root" breadcrumb
6. Expected result:
   - You should navigate back to the root directory
   - You should see the initial files and folders again

### Scenario 3: Test Authentication Persistence

1. Refresh the page after logging in
2. Expected result:
   - You should remain logged in
   - You should still see the FTP Browser screen

### Scenario 4: Test Logout

1. Click "Logout" in the navigation bar
2. Expected result:
   - You should be redirected to the home page
   - The navigation bar should show "Login" option
   - If you try to access /browse directly, you should be redirected to the login page

## Fixing Common Issues

### CORS Issues

If you encounter CORS errors, make sure the backend has the correct CORS configuration. 
The WebConfig.java file should have proper CORS settings.

### Authentication Issues

If login is not working:
1. Check browser console for errors
2. Verify that the backend is running on the correct port (8082)
3. Ensure the login credentials match the debug mode credentials in the backend

### FTP Browser Issues

If the directory listing isn't working:
1. Check if you're properly authenticated (token is stored)
2. Verify the FTP service is making requests to the correct endpoint
3. Check if the backend debug mode is enabled
