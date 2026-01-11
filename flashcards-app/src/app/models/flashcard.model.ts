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

export const testCards: Flashcard[] = [
    {
        baseLanguage: 'Hund', 
        resultLanguage: 'dog',
        category: 'Animals',
        wordType: WordType.Noun
    }, 
    {
        baseLanguage: 'Katze', 
        resultLanguage: 'cat',
        category: 'Animals',
        wordType: WordType.Noun
    }, 
    {
        baseLanguage: 'Pferd', 
        resultLanguage: 'horse',
        category: 'Animals',
        wordType: WordType.Noun
    }, 
];
