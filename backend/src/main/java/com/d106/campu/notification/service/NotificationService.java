package com.d106.campu.notification.service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public class NotificationService {

    public static final Map<String, SseEmitter> sseEmitterMap = new ConcurrentHashMap<>();

//    public SseEmitter connectSseV1() {
//        SseEmitter sseEmitter = new SseEmitter(NotificationConstant.SSE_TIMEOUT);
//        try {
//            Response response = new Response(NotificationConstant.STATUS, NotificationConstant.STATUS_SUCCESS);
//            sseEmitter.send(SseEmitter.event().name(NotificationConstant.SSE_EVENT).data(response));
//        } catch (Exception e) {
//            throw new InvalidException(ExceptionType.SseConnectException);
//        }
//        sseEmitterMap.put(securityHelper.getLoginUsername(), sseEmitter);
//        sseEmitter.onCompletion(() -> sseEmitterMap.remove(securityHelper.getLoginUsername()));
//        sseEmitter.onTimeout(() -> sseEmitterMap.remove(securityHelper.getLoginUsername()));
//        sseEmitter.onError((e) -> sseEmitterMap.remove(securityHelper.getLoginUsername()));
//        return sseEmitter;
//    }

//    public SseEmitter connectSseV2(String email) {
//        SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);
//        try {
//            Response response = new Response(NotificationConstant.STATUS, NotificationConstant.STATUS_SUCCESS);
//            sseEmitter.send(SseEmitter.event().name(NotificationConstant.SSE_EVENT).data(response));
//        } catch (Exception e) {
//            throw new InvalidException(ExceptionType.SseConnectException);
//        }
//        sseEmitterMap.put(email, sseEmitter);
//        sseEmitter.onCompletion(() -> sseEmitterMap.remove(email));
//        sseEmitter.onTimeout(() -> sseEmitterMap.remove(email));
//        sseEmitter.onError((e) -> sseEmitterMap.remove(email));
//        return sseEmitter;
//    }

}
