package com.jo.moka_ftp.service;

import com.jo.moka_ftp.dto.LoginRequest;
import com.jo.moka_ftp.dto.LoginResponse;
import com.jo.moka_ftp.repository.FtpRepository;
import com.jo.moka_ftp.security.JwtTokenProvider;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final FtpRepository ftpRepository;
    private final JwtTokenProvider tokenProvider;
    private final boolean debugMode = true; // Set to true for testing without real FTP server

    public AuthService(FtpRepository ftpRepository, JwtTokenProvider tokenProvider) {
       this.ftpRepository = ftpRepository;
       this.tokenProvider = tokenProvider;
    }

    public LoginResponse login(LoginRequest loginRequest) {
        try {
            // Debug mode for testing without real FTP servers
            if (debugMode && "test".equals(loginRequest.getUsername()) && "password".equals(loginRequest.getPassword())) {
                System.out.println("Debug mode: Accepting test credentials without FTP connection");
                String token = tokenProvider.generateToken(loginRequest.getUsername());
                return new LoginResponse(true, "Debug login successful", token);
            }
            
            boolean isAuthenticated = ftpRepository.authenticate(
                loginRequest.getHost(),
                loginRequest.getPort(),
                loginRequest.getUsername(),
                loginRequest.getPassword()
            );

            if (isAuthenticated) {
                String token = tokenProvider.generateToken(loginRequest.getUsername());
                return new LoginResponse(true, "Login successful", token);
            } else {
                return new LoginResponse(false, "Invalid FTP credentials.");
            }
        } catch (Exception e) {
            // Log the exception (e.g., e.printStackTrace() or use a logger)
            System.err.println("Login error: " + e.getMessage());
            return new LoginResponse(false, "Login failed due to a server error: " + e.getMessage());
        }
    }
}
