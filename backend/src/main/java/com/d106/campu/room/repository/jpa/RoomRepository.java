package com.d106.campu.room.repository.jpa;

import com.d106.campu.campsite.domain.jpa.Campsite;
import com.d106.campu.room.domain.jpa.Room;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RoomRepository extends JpaRepository<Room, Long> {

    @Query("""
        SELECT r
        FROM Room r
            LEFT JOIN FETCH r.campsite c
            LEFT JOIN FETCH r.induty i
        WHERE r.campsite = :campsite
        """)
    Page<Room> findByCampsite(Pageable pageable, @Param("campsite") Campsite campsite);

}
