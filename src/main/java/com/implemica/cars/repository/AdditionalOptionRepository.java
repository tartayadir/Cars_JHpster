package com.implemica.cars.repository;

import com.implemica.cars.domain.AdditionalOption;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the AdditionalOption entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AdditionalOptionRepository extends JpaRepository<AdditionalOption, Long> {}
