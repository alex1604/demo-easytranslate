import { IFolder } from '~/types/IFolder';
export interface IState {
    token: string,
    user: Object,
    singleProjects: Object[],
    folders: IFolder[],
    openFolder: IFolder,
    openFolderProjects: Object[]
}