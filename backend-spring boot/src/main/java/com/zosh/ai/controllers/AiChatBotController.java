package com.zosh.ai.controllers;

import com.zosh.ai.services.AiChatBotService;
import com.zosh.exception.ProductException;
import com.zosh.request.Prompt;
import com.zosh.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ai/chat")
public class AiChatBotController {

    private final AiChatBotService aiChatBotService;

    @PostMapping
    public ResponseEntity<ApiResponse> generate(
            @RequestBody Prompt prompt,
            @RequestParam(required = false) Long productId
    ) throws ProductException {

        ApiResponse response =
                aiChatBotService.aiChatBot(
                        prompt.getPrompt(),
                        productId,
                        null   // guest user supported
                );

        return ResponseEntity.ok(response);
    }
}
