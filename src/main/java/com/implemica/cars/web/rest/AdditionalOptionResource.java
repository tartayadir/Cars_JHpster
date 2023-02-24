package com.implemica.cars.web.rest;

import com.implemica.cars.domain.AdditionalOption;
import com.implemica.cars.repository.AdditionalOptionRepository;
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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.implemica.cars.domain.AdditionalOption}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AdditionalOptionResource {

    private final Logger log = LoggerFactory.getLogger(AdditionalOptionResource.class);

    private static final String ENTITY_NAME = "additionalOption";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AdditionalOptionRepository additionalOptionRepository;

    public AdditionalOptionResource(AdditionalOptionRepository additionalOptionRepository) {
        this.additionalOptionRepository = additionalOptionRepository;
    }

    /**
     * {@code POST  /additional-options} : Create a new additionalOption.
     *
     * @param additionalOption the additionalOption to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new additionalOption, or with status {@code 400 (Bad Request)} if the additionalOption has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/additional-options")
    public ResponseEntity<AdditionalOption> createAdditionalOption(@RequestBody AdditionalOption additionalOption)
        throws URISyntaxException {
        log.debug("REST request to save AdditionalOption : {}", additionalOption);
        if (additionalOption.getId() != null) {
            throw new BadRequestAlertException("A new additionalOption cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AdditionalOption result = additionalOptionRepository.save(additionalOption);
        return ResponseEntity
            .created(new URI("/api/additional-options/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /additional-options/:id} : Updates an existing additionalOption.
     *
     * @param id the id of the additionalOption to save.
     * @param additionalOption the additionalOption to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated additionalOption,
     * or with status {@code 400 (Bad Request)} if the additionalOption is not valid,
     * or with status {@code 500 (Internal Server Error)} if the additionalOption couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/additional-options/{id}")
    public ResponseEntity<AdditionalOption> updateAdditionalOption(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody AdditionalOption additionalOption
    ) throws URISyntaxException {
        log.debug("REST request to update AdditionalOption : {}, {}", id, additionalOption);
        if (additionalOption.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, additionalOption.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!additionalOptionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        AdditionalOption result = additionalOptionRepository.save(additionalOption);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, additionalOption.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /additional-options/:id} : Partial updates given fields of an existing additionalOption, field will ignore if it is null
     *
     * @param id the id of the additionalOption to save.
     * @param additionalOption the additionalOption to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated additionalOption,
     * or with status {@code 400 (Bad Request)} if the additionalOption is not valid,
     * or with status {@code 404 (Not Found)} if the additionalOption is not found,
     * or with status {@code 500 (Internal Server Error)} if the additionalOption couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/additional-options/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<AdditionalOption> partialUpdateAdditionalOption(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody AdditionalOption additionalOption
    ) throws URISyntaxException {
        log.debug("REST request to partial update AdditionalOption partially : {}, {}", id, additionalOption);
        if (additionalOption.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, additionalOption.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!additionalOptionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<AdditionalOption> result = additionalOptionRepository
            .findById(additionalOption.getId())
            .map(existingAdditionalOption -> {
                if (additionalOption.getOption() != null) {
                    existingAdditionalOption.setOption(additionalOption.getOption());
                }

                return existingAdditionalOption;
            })
            .map(additionalOptionRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, additionalOption.getId().toString())
        );
    }

    /**
     * {@code GET  /additional-options} : get all the additionalOptions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of additionalOptions in body.
     */
    @GetMapping("/additional-options")
    public List<AdditionalOption> getAllAdditionalOptions() {
        log.debug("REST request to get all AdditionalOptions");
        return additionalOptionRepository.findAll();
    }

    /**
     * {@code GET  /additional-options/:id} : get the "id" additionalOption.
     *
     * @param id the id of the additionalOption to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the additionalOption, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/additional-options/{id}")
    public ResponseEntity<AdditionalOption> getAdditionalOption(@PathVariable Long id) {
        log.debug("REST request to get AdditionalOption : {}", id);
        Optional<AdditionalOption> additionalOption = additionalOptionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(additionalOption);
    }

    /**
     * {@code DELETE  /additional-options/:id} : delete the "id" additionalOption.
     *
     * @param id the id of the additionalOption to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/additional-options/{id}")
    public ResponseEntity<Void> deleteAdditionalOption(@PathVariable Long id) {
        log.debug("REST request to delete AdditionalOption : {}", id);
        additionalOptionRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
