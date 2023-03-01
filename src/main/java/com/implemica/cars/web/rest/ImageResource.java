package com.implemica.cars.web.rest;

import static java.lang.String.format;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE;

import com.implemica.cars.service.AmazonClient;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import java.net.URI;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/api")
public class ImageResource {

    private final Logger log = LoggerFactory.getLogger(ImageResource.class);

    private final AmazonClient amazonClient;

    public ImageResource(AmazonClient amazonClient) {
        this.amazonClient = amazonClient;
    }

    @Operation(
        summary = "Upload image.",
        description = "Loads the image to AWS S3 and set image id to this file, if not a graft extension, returns 400 http status."
    )
    @ApiResponses(
        {
            @ApiResponse(
                responseCode = "201",
                description = "Image is uploaded successful.",
                content = { @Content(mediaType = APPLICATION_JSON_VALUE) }
            ),
            @ApiResponse(
                responseCode = "400",
                description = "Incorrect image file expansion.",
                content = { @Content(mediaType = APPLICATION_JSON_VALUE) }
            ),
        }
    )
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(value = "/image/{imageId}", produces = MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> uploadFile(
        @Parameter(description = "image file.") @RequestPart("imageFile") MultipartFile image,
        @Parameter(name = "image file name that has car and" + " get from AWS S3 by its image file id") @PathVariable String imageId
    ) {
        log.info("Http method - Post, post image with name {}", imageId);

        this.amazonClient.uploadFileTos3bucket(imageId, image);

        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path(format("/image/upload/%s", imageId)).toUriString());

        return ResponseEntity.created(uri).build();
    }

    @Operation(summary = "Delete image.", description = "Deletes car image by their name if image is not found returns 404 http status.")
    @ApiResponses(
        {
            @ApiResponse(
                responseCode = "200",
                description = "Image is deleted successful.",
                content = { @Content(mediaType = APPLICATION_JSON_VALUE) }
            ),
            @ApiResponse(
                responseCode = "404",
                description = "Cannot find image with this name.",
                content = { @Content(mediaType = APPLICATION_JSON_VALUE) }
            ),
        }
    )
    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping(value = "/image/{imageId}", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> deleteFile(@PathVariable @Parameter(name = "Image file id") String imageId) {
        log.info("Http method - Delete, delete image with name {}", imageId);
        this.amazonClient.deleteFileFromS3Bucket(imageId);

        return ResponseEntity.ok().build();
    }
}
