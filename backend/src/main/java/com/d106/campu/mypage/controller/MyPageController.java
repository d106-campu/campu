package com.d106.campu.mypage.controller;

import com.d106.campu.common.response.Response;
import com.d106.campu.mypage.constant.DateType;
import com.d106.campu.mypage.controller.doc.MyPageControllerDoc;
import com.d106.campu.mypage.service.MyPageService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
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
    public Response getReservationList(@PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable,
        @RequestParam DateType dateType) {
        return null;
    }

}
