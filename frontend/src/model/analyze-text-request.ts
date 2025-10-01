import {AnalyzeTextMode} from "./analyze-text-mode";

export interface AnalyzeTextRequest {
    text: string;
    mode: AnalyzeTextMode;
}
