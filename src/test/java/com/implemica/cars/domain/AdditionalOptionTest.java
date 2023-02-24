package com.implemica.cars.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.implemica.cars.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class AdditionalOptionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AdditionalOption.class);
        AdditionalOption additionalOption1 = new AdditionalOption();
        additionalOption1.setId(1L);
        AdditionalOption additionalOption2 = new AdditionalOption();
        additionalOption2.setId(additionalOption1.getId());
        assertThat(additionalOption1).isEqualTo(additionalOption2);
        additionalOption2.setId(2L);
        assertThat(additionalOption1).isNotEqualTo(additionalOption2);
        additionalOption1.setId(null);
        assertThat(additionalOption1).isNotEqualTo(additionalOption2);
    }
}
