# Mobile FTP Client App – Development Plan

## Tickets/Stories by Feature

Agile structure: Plan features as epics and break each into individual tasks across sprints.

### FTP Browsing (MVP)

- User login: Implement a login screen (Material Design) and backend API using JAVA to authenticate using the user’s FTP credentials.
- Directory listing: Build a backend endpoint to fetch folder contents via FTP and a React Native view to display files/folders in a list.
- Navigation: Allow tapping on a folder to navigate into it (maintain a breadcrumb or back-navigation UI).
- File details: Show basic metadata (name, size, modification date) in the file list.
- Error handling: Display error messages for failed logins, missing credentials, network issues, or empty folders.
- UI styling: Apply Google’s Material Design (list components, icons, typography) for a consistent file-browsing interface.

### File Upload (Roadmap)

- Select files: Add UI to pick files or folders from the device for upload.
- Backend upload API: Implement a Spring endpoint to send selected files to the FTP server.
- Progress indication: Show upload progress (e.g. progress bar) and confirmation on success or failure.
- Error handling: Handle upload errors (connection loss, permission issues) and retry logic.
- UI integration: Ensure the upload flow fits the existing Material Design style.

### File Download (Roadmap)

- Download action: Enable users to tap a file and download it to device storage via the backend proxy.
- Storage handling: Save downloaded files locally or open them with associated apps.
- Progress and feedback: Show download progress and completion notification.
- Error handling: Handle interruptions or failures (e.g. network drop) with retry or resume options.

### Rename / Move (Roadmap)

- Rename: Add a user story for renaming files/folders. Provide a dialog to enter a new name and update it on the server via a backend call.
- Move: Allow users to move files/folders to a different directory on the FTP server. Provide a UI to choose the destination folder.
- Validation: Check for naming conflicts or invalid targets, and show errors if the operation fails.

### Delete (Roadmap)

- Delete file/folder: Permit deletion of selected files or folders from the FTP server.
- Confirmation: Show a confirmation dialog before deleting.
- Error handling: Handle failures (e.g. non-empty folder, permissions) gracefully and inform the user.

### Background Sync (Roadmap)

- Offline queue: Queue user actions (upload, rename, delete) when offline and retry them automatically when connectivity returns.
- Sync mechanism: Use a background task scheduler (e.g. Android WorkManager or react-native-background-fetch) to perform pending operations in the background.
- Conflict handling: Detect conflicts (e.g. file changed on server) and prompt the user or resolve appropriately.
- Status updates: Notify the user of sync status (e.g. via notifications or a status indicator in the app).

### Security Enhancements (Roadmap)

- Move JWT secret to environment variables: Improve security by removing hardcoded JWT secret from the codebase.
- HTTPS implementation: Configure SSL/TLS for secure connection between frontend and backend.
- Refresh token mechanism: Implement token refresh for extended sessions without requiring re-login.
- Rate limiting: Add protection against brute force attacks by limiting login attempts.
- Production CORS configuration: Update CORS settings for production environment with stricter origin rules.
- Sensitive data handling: Ensure proper encryption and protection of credentials and tokens.
- Security audit: Conduct a comprehensive security review of the application.

## MVP Feature Scope Summary

- Core features only: MVP covers user authentication (via FTP credentials), browsing files/folders, and basic file metadata display (name, size, date). Features are kept to a minimum to validate the concept.
- UI/UX: Implement Material Design list views for file browsing and simple login screens, ensuring a clean, consistent interface.
- Performance: Optimize directory queries and UI rendering for quick response (while MVP does not cache data, design should allow easy extension).
- Error and edge cases: Include handling for common failures (bad credentials, network errors) so the app is robust.
- Security: Basic security with JWT authentication and appropriate CORS configuration for development environment.
