export interface ICounter extends IFlashcardVocab {
    WrongCounter: number;
    RightCounter: number;
}

export interface IFlashcardVocab {
    Id: number;
    Japanese: string;
    Hiragana?: string;
    English: string;
    Sentence?: string;
    Tags?: string;
    Correct?: boolean;
}

export interface ICounterReq {
    results: IFlashcardVocab[];
}
