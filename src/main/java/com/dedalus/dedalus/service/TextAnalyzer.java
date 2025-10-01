package com.dedalus.dedalus.service;

import lombok.NonNull;
import org.springframework.stereotype.Service;

import java.text.Normalizer;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Analyzes text to count how many times each letter appears.
 * Counts can be either for vowels or consonants, depending on the selected mode.
 * Only supports Latin scripts.
 *
 * <p>Use {@link #analyzeText(String, Mode)} to perform the analysis.</p>
 */
@Service
public class TextAnalyzer {
    public enum Mode {
        VOWELS,
        CONSONANTS
    }

    /**
     * Counts the letters in the input text based on the given mode.
     * Letters are converted to uppercase.
     * Only supports Latin scripts.
     *
     * @param input the text to analyze
     * @param mode {@link Mode#VOWELS} to count vowels, {@link Mode#CONSONANTS} to count consonants
     * @return a map of letters to their occurrence count
     */
    public Map<String, Integer> analyzeText(@NonNull String input, @NonNull Mode mode) {
        return input.chars().mapToObj(character -> (char) character)
                .filter(Character::isLetter)
                .map(Character::toUpperCase)
                .filter(character -> (mode == Mode.VOWELS) == isUpperCaseLetterAVowel(character))
                .collect(Collectors.groupingBy(Object::toString, Collectors.summingInt(c -> 1)));
    }

    private boolean isUpperCaseLetterAVowel(@NonNull Character character) {
        List<Character> vowels = Arrays.asList('A', 'E', 'I', 'O', 'U');
        //Normalize Characters and removes the diacritic, may fail for non-Latin scripts
        Character normalized = Normalizer.normalize(String.valueOf(character), Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "")
                .toCharArray()[0];
        return vowels.contains(normalized);
    }
}
