package com.jo.moka_ftp.controller;

import com.jo.moka_ftp.dto.DirectoryListingRequest;
import com.jo.moka_ftp.dto.DirectoryListingResponse;
import com.jo.moka_ftp.service.FtpService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ftp")
public class FtpController {

    private final FtpService ftpService;

    public FtpController(FtpService ftpService) {
        this.ftpService = ftpService;
    }

    @PostMapping("/list")
    public ResponseEntity<DirectoryListingResponse> listDirectory(@RequestBody DirectoryListingRequest request) {
        DirectoryListingResponse response = ftpService.listDirectory(request);
        return ResponseEntity.ok(response);
    }
}
