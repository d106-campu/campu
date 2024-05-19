package com.d106.campu.reservation.domain.jpa;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ReservationCancel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "reason")
    private String reason;

    @Column(name = "amount")
    private Long amount;

    @Column(name = "refund_holder")
    private String refundHolder;

    @Column(name = "refund_bank")
    private String refundBank;

    @Column(name = "refund_account")
    private String refundAccount;

    @Column(name = "checksum")
    private Long checksum;

    @Column(name = "tax_free")
    private Long taxFree;

    @Column(name = "vat_amount")
    private Long vatAmount;

}
