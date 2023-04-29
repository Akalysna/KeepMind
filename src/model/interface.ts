export interface Theme {
    id: number,
    revision_id:number,
    name: string,
    description: string,
    creation_date: string,
    cards: number[],
    max_level: number,
}

export interface Revision{
    id:number,
    new_cards:number,
    level:number[],
    last_revision: string,
    first_revision:string,
    cards_revision: [number[], number[], number[], number[], number[], number[], number[]]
}

export interface CardFace {
    type: string,
    data: string
}

export interface Card {
    id: number,
    creation_date: string,
    recto: CardFace
    verso: CardFace
}


export interface DataApp {
    cards: Card[];
    themes: Theme[];
}