import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LetterCountingResult} from "../model/letter-counting-result";
import {AnalyzeTextRequest} from "../model/analyze-text-request";

@Injectable({
    providedIn: 'root'
})
export class TextAnalyzerAPI {
    private apiUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) {}

    countLetters(requestData: AnalyzeTextRequest) {
        return this.http.post<LetterCountingResult>(`${this.apiUrl}/`, requestData);
    }
}
