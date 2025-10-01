import {LetterCountMode} from "./letter-count-mode";

export interface AnalyzeTextRequest {
    text: string;
    mode: LetterCountMode;
}
