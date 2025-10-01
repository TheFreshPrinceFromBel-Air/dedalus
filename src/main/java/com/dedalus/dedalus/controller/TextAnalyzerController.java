package com.dedalus.dedalus.controller;

import com.dedalus.dedalus.service.TextAnalyzer;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class TextAnalyzerController {
    private final TextAnalyzer textAnalyzer;

    public record AnalyzeTextRequest(String text, TextAnalyzer.Mode mode) {
    }

    @PostMapping("/")
    public Map<String, Integer> analyzeText(@RequestBody AnalyzeTextRequest analyzeTextRequest) {
        return textAnalyzer.analyzeText(analyzeTextRequest.text, analyzeTextRequest.mode);
    }
}
