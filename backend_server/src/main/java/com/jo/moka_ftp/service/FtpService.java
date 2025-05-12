package com.jo.moka_ftp.service;

import com.jo.moka_ftp.dto.DirectoryListingRequest;
import com.jo.moka_ftp.dto.DirectoryListingResponse;
import com.jo.moka_ftp.dto.FtpFileDto;
import com.jo.moka_ftp.repository.FtpRepository;
import org.apache.commons.net.ftp.FTPFile;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class FtpService {

    private final FtpRepository ftpRepository;
    private final boolean debugMode = true; // Set to true for testing without real FTP server

    public FtpService(FtpRepository ftpRepository) {
        this.ftpRepository = ftpRepository;
    }

    public DirectoryListingResponse listDirectory(DirectoryListingRequest request) {
        try {
            // Debug mode for testing without real FTP servers
            if (debugMode && "test".equals(request.getUsername()) && "password".equals(request.getPassword())) {
                System.out.println("Debug mode: Providing mock directory listing for path " + request.getPath());
                return createMockDirectoryListing(request.getPath());
            }

            List<FTPFile> files = ftpRepository.listFiles(
                    request.getHost(),
                    request.getPort(),
                    request.getUsername(),
                    request.getPassword(),
                    request.getPath()
            );

            List<FtpFileDto> fileDtos = convertToFtpFileDtos(files, request.getPath());
            return new DirectoryListingResponse(true, "Directory listing successful", request.getPath(), fileDtos);

        } catch (Exception e) {
            // Log the exception
            System.err.println("Directory listing error: " + e.getMessage());
            return new DirectoryListingResponse(false, "Failed to list directory: " + e.getMessage());
        }
    }

    private DirectoryListingResponse createMockDirectoryListing(String path) {
        List<FtpFileDto> mockFiles = new ArrayList<>();
        
        // If in root directory
        if (path == null || path.isEmpty() || "/".equals(path)) {
            mockFiles.add(new FtpFileDto("documents", "/documents", 0, true, new Date(), "drwxr-xr-x"));
            mockFiles.add(new FtpFileDto("images", "/images", 0, true, new Date(), "drwxr-xr-x"));
            mockFiles.add(new FtpFileDto("readme.txt", "/readme.txt", 1024, false, new Date(), "-rw-r--r--"));
        } 
        // If in documents directory
        else if ("/documents".equals(path) || "/documents/".equals(path)) {
            mockFiles.add(new FtpFileDto("report.pdf", "/documents/report.pdf", 5242880, false, new Date(), "-rw-r--r--"));
            mockFiles.add(new FtpFileDto("spreadsheet.xlsx", "/documents/spreadsheet.xlsx", 2097152, false, new Date(), "-rw-r--r--"));
        } 
        // If in images directory
        else if ("/images".equals(path) || "/images/".equals(path)) {
            mockFiles.add(new FtpFileDto("photo1.jpg", "/images/photo1.jpg", 3145728, false, new Date(), "-rw-r--r--"));
            mockFiles.add(new FtpFileDto("photo2.jpg", "/images/photo2.jpg", 4194304, false, new Date(), "-rw-r--r--"));
        } 
        // Default for any other path
        else {
            mockFiles.add(new FtpFileDto("empty.txt", path + "/empty.txt", 0, false, new Date(), "-rw-r--r--"));
        }

        return new DirectoryListingResponse(true, "Mock directory listing for path " + path, path, mockFiles);
    }

    private List<FtpFileDto> convertToFtpFileDtos(List<FTPFile> ftpFiles, String currentPath) {
        List<FtpFileDto> fileDtos = new ArrayList<>();
        
        for (FTPFile file : ftpFiles) {
            String path = currentPath;
            if (!currentPath.endsWith("/")) {
                path += "/";
            }
            path += file.getName();

            String permissions = "";
            if (file.hasPermission(FTPFile.USER_ACCESS, FTPFile.READ_PERMISSION)) permissions += "r"; else permissions += "-";
            if (file.hasPermission(FTPFile.USER_ACCESS, FTPFile.WRITE_PERMISSION)) permissions += "w"; else permissions += "-";
            if (file.hasPermission(FTPFile.USER_ACCESS, FTPFile.EXECUTE_PERMISSION)) permissions += "x"; else permissions += "-";
            // Group permissions
            if (file.hasPermission(FTPFile.GROUP_ACCESS, FTPFile.READ_PERMISSION)) permissions += "r"; else permissions += "-";
            if (file.hasPermission(FTPFile.GROUP_ACCESS, FTPFile.WRITE_PERMISSION)) permissions += "w"; else permissions += "-";
            if (file.hasPermission(FTPFile.GROUP_ACCESS, FTPFile.EXECUTE_PERMISSION)) permissions += "x"; else permissions += "-";
            // World permissions
            if (file.hasPermission(FTPFile.WORLD_ACCESS, FTPFile.READ_PERMISSION)) permissions += "r"; else permissions += "-";
            if (file.hasPermission(FTPFile.WORLD_ACCESS, FTPFile.WRITE_PERMISSION)) permissions += "w"; else permissions += "-";
            if (file.hasPermission(FTPFile.WORLD_ACCESS, FTPFile.EXECUTE_PERMISSION)) permissions += "x"; else permissions += "-";

            // Prefix with d for directory or - for file
            permissions = (file.isDirectory() ? "d" : "-") + permissions;

            FtpFileDto dto = new FtpFileDto(
                    file.getName(),
                    path,
                    file.getSize(),
                    file.isDirectory(),
                    file.getTimestamp().getTime(),
                    permissions
            );
            
            fileDtos.add(dto);
        }
        
        return fileDtos;
    }
}
