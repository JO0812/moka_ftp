package com.jo.moka_ftp.dto;

import java.util.List;

public class DirectoryListingResponse {
    private boolean success;
    private String message;
    private String currentPath;
    private List<FtpFileDto> files;

    public DirectoryListingResponse() {
    }

    public DirectoryListingResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public DirectoryListingResponse(boolean success, String message, String currentPath, List<FtpFileDto> files) {
        this.success = success;
        this.message = message;
        this.currentPath = currentPath;
        this.files = files;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getCurrentPath() {
        return currentPath;
    }

    public void setCurrentPath(String currentPath) {
        this.currentPath = currentPath;
    }

    public List<FtpFileDto> getFiles() {
        return files;
    }

    public void setFiles(List<FtpFileDto> files) {
        this.files = files;
    }
}
