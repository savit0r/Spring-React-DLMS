package com.dlms.mediaservice.controller;

import com.dlms.mediaservice.model.MediaMetadata;
import com.dlms.mediaservice.repository.MediaRepository;
import com.dlms.mediaservice.service.StorageProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/media")
public class MediaController {

    @Autowired
    private MediaRepository repository;

    // We can inject the interface. Spring will find the IPFS implementation.
    @Autowired
    private StorageProvider storage;

    @PostMapping("/upload")
    public ResponseEntity<MediaMetadata> upload(@RequestParam("file") MultipartFile file,
            @RequestHeader(value = "X-User-Role", required = false) String role) throws IOException {

        // Basic Role Check - Security should ideally be handled by Gateway, but this is
        // a second line of defense
        if (role != null && !"ADMIN".equals(role)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        String cid = storage.uploadFile(file);

        MediaMetadata meta = new MediaMetadata();
        meta.setFileName(file.getOriginalFilename());
        meta.setContentType(file.getContentType());
        meta.setContentIdentifier(cid);
        meta.setStorageProvider("IPFS");
        meta.setSize(file.getSize());

        return ResponseEntity.ok(repository.save(meta));
    }

    @GetMapping("/{mediaId}")
    public ResponseEntity<String> getStreamUrl(@PathVariable String mediaId) {
        MediaMetadata meta = repository.findById(mediaId).orElseThrow(() -> new RuntimeException("Media not found"));
        return ResponseEntity.ok(storage.getAccessUrl(meta.getContentIdentifier()));
    }
}
