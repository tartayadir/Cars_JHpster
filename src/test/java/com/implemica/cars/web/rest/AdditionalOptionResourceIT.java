package com.implemica.cars.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.implemica.cars.IntegrationTest;
import com.implemica.cars.domain.AdditionalOption;
import com.implemica.cars.repository.AdditionalOptionRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link AdditionalOptionResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class AdditionalOptionResourceIT {

    private static final String DEFAULT_OPTION = "AAAAAAAAAA";
    private static final String UPDATED_OPTION = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/additional-options";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private AdditionalOptionRepository additionalOptionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAdditionalOptionMockMvc;

    private AdditionalOption additionalOption;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AdditionalOption createEntity(EntityManager em) {
        AdditionalOption additionalOption = new AdditionalOption().option(DEFAULT_OPTION);
        return additionalOption;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AdditionalOption createUpdatedEntity(EntityManager em) {
        AdditionalOption additionalOption = new AdditionalOption().option(UPDATED_OPTION);
        return additionalOption;
    }

    @BeforeEach
    public void initTest() {
        additionalOption = createEntity(em);
    }

    @Test
    @Transactional
    void createAdditionalOption() throws Exception {
        int databaseSizeBeforeCreate = additionalOptionRepository.findAll().size();
        // Create the AdditionalOption
        restAdditionalOptionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(additionalOption))
            )
            .andExpect(status().isCreated());

        // Validate the AdditionalOption in the database
        List<AdditionalOption> additionalOptionList = additionalOptionRepository.findAll();
        assertThat(additionalOptionList).hasSize(databaseSizeBeforeCreate + 1);
        AdditionalOption testAdditionalOption = additionalOptionList.get(additionalOptionList.size() - 1);
        assertThat(testAdditionalOption.getOption()).isEqualTo(DEFAULT_OPTION);
    }

    @Test
    @Transactional
    void createAdditionalOptionWithExistingId() throws Exception {
        // Create the AdditionalOption with an existing ID
        additionalOption.setId(1L);

        int databaseSizeBeforeCreate = additionalOptionRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restAdditionalOptionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(additionalOption))
            )
            .andExpect(status().isBadRequest());

        // Validate the AdditionalOption in the database
        List<AdditionalOption> additionalOptionList = additionalOptionRepository.findAll();
        assertThat(additionalOptionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllAdditionalOptions() throws Exception {
        // Initialize the database
        additionalOptionRepository.saveAndFlush(additionalOption);

        // Get all the additionalOptionList
        restAdditionalOptionMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(additionalOption.getId().intValue())))
            .andExpect(jsonPath("$.[*].option").value(hasItem(DEFAULT_OPTION)));
    }

    @Test
    @Transactional
    void getAdditionalOption() throws Exception {
        // Initialize the database
        additionalOptionRepository.saveAndFlush(additionalOption);

        // Get the additionalOption
        restAdditionalOptionMockMvc
            .perform(get(ENTITY_API_URL_ID, additionalOption.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(additionalOption.getId().intValue()))
            .andExpect(jsonPath("$.option").value(DEFAULT_OPTION));
    }

    @Test
    @Transactional
    void getNonExistingAdditionalOption() throws Exception {
        // Get the additionalOption
        restAdditionalOptionMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingAdditionalOption() throws Exception {
        // Initialize the database
        additionalOptionRepository.saveAndFlush(additionalOption);

        int databaseSizeBeforeUpdate = additionalOptionRepository.findAll().size();

        // Update the additionalOption
        AdditionalOption updatedAdditionalOption = additionalOptionRepository.findById(additionalOption.getId()).get();
        // Disconnect from session so that the updates on updatedAdditionalOption are not directly saved in db
        em.detach(updatedAdditionalOption);
        updatedAdditionalOption.option(UPDATED_OPTION);

        restAdditionalOptionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedAdditionalOption.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedAdditionalOption))
            )
            .andExpect(status().isOk());

        // Validate the AdditionalOption in the database
        List<AdditionalOption> additionalOptionList = additionalOptionRepository.findAll();
        assertThat(additionalOptionList).hasSize(databaseSizeBeforeUpdate);
        AdditionalOption testAdditionalOption = additionalOptionList.get(additionalOptionList.size() - 1);
        assertThat(testAdditionalOption.getOption()).isEqualTo(UPDATED_OPTION);
    }

    @Test
    @Transactional
    void putNonExistingAdditionalOption() throws Exception {
        int databaseSizeBeforeUpdate = additionalOptionRepository.findAll().size();
        additionalOption.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAdditionalOptionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, additionalOption.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(additionalOption))
            )
            .andExpect(status().isBadRequest());

        // Validate the AdditionalOption in the database
        List<AdditionalOption> additionalOptionList = additionalOptionRepository.findAll();
        assertThat(additionalOptionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchAdditionalOption() throws Exception {
        int databaseSizeBeforeUpdate = additionalOptionRepository.findAll().size();
        additionalOption.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAdditionalOptionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(additionalOption))
            )
            .andExpect(status().isBadRequest());

        // Validate the AdditionalOption in the database
        List<AdditionalOption> additionalOptionList = additionalOptionRepository.findAll();
        assertThat(additionalOptionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamAdditionalOption() throws Exception {
        int databaseSizeBeforeUpdate = additionalOptionRepository.findAll().size();
        additionalOption.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAdditionalOptionMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(additionalOption))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the AdditionalOption in the database
        List<AdditionalOption> additionalOptionList = additionalOptionRepository.findAll();
        assertThat(additionalOptionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateAdditionalOptionWithPatch() throws Exception {
        // Initialize the database
        additionalOptionRepository.saveAndFlush(additionalOption);

        int databaseSizeBeforeUpdate = additionalOptionRepository.findAll().size();

        // Update the additionalOption using partial update
        AdditionalOption partialUpdatedAdditionalOption = new AdditionalOption();
        partialUpdatedAdditionalOption.setId(additionalOption.getId());

        restAdditionalOptionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAdditionalOption.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAdditionalOption))
            )
            .andExpect(status().isOk());

        // Validate the AdditionalOption in the database
        List<AdditionalOption> additionalOptionList = additionalOptionRepository.findAll();
        assertThat(additionalOptionList).hasSize(databaseSizeBeforeUpdate);
        AdditionalOption testAdditionalOption = additionalOptionList.get(additionalOptionList.size() - 1);
        assertThat(testAdditionalOption.getOption()).isEqualTo(DEFAULT_OPTION);
    }

    @Test
    @Transactional
    void fullUpdateAdditionalOptionWithPatch() throws Exception {
        // Initialize the database
        additionalOptionRepository.saveAndFlush(additionalOption);

        int databaseSizeBeforeUpdate = additionalOptionRepository.findAll().size();

        // Update the additionalOption using partial update
        AdditionalOption partialUpdatedAdditionalOption = new AdditionalOption();
        partialUpdatedAdditionalOption.setId(additionalOption.getId());

        partialUpdatedAdditionalOption.option(UPDATED_OPTION);

        restAdditionalOptionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAdditionalOption.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAdditionalOption))
            )
            .andExpect(status().isOk());

        // Validate the AdditionalOption in the database
        List<AdditionalOption> additionalOptionList = additionalOptionRepository.findAll();
        assertThat(additionalOptionList).hasSize(databaseSizeBeforeUpdate);
        AdditionalOption testAdditionalOption = additionalOptionList.get(additionalOptionList.size() - 1);
        assertThat(testAdditionalOption.getOption()).isEqualTo(UPDATED_OPTION);
    }

    @Test
    @Transactional
    void patchNonExistingAdditionalOption() throws Exception {
        int databaseSizeBeforeUpdate = additionalOptionRepository.findAll().size();
        additionalOption.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAdditionalOptionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, additionalOption.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(additionalOption))
            )
            .andExpect(status().isBadRequest());

        // Validate the AdditionalOption in the database
        List<AdditionalOption> additionalOptionList = additionalOptionRepository.findAll();
        assertThat(additionalOptionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchAdditionalOption() throws Exception {
        int databaseSizeBeforeUpdate = additionalOptionRepository.findAll().size();
        additionalOption.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAdditionalOptionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(additionalOption))
            )
            .andExpect(status().isBadRequest());

        // Validate the AdditionalOption in the database
        List<AdditionalOption> additionalOptionList = additionalOptionRepository.findAll();
        assertThat(additionalOptionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamAdditionalOption() throws Exception {
        int databaseSizeBeforeUpdate = additionalOptionRepository.findAll().size();
        additionalOption.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAdditionalOptionMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(additionalOption))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the AdditionalOption in the database
        List<AdditionalOption> additionalOptionList = additionalOptionRepository.findAll();
        assertThat(additionalOptionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteAdditionalOption() throws Exception {
        // Initialize the database
        additionalOptionRepository.saveAndFlush(additionalOption);

        int databaseSizeBeforeDelete = additionalOptionRepository.findAll().size();

        // Delete the additionalOption
        restAdditionalOptionMockMvc
            .perform(delete(ENTITY_API_URL_ID, additionalOption.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AdditionalOption> additionalOptionList = additionalOptionRepository.findAll();
        assertThat(additionalOptionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
