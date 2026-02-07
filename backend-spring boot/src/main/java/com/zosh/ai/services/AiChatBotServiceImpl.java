package com.zosh.ai.services;

import com.zosh.response.ApiResponse;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AiChatBotServiceImpl implements AiChatBotService {

    @Value("${groq.api.key}")
    private String groqApiKey;

    private final RestTemplate restTemplate;

    // ✅ Use Spring-managed RestTemplate
    public AiChatBotServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public ApiResponse aiChatBot(String prompt, Long productId, Long userId) {

        String url = "https://api.groq.com/openai/v1/chat/completions";

        // -------- Request Body --------
        JSONObject body = new JSONObject();
        body.put("model", "llama-3.1-8b-instant"); // ✅ FIXED MODEL
        body.put("temperature", 0.7);

        JSONArray messages = new JSONArray();
        messages.put(new JSONObject()
                .put("role", "user")
                .put("content", prompt)
        );

        body.put("messages", messages);

        // -------- Headers --------
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(groqApiKey);

        HttpEntity<String> request =
                new HttpEntity<>(body.toString(), headers);

        // -------- API Call --------
        ResponseEntity<String> response =
                restTemplate.postForEntity(url, request, String.class);

        // -------- Parse Response --------
        JSONObject json = new JSONObject(response.getBody());

        String text = json
                .getJSONArray("choices")
                .getJSONObject(0)
                .getJSONObject("message")
                .getString("content");

        return new ApiResponse(text, true);
    }
}
