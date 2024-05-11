package com.d106.campu.common.util;

import com.d106.campu.auth.constant.AuthConstant;
import com.d106.campu.notification.constant.NotificationConstant;
import com.d106.campu.notification.dto.NotificationDto;
import jakarta.annotation.PostConstruct;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.MultipleMessageSendingRequest;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.MultipleMessageSentResponse;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class SmsUtil {

    @Value("${coolsms.api.domain}")
    private String apiDomain;

    @Value("${coolsms.api.key}")
    private String apiKey;

    @Value("${coolsms.api.secret}")
    private String apiSecretKey;

    @Value("${coolsms.api.from}")
    private String from;

    private DefaultMessageService messageService;

    @PostConstruct
    private void init() {
        this.messageService = NurigoApp.INSTANCE.initialize(apiKey, apiSecretKey, apiDomain);
    }

    public SingleMessageSentResponse sendOne(String to, int verificationCode) {
        Message message = new Message();

        message.setFrom(from);
        message.setTo(to);
        message.setText(AuthConstant.TEL_AUTH_SEND_MESSAGE + verificationCode);

        return this.messageService.sendOne(new SingleMessageSendingRequest(message));
    }

    public MultipleMessageSentResponse sendEmptyRoomNotification(List<NotificationDto.SaveResponse> saveResponseDtoList) {
        List<Message> messageList = saveResponseDtoList.stream()
            .map(saveResponseDto -> {
                Message message = new Message();
                message.setFrom(from);
                message.setTo(saveResponseDto.getTel());
                message.setText(
                    NotificationConstant.EMPTY_ROOM_SMS + saveResponseDto.getMessage() + "\n" + saveResponseDto.getUrl());
                return message;
            })
            .toList();

        if (messageList.isEmpty()) {
            return null;
        }

        log.info("Send SMS notification for empty room");
        return this.messageService.sendMany(new MultipleMessageSendingRequest(messageList));
    }

}