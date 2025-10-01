import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AnalysisResult} from "../model/analysis-result";
import {AnalyzeTextRequest} from "../model/analyze-text-request";

@Injectable({
    providedIn: 'root'
})
export class TextAnalyzerAPI {
    private apiUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) {}

    analyzeText(request: AnalyzeTextRequest) {
        return this.http.post<AnalysisResult>(`${this.apiUrl}/`, request);
    }
}
