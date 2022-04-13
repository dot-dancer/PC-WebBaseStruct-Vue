import { Commit } from 'vuex'
import sysCfg from '../config/syscfg'

type BlogStateType = {
    blogCount: number;
}

export const initStore = () => {

    const state: BlogStateType = {
        blogCount: 0,
    }

    const mutations = {
        addBlogCount(state: BlogStateType){
            state.blogCount++
        }   
    }

    const actions = {
        asyncAddBlogCount({state, commit}: {state: BlogStateType, commit: Commit}, playload: any){
            console.log('---action-asyncAddBlogCount: ', playload)
            setTimeout(() => commit('addBlogCount'), 1000)
        }
    }
    
    const getters = {
        getCount(state: BlogStateType){
            return state.blogCount
        }
    }

    const store = {
        namespaced: true,
        state,
        getters,
        mutations,
        actions,
    }
    
    app.registBModStores(sysCfg.module, store)
}