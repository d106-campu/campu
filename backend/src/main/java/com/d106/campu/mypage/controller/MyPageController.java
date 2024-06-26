package com.d106.campu.mypage.controller;

import com.d106.campu.common.response.Response;
import com.d106.campu.mypage.constant.DateType;
import com.d106.campu.mypage.constant.MyPageConstant;
import com.d106.campu.mypage.constant.UseType;
import com.d106.campu.mypage.controller.doc.MyPageControllerDoc;
import com.d106.campu.mypage.dto.MyPageDto.PasswordChangeRequest;
import com.d106.campu.mypage.service.MyPageService;
import com.d106.campu.user.constant.GenderType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/mypage")
@RequiredArgsConstructor
@RestController
public class MyPageController implements MyPageControllerDoc {

    private final MyPageService myPageService;

    @Override
    @GetMapping("/reservation")
    public Response getReservationList(Pageable pageable, @RequestParam DateType dateType, @RequestParam UseType useType) {
        return new Response(MyPageConstant.RESERVATION_LIST, myPageService.getReservationList(pageable, dateType, useType));
    }

    @Override
    @GetMapping("/review")
    public Response getReviewList(Pageable pageable, @RequestParam DateType dateType) {
        return new Response(MyPageConstant.REVIEW_LIST, myPageService.getReviewList(pageable, dateType));
    }

    @Override
    @GetMapping("/campsite")
    public Response getCampsiteList(Pageable pageable) {
        return new Response(MyPageConstant.CAMPSITE_LIST, myPageService.getCampsiteList(pageable));
    }

    @Override
    @GetMapping("/empty-notification")
    public Response getEmptyNotificationList() {
        return new Response(MyPageConstant.EMPTY_NOTIFICATION_LIST, myPageService.getEmptyNotificationList());
    }

    @Override
    @GetMapping("/profile")
    public Response getProfile() {
        return new Response(MyPageConstant.MY_PROFILE, myPageService.getProfile());
    }

    @Override
    @PostMapping("/profile/nickname")
    public Response updateNickname(@RequestParam String nickname) {
        myPageService.updateNickname(nickname);
        return new Response();
    }

    @Override
    @PostMapping("/profile/tel")
    public Response updateTel(@RequestParam String tel) {
        myPageService.updateTel(tel);
        return new Response();
    }

    @Override
    @PostMapping("/profile/password")
    public Response updatePassword(@RequestBody PasswordChangeRequest passwordChangeRequestDto) {
        myPageService.updatePassword(passwordChangeRequestDto);
        return new Response();
    }

    @Override
    @PostMapping("/profile/etc/info")
    public Response updateEtcInfo(@RequestParam GenderType gender, @RequestParam String birthYear) {
        myPageService.updateEtcInfo(gender, birthYear);
        return new Response();
    }

}
