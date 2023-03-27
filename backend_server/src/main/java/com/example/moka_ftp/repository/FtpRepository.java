package com.example.moka_ftp.repository;

import java.util.List;

// Placeholder for FtpFile DTO/model
// import com.example.moka_ftp.model.FtpFile;

public interface FtpRepository {
    boolean authenticate(String host, int port, String username, String password);
    // List<FtpFile> listFiles(String path);
    // boolean uploadFile(String localPath, String remotePath);
    // boolean downloadFile(String remotePath, String localPath);
    // ... other FTP operations
}
