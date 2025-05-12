package com.jo.moka_ftp.infrastructure.ftp;

import com.jo.moka_ftp.repository.FtpRepository;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.apache.commons.net.ftp.FTPReply;
import org.springframework.stereotype.Component;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Component
public class FtpClientImpl implements FtpRepository {

    @Override
    public boolean authenticate(String host, int port, String username, String password) throws IOException {
        FTPClient ftpClient = new FTPClient();
        try {
            if (port <= 0) {
                ftpClient.connect(host); // Default FTP port 21
            } else {
                ftpClient.connect(host, port);
            }
            
            int reply = ftpClient.getReplyCode();
            if (!FTPReply.isPositiveCompletion(reply)) {
                ftpClient.disconnect();
                System.err.println("FTP server refused connection.");
                throw new IOException("FTP server refused connection.");
            }

            boolean loggedIn = ftpClient.login(username, password);
            if (loggedIn) {
                ftpClient.enterLocalPassiveMode(); // Important for many FTP servers
                // Optionally, perform a simple operation to confirm, like printing working directory
                // System.out.println("Current directory: " + ftpClient.printWorkingDirectory());
                // Do not disconnect here if you plan to reuse the client for other operations in a session
            }
            // Logout and disconnect should happen after all operations or if login fails and we want to ensure cleanup.
            // For a simple auth check, we can logout and disconnect if successful.
            // However, for a real session, you'd keep the client connected.
            if (loggedIn) {
                 // For this auth-only method, we can logout. In a real app, you might keep it connected.
                ftpClient.logout(); 
            } else {
                System.err.println("FTP login failed for user: " + username);
            }
            return loggedIn;
        } finally {
            if (ftpClient.isConnected()) {
                try {
                    ftpClient.disconnect();
                } catch (IOException ex) {
                    // Log or ignore
                    System.err.println("Error disconnecting FTP client: " + ex.getMessage());
                }
            }
        }
    }

    @Override
    public List<FTPFile> listFiles(String host, int port, String username, String password, String path) throws Exception {
        FTPClient ftpClient = new FTPClient();
        try {
            if (port <= 0) {
                ftpClient.connect(host); // Default FTP port 21
            } else {
                ftpClient.connect(host, port);
            }
            
            int reply = ftpClient.getReplyCode();
            if (!FTPReply.isPositiveCompletion(reply)) {
                ftpClient.disconnect();
                throw new IOException("FTP server refused connection.");
            }

            boolean loggedIn = ftpClient.login(username, password);
            if (!loggedIn) {
                throw new IOException("FTP login failed for user: " + username);
            }

            ftpClient.enterLocalPassiveMode(); // Important for many FTP servers
            
            // Set file transfer mode to binary (important for non-ASCII files)
            ftpClient.setFileType(FTPClient.BINARY_FILE_TYPE);
            
            // If path is null or empty, use the current directory
            if (path == null || path.isEmpty()) {
                path = ftpClient.printWorkingDirectory();
            }
            
            // Change to the requested directory
            boolean changed = ftpClient.changeWorkingDirectory(path);
            if (!changed) {
                throw new IOException("Could not change to directory: " + path);
            }
            
            // List the files in the directory
            FTPFile[] ftpFiles = ftpClient.listFiles();
            
            // Log out and disconnect
            ftpClient.logout();
            
            return Arrays.asList(ftpFiles);
        } finally {
            if (ftpClient.isConnected()) {
                try {
                    ftpClient.disconnect();
                } catch (IOException ex) {
                    System.err.println("Error disconnecting FTP client: " + ex.getMessage());
                }
            }
        }
    }
}