package com.implemica.cars.service.dto;

import com.implemica.cars.domain.enumeration.CarBodyType;
import com.implemica.cars.domain.enumeration.CarBrand;
import com.implemica.cars.domain.enumeration.TransmissionBoxType;
import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.implemica.cars.domain.Car} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CarDTO implements Serializable {

    private Long id;

    @NotNull
    private CarBrand carBrand;

    @NotNull
    @Size(min = 2, max = 40)
    @Pattern(regexp = "^[a-zA-Z ]+[a-zA-Z0-9 ]*$")
    private String model;

    @NotNull
    private CarBodyType carBodyType;

    @Min(value = 1920)
    @Max(value = 2023)
    private Integer year;

    @NotNull
    private TransmissionBoxType transmissionBoxTypes;

    @NotNull
    @DecimalMin(value = "0")
    @DecimalMax(value = "15")
    private Double engineCapacity;

    @Size(max = 5000)
    @Pattern(regexp = "^[a-zA-Z \n\r]+[a-zA-Z-\"/0-9 \n.,:!?%()`’‘'—–-]*$")
    private String fullDescription;

    @Size(max = 1000)
    @Pattern(regexp = "^[a-zA-Z \n\r]+[a-zA-Z-\"/0-9 \n.,:!?%()`’‘'—–-]*$")
    private String shortDescription;

    @Size(min = 10, max = 150)
    private String imageFileId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CarBrand getCarBrand() {
        return carBrand;
    }

    public void setCarBrand(CarBrand carBrand) {
        this.carBrand = carBrand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public CarBodyType getCarBodyType() {
        return carBodyType;
    }

    public void setCarBodyType(CarBodyType carBodyType) {
        this.carBodyType = carBodyType;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public TransmissionBoxType getTransmissionBoxTypes() {
        return transmissionBoxTypes;
    }

    public void setTransmissionBoxTypes(TransmissionBoxType transmissionBoxTypes) {
        this.transmissionBoxTypes = transmissionBoxTypes;
    }

    public Double getEngineCapacity() {
        return engineCapacity;
    }

    public void setEngineCapacity(Double engineCapacity) {
        this.engineCapacity = engineCapacity;
    }

    public String getFullDescription() {
        return fullDescription;
    }

    public void setFullDescription(String fullDescription) {
        this.fullDescription = fullDescription;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public String getImageFileId() {
        return imageFileId;
    }

    public void setImageFileId(String imageFileId) {
        this.imageFileId = imageFileId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CarDTO)) {
            return false;
        }

        CarDTO carDTO = (CarDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, carDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CarDTO{" +
            "id=" + getId() +
            ", carBrand='" + getCarBrand() + "'" +
            ", model='" + getModel() + "'" +
            ", carBodyType='" + getCarBodyType() + "'" +
            ", year=" + getYear() +
            ", transmissionBoxTypes='" + getTransmissionBoxTypes() + "'" +
            ", engineCapacity=" + getEngineCapacity() +
            ", fullDescription='" + getFullDescription() + "'" +
            ", shortDescription='" + getShortDescription() + "'" +
            ", imageFileId='" + getImageFileId() + "'" +
            "}";
    }
}
