package com.d106.campu.payment.controller;

import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.request.CancelData;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import jakarta.annotation.PostConstruct;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
    public IamportResponse<Payment> makePaymentByImpUid(@PathVariable(value = "impUid") String impUid)
        throws IamportResponseException, IOException {
        iamportClient.pre
//        return iamportClient.paymentByImpUid(impUid);
        return null;
    }

    @DeleteMapping("/cancel/{impUid}")
    public IamportResponse<Payment> cancelPaymentByImpUid(@PathVariable(value = "impUid") String impUid)
        throws IamportResponseException, IOException {
        CancelData cancelData = new CancelData(impUid, true);
        IamportResponse iamportResponse = iamportClient.cancelPaymentByImpUid(cancelData);
        System.out.println(iamportResponse);
        return iamportResponse;
    }

}
