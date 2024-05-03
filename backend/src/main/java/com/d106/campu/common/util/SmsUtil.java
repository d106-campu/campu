package com.d106.campu.common.util;

import com.d106.campu.auth.constant.AuthConstant;
import jakarta.annotation.PostConstruct;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

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
    private void init(){
        this.messageService = NurigoApp.INSTANCE.initialize(apiKey, apiSecretKey, apiDomain);
    }

    public SingleMessageSentResponse sendOne(String to, int verificationCode) {
        Message message = new Message();

        message.setFrom(from);
        message.setTo(to);
        message.setText(AuthConstant.TEL_AUTH_SEND_MESSAGE + verificationCode);

        return this.messageService.sendOne(new SingleMessageSendingRequest(message));
    }

}