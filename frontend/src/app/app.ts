import {Component, computed, inject, signal} from '@angular/core';
import {TextAnalyzer} from '../service/text-analyzer';
import {TextAnalyzerAPI} from "../api/text-analyzer-api";
import {FormsModule} from "@angular/forms";
import {AnalysisResult} from "../model/analysis-result";
import {AnalyzeTextMode} from "../model/analyze-text-mode";

@Component({
    selector: 'app-root',
    imports: [
        FormsModule
    ],
    templateUrl: './app.html'
})
export class App {
    Mode = AnalyzeTextMode;

    private textAnalyzer = inject(TextAnalyzer);
    private textAnalyzerApi = inject(TextAnalyzerAPI);
    private result = signal<AnalysisResult | null>(null);
    inputText = '';
    mode: AnalyzeTextMode = AnalyzeTextMode.VOWELS;
    offlineMode = false;
    errorMessage = '';
    loading = false;

    formattedResult = computed(() => {
        const result = this.result();
        if (!result) return '';
        const formattedResult = Object.entries(result)
            .map(([key, value]) => `${key}: ${value}`)
            .sort()
            .join('\n');
        if (!formattedResult) return 'None found.';
        return formattedResult;
    });

    analyze(): void {
        this.errorMessage = '';
        if (!this.inputText) {
            this.errorMessage = 'Please enter your text';
            return;
        }

        if (this.offlineMode) {
            this.result.set(this.textAnalyzer.analyzeText(this.inputText, this.mode));
        } else {
            this.loading = true;
            this.textAnalyzerApi.analyzeText({text: this.inputText, mode: this.mode}).subscribe({
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
}
