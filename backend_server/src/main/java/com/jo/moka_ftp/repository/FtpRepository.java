package com.jo.moka_ftp.repository;

import java.util.List;
import org.apache.commons.net.ftp.FTPFile;

public interface FtpRepository {
    boolean authenticate(String host, int port, String username, String password) throws Exception;
    List<FTPFile> listFiles(String host, int port, String username, String password, String path) throws Exception;
    // boolean uploadFile(String localPath, String remotePath);
    // boolean downloadFile(String remotePath, String localPath);
    // ... other FTP operations
}
