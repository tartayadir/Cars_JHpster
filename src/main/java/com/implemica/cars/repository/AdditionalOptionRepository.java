package com.implemica.cars.repository;

import com.implemica.cars.domain.AdditionalOption;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 This interface represents a Spring Data JPA repository for the AdditionalOption entity. It provides methods
 to perform CRUD (Create, Read, Update, Delete) operations on AdditionalOption objects, as well as a
 method to find all additional options associated with a specific car.
 */
@Repository
public interface AdditionalOptionRepository extends JpaRepository<AdditionalOption, Long> {
    /**
     Retrieves all additional options associated with the specified car.
     @param carID the id of the car to retrieve additional options for.
     @return a list of AdditionalOption objects associated with the specified car.
     */
    @Query("select additionalOption from AdditionalOption additionalOption where additionalOption.car.id = ?1")
    List<AdditionalOption> findAllByCarId(Long carID);

    void deleteByCar_Id(Long car_id);
}
