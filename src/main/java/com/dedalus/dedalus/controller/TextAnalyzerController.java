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

    @GetMapping("/{text}/{mode}")
    public Map<String, Integer> analyzeText(@PathVariable String text, @PathVariable TextAnalyzer.Mode mode) {
        return textAnalyzer.analyzeText(text, mode);
    }
}
