# Moka FTP Client - User Guide

## Introduction

Moka FTP Client is a web-based application that allows you to connect to FTP servers and browse their file systems. This guide will help you get started with using the application.

## Getting Started

### Accessing the Application

1. Open your web browser and navigate to the application URL (typically `http://localhost:5173` when running locally).
2. You will be presented with the welcome screen.

### Logging In

1. Click on the "Login" button or navigate to the login page.
2. Enter your FTP server credentials:
   - **Host**: The hostname or IP address of your FTP server
   - **Port**: The port number (default is 21)
   - **Username**: Your FTP server username
   - **Password**: Your FTP server password
3. Click "Login" to connect to the FTP server.

> **Note for Testing**: If using the application in debug mode, you can use the following test credentials:
> - **Host**: Any value
> - **Port**: Any value (e.g., 21)
> - **Username**: test
> - **Password**: password

## Using the FTP Browser

After successfully logging in, you will be redirected to the FTP Browser screen. This is where you can navigate through your FTP server's directory structure.

### Directory Navigation

1. **Browsing Folders**:
   - The main area shows a list of files and folders in the current directory
   - Folders are displayed with a folder icon
   - Files are shown with a file icon
   - Each item shows its name, size, modification date, and permissions

2. **Opening Folders**:
   - Click on a folder to navigate into it
   - The content of that folder will be displayed

3. **Using Breadcrumbs**:
   - The breadcrumb navigation at the top shows your current location in the directory structure
   - Click on any part of the breadcrumb path to quickly navigate to that directory
   - Click "Root" to return to the top-level directory

### File Information

For each file, you can see:
- File name
- File size (in appropriate units)
- Last modified date and time
- File permissions (in Unix format, e.g., "rwxr-xr-x")

## Logging Out

To log out of the application:

1. Click the "Logout" button in the top navigation bar
2. You will be redirected to the welcome page
3. Your session will be terminated and you will need to log in again to access the FTP Browser

## Troubleshooting

### Connection Issues

If you encounter problems connecting to your FTP server:

1. **Verify credentials**: Double-check that your host, port, username, and password are correct
2. **Check server availability**: Ensure the FTP server is running and accessible from your network
3. **Firewall settings**: Check if any firewall is blocking the FTP connection
4. **Passive mode**: The application uses passive FTP mode, which may require specific network configurations

### Backend Connection Issues

If the frontend cannot connect to the backend server:

1. **Check server status**: Ensure the Spring Boot backend is running at `http://localhost:8082`
2. **CORS issues**: If you see CORS errors in the browser console, verify that:
   - You're accessing the frontend from an allowed origin (`http://localhost:5173` or `http://127.0.0.1:5173`)
   - The backend CORS configuration is correctly set up in WebConfig.java
3. **Network connectivity**: Ensure there are no firewalls or network settings blocking communication between the frontend and backend

### Navigation Errors

If you encounter errors while browsing directories:

1. **Permission issues**: Ensure your FTP user has permissions to access the requested directories
2. **Path errors**: The path format should follow standard Unix conventions (using forward slashes)

## Privacy and Security Notes

1. Your FTP credentials are not stored permanently in the application
2. JWT tokens are used for session management and expire after 24 hours
3. For security reasons, always log out when you're done using the application

## Support

If you need additional help or encounter issues not covered in this guide, please contact the system administrator or refer to the project documentation at the GitHub repository.
