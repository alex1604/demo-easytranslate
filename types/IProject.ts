interface IPrice {
    amount: number,
    currency: string
}

interface IProgress {
    completed_tasks: number,
    percent: number
}

export interface IProjectAttributes {
    created_at: string,
    name: string,
    price: IPrice,
    progress: IProgress,
    source_language: string,
    target_languages: string[],
    status: string,
    updated_at: string,
    preferred_deadline: string
}

export interface IProject {
    attributes: IProjectAttributes,
    id: string
}