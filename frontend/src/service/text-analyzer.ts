import {Injectable} from '@angular/core';
import {LetterCountingResult} from "../model/letter-counting-result";
import {LetterCountMode} from "../model/letter-count-mode";

/**
 * Analyzes text to count how many times each letter appears.
 * Counts can be either for vowels or consonants, depending on the selected mode.
 * Only supports Latin scripts.
 *
 * Use {@link countLetters} to perform the analysis.
 */
@Injectable({
    providedIn: 'root'
})
export class TextAnalyzer {
    /**
     * Counts the letters in the input text based on the given mode.
     * Letters are converted to uppercase.
     * Only supports Latin scripts.
     *
     * @param input - The text to analyze
     * @param mode - `'VOWELS'` to count vowels, `'CONSONANTS'` to count consonants
     * @returns {@link LetterCountingResult} - letters to their occurrence count
     */
    public countLetters(input: string, mode: LetterCountMode): LetterCountingResult {
        return Array.from(input)
            .map(character => this.toUpperCaseSafe(character))
            .filter(character => this.isLetter(character))
            .filter(character => (mode === LetterCountMode.VOWELS) === this.isUpperCaseCharacterAVowel(character))
            .reduce((result, character) => {
                result[character] = (result[character] || 0) + 1;
                return result;
            }, {} as LetterCountingResult);
    }

    private toUpperCaseSafe(character: string) {
        //ß gets replaced with SS when string#toUpperCase() is called, which is not intended
        if (character === 'ß') return 'ß';
        return character.toUpperCase();
    }

    private isLetter(character: string) {
        return /^\p{L}$/u.test(character);
    }

    private isUpperCaseCharacterAVowel(upperCaseCharacter: string) {
        const vowels = ['A', 'E', 'I', 'O', 'U'];
        //Normalize Characters and removes the diacritic, may fail for non-Latin scripts
        const normalizedCharacter = upperCaseCharacter.normalize('NFD').replace(/\p{M}/u, '');
        return vowels.includes(normalizedCharacter);
    }
}
