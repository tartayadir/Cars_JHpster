package com.implemica.cars.domain.enumeration;

/**
 * The CarBodyType enumeration.
 */
public enum CarBodyType {
    SEDAN("Sedan"),
    COUPE("Coupe"),
    SPORTS_CAR("Sports car"),
    STATION_WAGON("Station wagon"),
    HATCHBACK("Hatchback"),
    CONVERTIBLE("Convertible"),
    MINIVAN("Minivan"),
    PICKUP("Pickup"),
    SUV("SUV");

    private final String value;

    CarBodyType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
