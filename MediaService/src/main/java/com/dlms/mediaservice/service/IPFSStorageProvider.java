package com.dlms.mediaservice.service;

import io.ipfs.api.IPFS;
import io.ipfs.api.MerkleNode;
import io.ipfs.api.NamedStreamable;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.annotation.PostConstruct;
import java.io.IOException;

@Service
public class IPFSStorageProvider implements StorageProvider {

    @Value("${ipfs.api.host}")
    private String ipfsHost;

    @Value("${ipfs.api.port}")
    private int ipfsPort;

    private IPFS ipfs;

    @PostConstruct
    public void init() {
        // Initialize IPFS Connection
        try {
            this.ipfs = new IPFS("/ip4/" + ipfsHost + "/tcp/" + ipfsPort);
        } catch (Exception e) {
            throw new RuntimeException("Failed to connect to IPFS Node. Ensure IPFS Desktop or Daemon is running.", e);
        }
    }

    @Override
    public String uploadFile(MultipartFile file) throws IOException {
        NamedStreamable.InputStreamWrapper is = new NamedStreamable.InputStreamWrapper(file.getInputStream());
        MerkleNode addResult = ipfs.add(is).get(0);
        return addResult.hash.toString(); // Returns the CID
    }

    @Override
    public String getAccessUrl(String cid) {
        // Using public gateway for example, can be configured to local or dedicated
        // gateway
        return "http://127.0.0.1:8084/ipfs/" + cid;
    }
}
