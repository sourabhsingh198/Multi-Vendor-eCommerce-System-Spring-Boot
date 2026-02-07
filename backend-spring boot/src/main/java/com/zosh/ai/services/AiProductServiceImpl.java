package com.zosh.ai.services;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AiProductServiceImpl implements AiProductService {

    @Value("${groq.api.key}")
    private String groqApiKey;

    private final RestTemplate restTemplate;

    public AiProductServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public String simpleChat(String prompt) {

        String url = "https://api.groq.com/openai/v1/chat/completions";

        // ---- Request Body ----
        JSONObject body = new JSONObject()
            .put("model", "llama-3.1-8b-instant") // ✅ ACTIVE MODEL
            .put("messages", new JSONArray()
                .put(new JSONObject()
                    .put("role", "user")
                    .put("content", prompt)
                )
            )
            .put("temperature", 0.7);

        // ---- Headers ----
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(groqApiKey);

        HttpEntity<String> request =
            new HttpEntity<>(body.toString(), headers);

        // ---- API Call ----
        ResponseEntity<String> response =
            restTemplate.postForEntity(url, request, String.class);

        // ---- Parse Response ----
        JSONObject json = new JSONObject(response.getBody());

        return json
            .getJSONArray("choices")
            .getJSONObject(0)
            .getJSONObject("message")
            .getString("content");
    }
}
