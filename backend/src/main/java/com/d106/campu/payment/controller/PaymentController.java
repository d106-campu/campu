package com.d106.campu.payment.controller;

import com.d106.campu.common.response.Response;
import com.d106.campu.payment.controller.doc.PaymentControllerDoc;
import com.d106.campu.payment.dto.PaymentDto;
import com.d106.campu.payment.service.PaymentService;
import com.d106.campu.reservation.constant.ReservationConstant;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/payment")
@Slf4j
public class PaymentController implements PaymentControllerDoc {

    private final PaymentService paymentService;

    @Override
    @PostMapping("/prepare")
    public Response preparePayment(@RequestBody PaymentDto.PrepareRequest prepareRequest) {
        return new Response(ReservationConstant.PREPARE_PAYMENT, paymentService.preparePayment(prepareRequest));
    }

    @Override
    @PostMapping("/complete")
    public PaymentDto.CompleteResponse completePayment(@RequestBody PaymentDto.CompleteRequest completeRequestDto) {
        return paymentService.completePayment(completeRequestDto);
    }

    @Override
    @DeleteMapping("/cancel")
    public PaymentDto.CancelResponse cancelPayment(@RequestBody PaymentDto.CancelRequest cancelRequestDto) {
        return paymentService.cancelPayment(cancelRequestDto);
    }

}
