import axios from 'axios'
import { IState } from './types/IState'

export const state = (): IState => ({
    token: '',
    user: {},
    singleProjects: [],
    folders: [],
    activeFolderProjects: []
})

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
    setFolders(state: IState, folders: Object[]) {
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
        const singleProjects = response?.data
        commit('setSingleProjects', singleProjects)
    },
    async getFolders({ state, commit }: { state: IState, commit }) {
        const response = await axios.get(process.env.NUXT_ENV_API_URL + 'api/v1/teams/' +
            process.env.NUXT_ENV_TEAM_NAME + '/folders', {
            headers: {
                'Authorization': `Bearer ${state.token}`
            }
        })
        const folders = response?.data
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
    async createFolder({ state, dispatch }: { state: IState, commit, dispatch }, name: string = "") {
        const data = new FormData();
        data.append('name', name);

        const response = await axios.post(process.env.NUXT_ENV_API_URL + 'api/v1/teams/' +
            process.env.NUXT_ENV_TEAM_NAME + '/folder', {
            headers: {
                'Authorization': `Bearer ${state.token}`
            },
            data
        })
        if (response?.data) {
            dispatch('getFolders');
        }
    },
}