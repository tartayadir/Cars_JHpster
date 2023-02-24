package com.implemica.cars.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.implemica.cars.domain.enumeration.CarBodyType;
import com.implemica.cars.domain.enumeration.CarBrand;
import com.implemica.cars.domain.enumeration.TransmissionBoxType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Car.
 */
@Entity
@Table(name = "car")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Car implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "car_brand", nullable = false)
    private CarBrand carBrand;

    @NotNull
    @Size(min = 2, max = 40)
    @Pattern(regexp = "^[a-zA-Z ]+[a-zA-Z0-9 ]*$")
    @Column(name = "model", length = 40, nullable = false)
    private String model;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "car_body_type", nullable = false)
    private CarBodyType carBodyType;

    @Min(value = 1920)
    @Max(value = 2023)
    @Column(name = "year")
    private Integer year;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "transmission_box_types", nullable = false)
    private TransmissionBoxType transmissionBoxTypes;

    @NotNull
    @DecimalMin(value = "0")
    @DecimalMax(value = "15")
    @Column(name = "engine_capacity", nullable = false)
    private Double engineCapacity;

    @Size(max = 5000)
    @Pattern(regexp = "^[a-zA-Z \n\r]+[a-zA-Z-\"/0-9 \n.,:!?%()`’‘'—–-]*$")
    @Column(name = "full_description", length = 5000)
    private String fullDescription;

    @Size(max = 1000)
    @Pattern(regexp = "^[a-zA-Z \n\r]+[a-zA-Z-\"/0-9 \n.,:!?%()`’‘'—–-]*$")
    @Column(name = "short_description", length = 1000)
    private String shortDescription;

    @Size(min = 10, max = 150)
    @Column(name = "image_file_id", length = 150)
    private String imageFileId;

    @OneToMany(mappedBy = "car")
    @JsonIgnoreProperties(value = { "car" }, allowSetters = true)
    private Set<AdditionalOption> additionalOptions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Car id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CarBrand getCarBrand() {
        return this.carBrand;
    }

    public Car carBrand(CarBrand carBrand) {
        this.setCarBrand(carBrand);
        return this;
    }

    public void setCarBrand(CarBrand carBrand) {
        this.carBrand = carBrand;
    }

    public String getModel() {
        return this.model;
    }

    public Car model(String model) {
        this.setModel(model);
        return this;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public CarBodyType getCarBodyType() {
        return this.carBodyType;
    }

    public Car carBodyType(CarBodyType carBodyType) {
        this.setCarBodyType(carBodyType);
        return this;
    }

    public void setCarBodyType(CarBodyType carBodyType) {
        this.carBodyType = carBodyType;
    }

    public Integer getYear() {
        return this.year;
    }

    public Car year(Integer year) {
        this.setYear(year);
        return this;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public TransmissionBoxType getTransmissionBoxTypes() {
        return this.transmissionBoxTypes;
    }

    public Car transmissionBoxTypes(TransmissionBoxType transmissionBoxTypes) {
        this.setTransmissionBoxTypes(transmissionBoxTypes);
        return this;
    }

    public void setTransmissionBoxTypes(TransmissionBoxType transmissionBoxTypes) {
        this.transmissionBoxTypes = transmissionBoxTypes;
    }

    public Double getEngineCapacity() {
        return this.engineCapacity;
    }

    public Car engineCapacity(Double engineCapacity) {
        this.setEngineCapacity(engineCapacity);
        return this;
    }

    public void setEngineCapacity(Double engineCapacity) {
        this.engineCapacity = engineCapacity;
    }

    public String getFullDescription() {
        return this.fullDescription;
    }

    public Car fullDescription(String fullDescription) {
        this.setFullDescription(fullDescription);
        return this;
    }

    public void setFullDescription(String fullDescription) {
        this.fullDescription = fullDescription;
    }

    public String getShortDescription() {
        return this.shortDescription;
    }

    public Car shortDescription(String shortDescription) {
        this.setShortDescription(shortDescription);
        return this;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public String getImageFileId() {
        return this.imageFileId;
    }

    public Car imageFileId(String imageFileId) {
        this.setImageFileId(imageFileId);
        return this;
    }

    public void setImageFileId(String imageFileId) {
        this.imageFileId = imageFileId;
    }

    public Set<AdditionalOption> getAdditionalOptions() {
        return this.additionalOptions;
    }

    public void setAdditionalOptions(Set<AdditionalOption> additionalOptions) {
        if (this.additionalOptions != null) {
            this.additionalOptions.forEach(i -> i.setCar(null));
        }
        if (additionalOptions != null) {
            additionalOptions.forEach(i -> i.setCar(this));
        }
        this.additionalOptions = additionalOptions;
    }

    public Car additionalOptions(Set<AdditionalOption> additionalOptions) {
        this.setAdditionalOptions(additionalOptions);
        return this;
    }

    public Car addAdditionalOption(AdditionalOption additionalOption) {
        this.additionalOptions.add(additionalOption);
        additionalOption.setCar(this);
        return this;
    }

    public Car removeAdditionalOption(AdditionalOption additionalOption) {
        this.additionalOptions.remove(additionalOption);
        additionalOption.setCar(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Car)) {
            return false;
        }
        return id != null && id.equals(((Car) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Car{" +
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
