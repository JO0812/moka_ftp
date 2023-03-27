package com.example.moka_ftp.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// Placeholder for LoginRequest and LoginResponse DTOs
// import com.example.moka_ftp.dto.LoginRequest;
// import com.example.moka_ftp.dto.LoginResponse;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    // private final AuthService authService;

    // public AuthController(AuthService authService) {
    //     this.authService = authService;
    // }

    @PostMapping("/login")
    public String login(/*@RequestBody LoginRequest loginRequest*/) {
        // Placeholder: Replace with actual DTOs and service call
        // return authService.login(loginRequest);
        System.out.println("Login attempt received"); // Temporary
        return "{"token":"dummy-token"}"; // Temporary placeholder response
    }
}
