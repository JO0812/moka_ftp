package com.jo.moka_ftp.controller;

import com.jo.moka_ftp.dto.LoginRequest;
import com.jo.moka_ftp.dto.LoginResponse;
import com.jo.moka_ftp.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        LoginResponse response = authService.login(loginRequest);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            // Consider more specific error codes based on failure type if needed
            return ResponseEntity.status(401).body(response); // 401 Unauthorized for bad credentials
        }
    }
}
