package com.dedalus.dedalus.service;

import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@RequiredArgsConstructor
class TextAnalyzerTest {
    @Autowired
    private TextAnalyzer textAnalyzer;

    @Test
    void testVowelCounting() {
        Map<String, Integer> result = textAnalyzer.analyzeText("Lorem ipsum dolor sit amet", TextAnalyzer.Mode.VOWELS);
        assertEquals(5, result.size());
        assertEquals(3, result.get("O"));
        assertEquals(2, result.get("E"));
        assertEquals(2, result.get("I"));
        assertEquals(1, result.get("U"));
        assertEquals(1, result.get("A"));
    }

    @Test
    void testConsonantCounting() {
        Map<String, Integer> result = textAnalyzer.analyzeText("Lorem ipsum dolor sit amet", TextAnalyzer.Mode.CONSONANTS);
        assertEquals(7, result.size());
        assertEquals(2, result.get("L"));
        assertEquals(2, result.get("R"));
        assertEquals(3, result.get("M"));
        assertEquals(1, result.get("P"));
        assertEquals(1, result.get("D"));
        assertEquals(2, result.get("S"));
        assertEquals(2, result.get("T"));
    }

    @Test
    void testMixedCase() {
        Map<String, Integer> result = textAnalyzer.analyzeText("AeIoU aeiou", TextAnalyzer.Mode.VOWELS);
        assertEquals(5, result.size());
        assertEquals(2, result.get("A"));
        assertEquals(2, result.get("E"));
        assertEquals(2, result.get("I"));
        assertEquals(2, result.get("O"));
        assertEquals(2, result.get("U"));
    }

    @Test
    void testOnlyConsonants() {
        Map<String, Integer> result = textAnalyzer.analyzeText("BCDF bcdf", TextAnalyzer.Mode.CONSONANTS);
        assertEquals(4, result.size());
        assertEquals(2, result.get("B"));
        assertEquals(2, result.get("C"));
        assertEquals(2, result.get("D"));
        assertEquals(2, result.get("F"));
    }

    @Test
    void testSpecialVowels(){
        Map<String, Integer> result = textAnalyzer.analyzeText("ÁÉÜ", TextAnalyzer.Mode.VOWELS);
        assertEquals(3, result.size());
        assertEquals(1, result.get("Á"));
        assertEquals(1, result.get("É"));
        assertEquals(1, result.get("Ü"));
    }


    @Test
    void testSpecialConsonants(){
        Map<String, Integer> result = textAnalyzer.analyzeText("ß", TextAnalyzer.Mode.CONSONANTS);
        assertEquals(1, result.size());
        assertEquals(1, result.get("ß"));
    }

    @Test
    void testNonLetterCharactersIgnored() {
        Map<String, Integer> result = textAnalyzer.analyzeText("123 !?.,", TextAnalyzer.Mode.VOWELS);
        assertTrue(result.isEmpty());
    }

    @Test
    void testEmptyStringReturnsEmptyMap() {
        Map<String, Integer> result = textAnalyzer.analyzeText("", TextAnalyzer.Mode.CONSONANTS);
        assertTrue(result.isEmpty());
    }
}