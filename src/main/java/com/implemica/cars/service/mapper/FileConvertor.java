package com.implemica.cars.service.mapper;

import com.implemica.cars.service.AmazonClient;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Objects;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

/**
 * File converter that is used to convert a {@link MultipartFile} to a {@link File},
 * to upload a file to the AWS S3 bucket in the {@link AmazonClient} method.
 */
public class FileConvertor {

    private static final Logger log = LoggerFactory.getLogger(FileConvertor.class);

    /**
     * Private constructor to prevent class instances.
     */
    private FileConvertor() {}

    /**
     * Converts a {@link MultipartFile} to a {@link File}. Log error message in
     * case if the file exists but is a directory rather than a regular file,
     * does not exist but cannot be created, or cannot be opened for any other
     * reason or an I/O error occurs.
     *
     * @param file conversion file
     * @return converted file
     */
    public static File convertMultiPartToFile(MultipartFile file) {
        File convFile = new File(Objects.requireNonNull(file.getOriginalFilename()));

        try {
            FileOutputStream fos = new FileOutputStream(convFile);
            fos.write(file.getBytes());
            fos.close();
        } catch (IOException e) {
            log.error(e.getMessage(), (Object) e.getStackTrace());
        }

        return convFile;
    }
}
