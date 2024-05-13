package com.d106.campu.payment.dto;

import lombok.Data;

public class PaymentDto {

    @Data
    public static class Request {

        private String imp_uid;
        private String merchant_uid;

    }

    @Data
    public static class PrepareRequest {

        private String merchant_uid;
        private Long amount;

    }

}
