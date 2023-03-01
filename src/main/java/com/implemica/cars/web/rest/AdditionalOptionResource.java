package com.implemica.cars.web.rest;

import static java.lang.String.format;

import com.implemica.cars.repository.AdditionalOptionRepository;
import com.implemica.cars.service.AdditionalOptionService;
import com.implemica.cars.service.dto.AdditionalOptionDTO;
import com.implemica.cars.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.implemica.cars.domain.AdditionalOption}.
 */
@RestController
@RequestMapping("/api")
public class AdditionalOptionResource {

    private final Logger log = LoggerFactory.getLogger(AdditionalOptionResource.class);

    private static final String ENTITY_NAME = "additionalOption";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AdditionalOptionService additionalOptionService;

    private final AdditionalOptionRepository additionalOptionRepository;

    public AdditionalOptionResource(
        AdditionalOptionService additionalOptionService,
        AdditionalOptionRepository additionalOptionRepository
    ) {
        this.additionalOptionService = additionalOptionService;
        this.additionalOptionRepository = additionalOptionRepository;
    }

    /**
     * {@code POST  /additional-options} : Create a new additionalOption.
     *
     * @param additionalOptionDTO the additionalOptionDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new additionalOptionDTO, or with status {@code 400 (Bad Request)} if the additionalOption has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/additional-options")
    public ResponseEntity<AdditionalOptionDTO> createAdditionalOption(@RequestBody AdditionalOptionDTO additionalOptionDTO)
        throws URISyntaxException {
        log.debug("REST request to save AdditionalOption : {}", additionalOptionDTO);
        if (additionalOptionDTO.getId() != null) {
            throw new BadRequestAlertException("A new additionalOption cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AdditionalOptionDTO result = additionalOptionService.save(additionalOptionDTO);
        return ResponseEntity
            .created(new URI("/api/additional-options/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /additional-options/:id} : Updates an existing additionalOption.
     *
     * @param id the id of the additionalOptionDTO to save.
     * @param additionalOptionDTO the additionalOptionDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated additionalOptionDTO,
     * or with status {@code 400 (Bad Request)} if the additionalOptionDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the additionalOptionDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/additional-options/{id}")
    public ResponseEntity<AdditionalOptionDTO> updateAdditionalOption(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody AdditionalOptionDTO additionalOptionDTO
    ) throws URISyntaxException {
        log.debug("REST request to update AdditionalOption : {}, {}", id, additionalOptionDTO);
        if (additionalOptionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, additionalOptionDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!additionalOptionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        AdditionalOptionDTO result = additionalOptionService.update(additionalOptionDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, additionalOptionDTO.getId().toString()))
            .body(result);
    }

    @PutMapping("/additional-options")
    public ResponseEntity<List<AdditionalOptionDTO>> updateAdditionalOptions(@RequestBody List<AdditionalOptionDTO> additionalOptionDTOs) {
        additionalOptionDTOs.forEach(l -> log.info(l.toString()));
        log.debug("REST request to update AdditionalOption with car id : {}", additionalOptionDTOs.get(0).getCar().getId());

        List<AdditionalOptionDTO> result = additionalOptionService.updateOptions(additionalOptionDTOs);
        return ResponseEntity
            .ok()
            .headers(
                HeaderUtil.createEntityUpdateAlert(
                    applicationName,
                    false,
                    format("%ss", ENTITY_NAME),
                    additionalOptionDTOs.get(0).getCar().getId().toString()
                )
            )
            .body(result);
    }

    /**
     * {@code PATCH  /additional-options/:id} : Partial updates given fields of an existing additionalOption, field will ignore if it is null
     *
     * @param id the id of the additionalOptionDTO to save.
     * @param additionalOptionDTO the additionalOptionDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated additionalOptionDTO,
     * or with status {@code 400 (Bad Request)} if the additionalOptionDTO is not valid,
     * or with status {@code 404 (Not Found)} if the additionalOptionDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the additionalOptionDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/additional-options/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<AdditionalOptionDTO> partialUpdateAdditionalOption(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody AdditionalOptionDTO additionalOptionDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update AdditionalOption partially : {}, {}", id, additionalOptionDTO);
        if (additionalOptionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, additionalOptionDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!additionalOptionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<AdditionalOptionDTO> result = additionalOptionService.partialUpdate(additionalOptionDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, additionalOptionDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /additional-options} : get all the additionalOptions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of additionalOptions in body.
     */
    @GetMapping("/additional-options")
    public List<AdditionalOptionDTO> getAllAdditionalOptions() {
        log.debug("REST request to get all AdditionalOptions");
        return additionalOptionService.findAll();
    }

    /**
     * {@code GET  /additional-options/:id} : get the "id" additionalOption.
     *
     * @param id the id of the additionalOptionDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the additionalOptionDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/additional-options/{id}")
    public ResponseEntity<AdditionalOptionDTO> getAdditionalOption(@PathVariable Long id) {
        log.debug("REST request to get AdditionalOption : {}", id);
        Optional<AdditionalOptionDTO> additionalOptionDTO = additionalOptionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(additionalOptionDTO);
    }

    /**
     {@code GET /additional-options/car/:carID} : Get all additional options of a car.
     @param carID the ID of the car to get additional options for
     @return the list of additional options of the car
     */
    @GetMapping("/additional-options/car/{carID}")
    public List<AdditionalOptionDTO> getCarAdditionalOptions(@PathVariable Long carID) {
        log.debug("REST request to get AdditionalOptions of car with id : {}", carID);
        return additionalOptionService.findAllByCarId(carID);
    }

    /**
     * {@code DELETE  /additional-options/:id} : delete the "id" additionalOption.
     *
     * @param id the id of the additionalOptionDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/additional-options/{id}")
    public ResponseEntity<Void> deleteAdditionalOption(@PathVariable Long id) {
        log.debug("REST request to delete AdditionalOption : {}", id);
        additionalOptionService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }

    @DeleteMapping("/additional-options/car/{carID}")
    public ResponseEntity<Void> deleteAdditionalOptionByCarID(@PathVariable Long carID) {
        log.debug("REST request to delete AdditionalOptions with car id : {}", carID);
        additionalOptionService.deleteByCar_Id(carID);

        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, carID.toString()))
            .build();
    }
}
