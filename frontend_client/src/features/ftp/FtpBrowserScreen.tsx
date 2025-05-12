import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Breadcrumbs,
  Link,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/authContext';
import { listDirectory, FtpFileDto } from '../../services/ftpService';

const FtpBrowserScreen: React.FC = () => {
  const { token, ftpSession, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [files, setFiles] = useState<FtpFileDto[]>([]);
  const [currentPath, setCurrentPath] = useState('/');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Navigate to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Fetch directory listing when component mounts or path changes
  useEffect(() => {
    const fetchDirectoryListing = async () => {
      if (!ftpSession || !token) {
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await listDirectory(
          ftpSession.host,
          ftpSession.port,
          ftpSession.username,
          '', // We don't store password in session for security reasons
          currentPath,
          token
        );

        if (response.success) {
          setFiles(response.files || []);
        } else {
          setError(response.message || 'Failed to list directory');
        }
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchDirectoryListing();
  }, [currentPath, ftpSession, token]);

  // Handle navigation to a directory
  const navigateToDirectory = (file: FtpFileDto) => {
    if (file.directory) {
      setCurrentPath(file.path);
    }
  };

  // Generate breadcrumb paths
  const pathParts = currentPath.split('/').filter(Boolean);
  const breadcrumbItems = [
    { name: 'Root', path: '/' },
    ...pathParts.map((part, index) => {
      const path = '/' + pathParts.slice(0, index + 1).join('/');
      return { name: part, path };
    }),
  ];

  // Handle breadcrumb navigation
  const handleBreadcrumbClick = (path: string) => {
    setCurrentPath(path);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        FTP Browser
      </Typography>

      {ftpSession && (
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Connected to {ftpSession.host}:{ftpSession.port} as {ftpSession.username}
        </Typography>
      )}

      <Paper sx={{ p: 2, mb: 3 }}>
        <Breadcrumbs aria-label="breadcrumb">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            return isLast ? (
              <Typography key={item.path} color="text.primary">
                {item.name}
              </Typography>
            ) : (
              <Link
                key={item.path}
                component="button"
                underline="hover"
                color="inherit"
                onClick={() => handleBreadcrumbClick(item.path)}
              >
                {item.name}
              </Link>
            );
          })}
        </Breadcrumbs>
      </Paper>

      {loading && (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <>
          {files.length === 0 ? (
            <Typography variant="body1" color="text.secondary" align="center" py={4}>
              This directory is empty.
            </Typography>
          ) : (
            <Paper>
              <List>
                {files
                  .sort((a, b) => {
                    // Directories first, then files
                    if (a.directory && !b.directory) return -1;
                    if (!a.directory && b.directory) return 1;
                    // Then sort alphabetically
                    return a.name.localeCompare(b.name);
                  })
                  .map((file, index) => (
                    <React.Fragment key={file.path}>
                      {index > 0 && <Divider component="li" />}
                      <ListItem
                        button
                        onClick={() => navigateToDirectory(file)}
                      >
                        <ListItemIcon>
                          {file.directory ? <FolderIcon color="primary" /> : <InsertDriveFileIcon />}
                        </ListItemIcon>
                        <ListItemText
                          primary={file.name}
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {file.directory ? 'Directory' : formatFileSize(file.size)}
                              </Typography>
                              {' — '}
                              {formatDate(file.lastModified)}
                              {' — '}
                              {file.permissions}
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                    </React.Fragment>
                  ))}
              </List>
            </Paper>
          )}
        </>
      )}
    </Container>
  );
};

// Helper function to format file size
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Helper function to format date
const formatDate = (dateString: string | Date): string => {
  try {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleString();
  } catch (e) {
    console.error('Invalid date format:', dateString);
    return 'Unknown date';
  }
};

export default FtpBrowserScreen;
