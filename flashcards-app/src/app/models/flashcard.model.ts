export interface Flashcard {
    baseLanguage: string;
    resultLanguage: string;
    wordType: WordType;
    category: string;
}

export enum WordType {
    Noun,
    Verb,
    Adjective
}

