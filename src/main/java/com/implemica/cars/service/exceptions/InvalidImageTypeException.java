package com.implemica.cars.service.exceptions;

import com.implemica.cars.service.AmazonClient;

/**
 * Exception to be thrown when validate images files before
 * uploading to S3 bucket and is used in {@link AmazonClient} service.
 */
public class InvalidImageTypeException extends RuntimeException {

    /**
     * Constructs a new exception with the specified detail message.
     */
    public InvalidImageTypeException(String message) {
        super(message);
    }
}
