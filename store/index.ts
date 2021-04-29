import axios from 'axios'
import { IFolder } from '~/types/IFolder';
import { IState } from './types/IState'

export const state = (): IState => ({
    token: '',
    user: {},
    singleProjects: [],
    folders: [],
    activeFolderProjects: []
})

export const getters = {
    projectNames: (state: IState) => {
        return state.folders.map((folder: IFolder) => folder?.attributes?.name);
    }
};

export const mutations = {
    setToken(state: IState, token: string) {
        state.token = token
    },
    setUser(state: IState, user: Object) {
        state.user = user
    },
    setSingleProjects(state: IState, singleProjects: Object[]) {
        state.singleProjects = singleProjects
    },
    setFolders(state: IState, folders: IFolder[]) {
        state.folders = folders
    },
    setActiveFolderProjects(state: IState, projects: Object[]) {
        state.activeFolderProjects = projects
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
        console.log(singleProjects)
        commit('setSingleProjects', singleProjects)
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
    },
    async getFolderProjects({ state, commit }: { state: IState, commit }, folderId: string) {
        const response = await axios.get(process.env.NUXT_ENV_API_URL + 'api/v1/teams/' +
            process.env.NUXT_ENV_TEAM_NAME + '/folders/' + folderId, {
            headers: {
                'Authorization': `Bearer ${state.token}`
            }
        })
        const projects = response?.data
        commit('setActiveFolderProjects', projects)
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
    async loadApplication({ dispatch }) {
        await dispatch('getToken');
        await dispatch('getUser');
        await dispatch('getFolders');
        await dispatch('getSingleProjects');
    }
}