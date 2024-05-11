package com.d106.campu.campsite.domain.jpa;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import java.util.Objects;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "campsite_location")
@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class CampsiteLocation {

    @Id
    @OneToOne
    @JoinColumn(name = "campsite_id")
    @JsonIgnore
    private Campsite campsite;

    @Column(name = "map_x")
    private Double mapX;

    @Column(name = "map_y")
    private Double mapY;

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        CampsiteLocation that = (CampsiteLocation) o;
        return Objects.equals(campsite, that.campsite);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(campsite);
    }
}
