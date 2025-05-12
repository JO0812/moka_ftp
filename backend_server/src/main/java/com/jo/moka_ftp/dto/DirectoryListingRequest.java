package com.jo.moka_ftp.dto;

public class DirectoryListingRequest {
    private String host;
    private int port;
    private String username;
    private String password;
    private String path; // Directory path to list

    public DirectoryListingRequest() {
    }

    public DirectoryListingRequest(String host, int port, String username, String password, String path) {
        this.host = host;
        this.port = port;
        this.username = username;
        this.password = password;
        this.path = path;
    }

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public int getPort() {
        return port;
    }

    public void setPort(int port) {
        this.port = port;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
}
