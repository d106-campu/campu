package com.d106.campu.reservation.domain.jpa;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Embeddable
@AllArgsConstructor
public class ReservationPayment {

    @Column(table = "reservation_payment", name = "imp_uid")
    @Setter
    private String impUid;

    @Column(table = "reservation_payment", name = "pg")
    private String pg;

    @Column(table = "reservation_payment", name = "pay_method")
    private String payMethod;

    @Column(table = "reservation_payment", name = "merchant_uid")
    private String merchantUid;

    @Column(table = "reservation_payment", name = "name")
    private String name;

    @Column(table = "reservation_payment", name = "amount")
    private int amount;

    @Column(table = "reservation_payment", name = "buyer_email")
    private String buyerEmail;

    @Column(table = "reservation_payment", name = "buyer_name")
    private String buyerName;

    @Column(table = "reservation_payment", name = "buyer_tel")
    private String buyerTel;

    @Column(table = "reservation_payment", name = "buyer_addr")
    private String buyerAddr;

    @Column(table = "reservation_payment", name = "buyer_postcode")
    private String buyerPostcode;

}
