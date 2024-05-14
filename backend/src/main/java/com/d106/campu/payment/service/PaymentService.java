package com.d106.campu.payment.service;

import com.d106.campu.campsite.repository.jpa.CampsiteRepository;
import com.d106.campu.common.exception.InvalidException;
import com.d106.campu.common.exception.NotFoundException;
import com.d106.campu.common.exception.code.CommonExceptionCode;
import com.d106.campu.common.util.SecurityHelper;
import com.d106.campu.payment.dto.PaymentDto;
import com.d106.campu.reservation.constant.PaymentStatus;
import com.d106.campu.reservation.constant.ReservationConstant;
import com.d106.campu.reservation.domain.jpa.Reservation;
import com.d106.campu.reservation.domain.jpa.ReservationCancel;
import com.d106.campu.reservation.domain.jpa.ReservationPayment;
import com.d106.campu.reservation.exception.code.ReservationExceptionCode;
import com.d106.campu.reservation.mapper.ReservationMapper;
import com.d106.campu.reservation.repository.jpa.ReservationCancelRepository;
import com.d106.campu.reservation.repository.jpa.ReservationRepository;
import com.d106.campu.room.domain.jpa.Room;
import com.d106.campu.room.exception.code.RoomExceptionCode;
import com.d106.campu.room.repository.jpa.RoomRepository;
import com.d106.campu.user.domain.jpa.User;
import com.d106.campu.user.exception.code.UserExceptionCode;
import com.d106.campu.user.repository.jpa.UserRepository;
import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.request.CancelData;
import com.siot.IamportRestClient.request.PrepareData;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import com.siot.IamportRestClient.response.Prepare;
import jakarta.annotation.PostConstruct;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Slf4j
@Service
public class PaymentService {

    private final ReservationRepository reservationRepository;
    private final ReservationCancelRepository reservationCancelRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    private final CampsiteRepository campsiteRepository;
    private final SecurityHelper securityHelper;
    private final ReservationMapper reservationMapper;

    private IamportClient iamportClient;

    @PostConstruct
    public void init() {
        iamportClient = new IamportClient(apiKey, apiSecret);
    }

    @Value("${imp.api.key}")
    private String apiKey;

    @Value("${imp.api.secret}")
    private String apiSecret;

    @Transactional
    public PaymentDto.PrepareResponse preparePayment(PaymentDto.PrepareRequest prepareRequest) {
        Reservation reservation = reservationMapper.toReservation(prepareRequest);
        reservation.setStatus(PaymentStatus.PREPARE);

        Room room = roomRepository.findById(prepareRequest.getRoomId())
            .orElseThrow(() -> new NotFoundException(RoomExceptionCode.NOT_FOUND_ROOM));
        User user = userRepository.findByAccount(securityHelper.getLoginAccount())
            .orElseThrow(() -> new NotFoundException(UserExceptionCode.USER_NOT_FOUND));

        int totalPrice = room.getPrice() + room.getExtraPrice() * (prepareRequest.getHeadCnt() - room.getBaseNo());
        if (room.getMaxNo() < prepareRequest.getHeadCnt() || totalPrice != prepareRequest.getPrice()) {
            throw new InvalidException(CommonExceptionCode.INVALID_PARAM);
        }

        LocalDateTime now = LocalDateTime.now();
        String merchantUid = String.join("-", now.format(DateTimeFormatter.BASIC_ISO_DATE), UUID.randomUUID().toString());
        String name = String.join("-", room.getCampsite().getFacltNm(), room.getName());
        ReservationPayment reservationPayment = ReservationPayment.builder()
            .impUid(null)
            .pg(ReservationConstant.PG)
            .payMethod(ReservationConstant.PAY_METHOD)
            .merchantUid(merchantUid)
            .name(name)
            .amount(totalPrice)
            .buyerEmail(ReservationConstant.UNKNOWN)
            .buyerName(user.getNickname())
            .buyerTel(user.getTel())
            .buyerAddr(ReservationConstant.UNKNOWN)
            .buyerPostcode(ReservationConstant.UNKNOWN)
            .build();
        reservation.setReference(user, room, reservationPayment);

        PrepareData prepareData = new PrepareData(merchantUid, BigDecimal.valueOf(totalPrice));
        IamportResponse<Prepare> iamportResponse = null;
        try {
            iamportResponse = iamportClient.postPrepare(prepareData);
        } catch (Exception e) {
            reservation.setStatus(PaymentStatus.FAIL);
            throw new InvalidException(ReservationExceptionCode.RESERVATION_FAIL_EX);
        }
        if (iamportResponse.getCode() != 0) {
            reservation.setStatus(PaymentStatus.FAIL);
            throw new InvalidException(ReservationExceptionCode.RESERVATION_FAIL_CODE);
        }

        return reservationMapper.toPrepareResponseDto(reservationRepository.save(reservation));
    }

    @Transactional
    public PaymentDto.CompleteResponse completePayment(PaymentDto.CompleteRequest completeRequest) {
        Reservation reservation = reservationRepository.findById(Long.parseLong(completeRequest.getReservationId()))
            .orElseThrow(() -> new NotFoundException(ReservationExceptionCode.RESERVATION_NOT_FOUND));
        if (reservation.getStatus() != PaymentStatus.PREPARE) {
            throw new InvalidException(ReservationExceptionCode.RESERVATION_FAIL_EX);
        }

        IamportResponse<Payment> iamportResponse = null;
        try {
            iamportResponse = iamportClient.paymentByImpUid(completeRequest.getImpUid());
        } catch (Exception e) {
            reservation.setStatus(PaymentStatus.FAIL);
            throw new InvalidException(ReservationExceptionCode.RESERVATION_FAIL_EX);
        }
        if (iamportResponse.getCode() != 0) {
            reservation.setStatus(PaymentStatus.FAIL);
            throw new InvalidException(ReservationExceptionCode.RESERVATION_FAIL_CODE);
        }

        reservation.getReservationPayment().setImpUid(completeRequest.getImpUid());
        reservation.setStatus(PaymentStatus.SUCCESS);

        return reservationMapper.toCompleteResponseDto(reservationRepository.save(reservation));
    }

    @Transactional
    public PaymentDto.CancelResponse cancelPayment(PaymentDto.CancelRequest cancelRequest) {
        Reservation reservation = reservationRepository.findById(cancelRequest.getReservationId())
            .orElseThrow(() -> new NotFoundException(ReservationExceptionCode.RESERVATION_NOT_FOUND));
        if (reservation.getStatus() != PaymentStatus.SUCCESS) {
            throw new InvalidException(ReservationExceptionCode.CANCEL_FAIL_EX);
        }

        CancelData cancelData = new CancelData(cancelRequest.getImpUid(), true);
        cancelData.setReason(cancelRequest.getReason());
        IamportResponse<Payment> iamportResponse = null;
        try {
            iamportResponse = iamportClient.cancelPaymentByImpUid(cancelData);
        } catch (Exception e) {
            reservation.setStatus(PaymentStatus.FAIL);
            throw new InvalidException(ReservationExceptionCode.CANCEL_FAIL_EX);
        }
        if (iamportResponse.getCode() != 0) {
            reservation.setStatus(PaymentStatus.FAIL);
            throw new InvalidException(ReservationExceptionCode.CANCEL_FAIL_CODE);
        }

        ReservationCancel reservationCancel = ReservationCancel.builder()
            .reason(cancelRequest.getReason())
            .build();
        reservationCancelRepository.save(reservationCancel);

        reservation.cancelPayment(reservationCancel);
        reservation.setStatus(PaymentStatus.CANCEL);

        return reservationMapper.toCancelResponseDto(reservationRepository.save(reservation));
    }

}
