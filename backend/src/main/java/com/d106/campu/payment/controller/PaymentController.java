package com.d106.campu.payment.controller;

import com.d106.campu.payment.dto.PaymentDto;
import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.request.CancelData;
import com.siot.IamportRestClient.request.PrepareData;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import com.siot.IamportRestClient.response.Prepare;
import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.math.BigDecimal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/payment")
@Slf4j
public class PaymentController {

    private IamportClient iamportClient;

    @PostConstruct
    public void init() {
        iamportClient = new IamportClient(apiKey, apiSecret);
    }

    @Value("${imp.api.key}")
    private String apiKey;

    @Value("${imp.api.secret}")
    private String apiSecret;

    @PostMapping("/complete")
    public IamportResponse<Payment> makePaymentByImpUid(@RequestBody PaymentDto.Request requestDto)
        throws IamportResponseException, IOException {
        log.info("requestDto: {}", requestDto);
        return iamportClient.paymentByImpUid(requestDto.getImp_uid());
    }

    @DeleteMapping("/cancel/{impUid}")
    public IamportResponse<Payment> cancelPaymentByImpUid(@PathVariable(value = "impUid") String impUid)
        throws IamportResponseException, IOException {
        CancelData cancelData = new CancelData(impUid, true);
        IamportResponse<Payment> iamportResponse = iamportClient.cancelPaymentByImpUid(cancelData);
        log.info("iamportResponse code: {}", iamportResponse.getCode());
        log.info("iamportResponse message: {}", iamportResponse.getMessage());
        log.info("iamportResponse response: {}", iamportResponse.getResponse());
        return iamportResponse;
    }

    @PostMapping("/prepare")
    public IamportResponse<Prepare> preparePayment(@RequestBody PaymentDto.PrepareRequest prepareRequest)
        throws IamportResponseException, IOException {
        PrepareData prepareData = new PrepareData(prepareRequest.getMerchant_uid(),
            BigDecimal.valueOf(prepareRequest.getAmount()));
        IamportResponse<Prepare> iamportResponse = iamportClient.postPrepare(prepareData);
        log.info("iamportResponse code: {}", iamportResponse.getCode());
        log.info("iamportResponse message: {}", iamportResponse.getMessage());
        log.info("iamportResponse response: {}", iamportResponse.getResponse());
        return iamportResponse;
    }

}
