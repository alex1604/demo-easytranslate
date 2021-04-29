export interface IFolderAttributes {
    created_at: string,
    name: string,
    total_projects: number,
    updated_at: string
}
export interface IFolder {
    attributes: IFolderAttributes,
    id: string
}