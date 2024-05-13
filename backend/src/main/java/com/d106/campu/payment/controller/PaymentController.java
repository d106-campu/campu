package com.d106.campu.payment.controller;

import com.d106.campu.payment.dto.PaymentDto;
import com.d106.campu.payment.dto.PaymentDto.CompleteRequest;
import com.d106.campu.payment.dto.PaymentDto.CompleteResponse;
import com.d106.campu.payment.service.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/payment")
@Slf4j
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/prepare")
    public PaymentDto.PrepareResponse preparePayment(@RequestBody PaymentDto.PrepareRequest prepareRequest) {
        return paymentService.preparePayment(prepareRequest);
    }

    @PostMapping("/complete")
    public CompleteResponse completePayment(@RequestBody CompleteRequest completeRequestDto) {
        return paymentService.completePayment(completeRequestDto);
    }

//    @DeleteMapping("/cancel/{impUid}")
//    public void cancelPaymentByImpUid(@PathVariable(value = "impUid") String impUid)
//        throws IamportResponseException, IOException {
//        CancelData cancelData = new CancelData(impUid, true);
//        IamportResponse<Payment> iamportResponse = iamportClient.cancelPaymentByImpUid(cancelData);
//        log.info("iamportResponse code: {}", iamportResponse.getCode());
//        log.info("iamportResponse message: {}", iamportResponse.getMessage());
//        log.info("iamportResponse response: {}", iamportResponse.getResponse());
//        return iamportResponse;
//    }

}
