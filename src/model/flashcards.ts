export interface ICounter {
    Id: number;
    WrongCounter: number;
    RightCounter: number;
}

export interface ICounterReq {
    right: number[];
    wrong: number[];
}