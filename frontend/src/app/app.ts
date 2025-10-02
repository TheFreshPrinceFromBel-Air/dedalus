import {Component, computed, inject, signal} from '@angular/core';
import {TextAnalyzer} from '../service/text-analyzer';
import {TextAnalyzerAPI} from "../api/text-analyzer-api";
import {FormsModule} from "@angular/forms";
import {LetterCountingResult} from "../model/letter-counting-result";
import {LetterCountMode} from "../model/letter-count-mode";

@Component({
    selector: 'app-root',
    imports: [
        FormsModule
    ],
    styleUrl: "./app.css",
    templateUrl: './app.html'
})
export class App {
    Mode = LetterCountMode;

    private textAnalyzer = inject(TextAnalyzer);
    private textAnalyzerApi = inject(TextAnalyzerAPI);
    private result = signal<LetterCountingResult | null>(null);
    inputText = '';
    textMode: LetterCountMode = LetterCountMode.VOWELS;
    offlineMode = false;
    errorMessage = '';
    loading = false;

    formattedResult = computed((): string => {
        const result = this.result();
        if (!result) return '';
        const formattedResult = Object.entries(result)
            .map(([key, value]) => `${key}: ${value}`)
            .sort()
            .join('\n');
        if (!formattedResult) return 'None found.';
        return formattedResult;
    });

    countLetters(): void {
        this.result.set(null);
        this.errorMessage = '';
        if (!this.inputText) {
            this.errorMessage = 'Please enter your text';
            return;
        }

        if (this.offlineMode) {
            this.result.set(this.textAnalyzer.countLetters(this.inputText, this.textMode));
        } else {
            this.loading = true;
            this.countLettersOnline();
        }
    }

    private countLettersOnline(): void {
        this.textAnalyzerApi.countLetters({text: this.inputText, mode: this.textMode}).subscribe({
            next: (result) => {
                this.result.set(result);
                this.loading = false;
            },
            error: (error) => {
                console.error('Error during text analyzer api request', error);
                this.errorMessage = 'Error analyzing text. Please try again later.';
                this.loading = false;
            },
        });
    }
}
