import axios from 'axios'
import { IFolder } from '~/types/IFolder';
import { IState } from './types/IState'

export const state = (): IState => ({
    token: '',
    user: {},
    singleProjects: [],
    folders: [],
    openFolder: {} as IFolder,
    openFolderProjects: [],
    loadingProjects: false,
    loadingFolders: false,
    loadingFolderProjects: false
})

export const getters = {
    projectNames: (state: IState) => {
        return state.folders.map((folder: IFolder) => folder?.attributes?.name);
    }
};

export const mutations = {
    setToken(state: IState, token: string) {
        state.token = token;
    },
    setUser(state: IState, user: Object) {
        state.user = user;
    },
    setSingleProjects(state: IState, singleProjects: Object[]) {
        state.singleProjects = singleProjects;
    },
    setFolders(state: IState, folders: IFolder[]) {
        state.folders = folders;
    },
    setOpenFolder(state: IState, folder: IFolder) {
        state.openFolder = folder;
    },
    setOpenFolderProjects(state: IState, projects: Object[]) {
        state.openFolderProjects = projects;
    },
    setLoadingFolders(state: IState, loading: boolean) {
        state.loadingFolders = loading;
    },
    setLoadingProjects(state: IState, loading: boolean) {
        state.loadingProjects = loading;
    },
    setLoadingFolderProjects(state: IState, loading: boolean) {
        state.loadingFolderProjects = loading;
    }
}

export const actions = {
    async getToken({ commit }) {
        const data = new FormData();
        data.append('client_id', process.env.NUXT_ENV_CLIENT_ID || '');
        data.append('client_secret', process.env.NUXT_ENV_CLIENT_SECRET || '');
        data.append('grant_type', 'password');
        data.append('username', process.env.NUXT_ENV_USER_NAME || '');
        data.append('password', process.env.NUXT_ENV_PASSWORD || '');
        data.append('scope', "dashboard");

        const response = await axios.post(process.env.NUXT_ENV_API_URL + 'oauth/token', data)
        const token = response?.data?.access_token
        commit('setToken', token)
    },
    async getUser({ state, commit }: { state: IState, commit }) {
        const response = await axios.get(process.env.NUXT_ENV_API_URL + 'api/v1/user', {
            headers: {
                'Authorization': `Bearer ${state.token}`
            }
        })
        const user = response?.data
        commit('setUser', user)
    },
    async getSingleProjects({ state, commit }: { state: IState, commit }) {
        const response = await axios.get(process.env.NUXT_ENV_API_URL + 'api/v1/teams/' +
            process.env.NUXT_ENV_TEAM_NAME + '/projects?filters[is_workspace]=true', {
            headers: {
                'Authorization': `Bearer ${state.token}`
            }
        })
        const singleProjects = response?.data?.data
        commit('setSingleProjects', singleProjects)
        commit('setLoadingProjects', false);
    },
    async getFolders({ state, commit }: { state: IState, commit }) {
        const response = await axios.get(process.env.NUXT_ENV_API_URL + 'api/v1/teams/' +
            process.env.NUXT_ENV_TEAM_NAME + '/folders', {
            headers: {
                'Authorization': `Bearer ${state.token}`
            }
        })
        const folders: IFolder[] = response?.data?.data
        commit('setFolders', folders)
        commit('setLoadingFolders', false);
    },
    async getFolderProjects({ state, commit }: { state: IState, commit }, folderId: string) {
        commit("setLoadingFolderProjects", true);
        const response = await axios.get(process.env.NUXT_ENV_API_URL + 'api/v1/teams/' +
            process.env.NUXT_ENV_TEAM_NAME + '/folders/' + folderId, {
            headers: {
                'Authorization': `Bearer ${state.token}`
            }
        })
        console.log(response)
        const projects = response?.data?.included
        commit('setOpenFolderProjects', projects)
        commit("setLoadingFolderProjects", false);
    },
    async createFolder({ state, dispatch }: { state: IState, dispatch }, name: string) {
        const data = JSON.stringify({
            data: {
                type: 'project-folder',
                attributes: {
                    name
                }
            }
        })

        const response = await axios.post(process.env.NUXT_ENV_API_URL + 'api/v1/teams/' +
            process.env.NUXT_ENV_TEAM_NAME + '/folders', data, {
            headers: {
                'Authorization': `Bearer ${state.token}`,
                'Content-Type': 'application/json',
            },
        })
        if (response?.data) {
            dispatch('getFolders');
        }
    },
    async loadApplication({ dispatch, commit }) {
        commit('setLoadingFolders', true);
        commit('setLoadingProjects', true);
        await dispatch('getToken');
        await dispatch('getUser');
        await dispatch('getFolders');
        await dispatch('getSingleProjects');
    },
    openFolder({ commit, dispatch }, folder: IFolder) {
        commit('setOpenFolder', folder);
        dispatch('getFolderProjects', folder.id);
    }
}