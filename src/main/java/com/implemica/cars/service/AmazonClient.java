package com.implemica.cars.service;

import com.implemica.cars.service.exceptions.InvalidImageTypeException;
import org.springframework.web.multipart.MultipartFile;

public interface AmazonClient {
    void uploadFileTos3bucket(String imageID, MultipartFile imageFile) throws InvalidImageTypeException;

    void deleteFileFromS3Bucket(String imageID);
}
