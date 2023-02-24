package com.implemica.cars.domain.enumeration;

/**
 * The TransmissionBoxType enumeration.
 */
public enum TransmissionBoxType {
    MECHANICAL("Mechanical"),
    AUTOMATIC("Automatic"),
    ROBOTIC("Robotic"),
    VARIATIONAL("Variational");

    private final String value;

    TransmissionBoxType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
