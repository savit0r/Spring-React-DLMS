package com.dlms.mediaservice.repository;

import com.dlms.mediaservice.model.MediaMetadata;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MediaRepository extends MongoRepository<MediaMetadata, String> {
    // Custom query methods can be defined here if needed
}
