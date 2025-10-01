import {TestBed} from '@angular/core/testing';

import {TextAnalyzer} from './text-analyzer';
import {LetterCountingResult} from "../model/letter-counting-result";
import {LetterCountMode} from "../model/letter-count-mode";

describe('TextAnalyzer', () => {
    let service: TextAnalyzer;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(TextAnalyzer);
    });

    function getKeys(result: LetterCountingResult) {
        return Object.keys(result);
    }

    it('should count vowels correctly', () => {
        const input = 'Lorem ipsum dolor sit amet';
        const result = service.countLetters(input, LetterCountMode.VOWELS);

        expect(getKeys(result).length).toBe(5);
        expect(result['O']).toBe(3);
        expect(result['E']).toBe(2);
        expect(result['I']).toBe(2);
        expect(result['U']).toBe(1);
        expect(result['A']).toBe(1);
    });

    it('should count consonants correctly', () => {
        const input = 'Lorem ipsum dolor sit amet';
        const result = service.countLetters(input, LetterCountMode.CONSONANTS);

        expect(getKeys(result).length).toBe(7);
        expect(result['L']).toBe(2);
        expect(result['R']).toBe(2);
        expect(result['M']).toBe(3);
        expect(result['P']).toBe(1);
        expect(result['D']).toBe(1);
        expect(result['S']).toBe(2);
        expect(result['T']).toBe(2);
    });

    it('should handle mixed case for vowels', () => {
        const input = 'AeIoU aeiou';
        const result = service.countLetters(input, LetterCountMode.VOWELS);

        expect(getKeys(result).length).toBe(5);
        expect(result['A']).toBe(2);
        expect(result['E']).toBe(2);
        expect(result['I']).toBe(2);
        expect(result['O']).toBe(2);
        expect(result['U']).toBe(2);
    });

    it('should handle only consonants', () => {
        const input = 'BCDF bcdf';
        const result = service.countLetters(input, LetterCountMode.CONSONANTS);

        expect(getKeys(result).length).toBe(4);
        expect(result['B']).toBe(2);
        expect(result['C']).toBe(2);
        expect(result['D']).toBe(2);
        expect(result['F']).toBe(2);
    });

    it('should handle special vowels', () => {
        const input = 'ÁÉÜ';
        const result = service.countLetters(input, LetterCountMode.VOWELS);

        expect(getKeys(result).length).toBe(3);
        expect(result['Á']).toBe(1);
        expect(result['É']).toBe(1);
        expect(result['Ü']).toBe(1);
    })


    it('should handle special consonants', () => {
        const input = 'ß';
        const result = service.countLetters(input, LetterCountMode.CONSONANTS);

        expect(getKeys(result).length).toBe(1);
        expect(result['ß']).toBe(1);
    })

    it('should ignore non-letter characters', () => {
        const input = '123 !?.,';
        const result = service.countLetters(input, LetterCountMode.VOWELS);

        expect(getKeys(result).length).toBe(0);
    });

    it('should return empty object for empty string', () => {
        const result = service.countLetters('', LetterCountMode.CONSONANTS);

        expect(getKeys(result).length).toBe(0);
    });
});
