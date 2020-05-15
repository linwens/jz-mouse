import Cookies from 'js-cookie'
import { setStorageItem, getStorageItem, removeStorageItem } from '@/utils/storage'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  cacheMouseInfo: getStorageItem('m-info') || {},
  addingMouses: getStorageItem('adding-mouse') || '',
  addingExpt: getStorageItem('adding-expt') || '',
  addingBreed: getStorageItem('adding-breed') || ''
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_M_INFO: (state, info) => {
    state.cacheMouseInfo = JSON.stringify(info)
    setStorageItem('m-info', JSON.stringify(info))
  },
  CACHE_MOUSES: (state, arr) => {
    state.addingMouses = JSON.stringify(arr)
    setStorageItem('adding-mouse', JSON.stringify(arr))
  },
  CLEAR_MOUSES: (state) => {
    state.addingMouses = ''
    removeStorageItem('adding-mouse')
  },
  CACHE_EXPTS: (state, arr) => {
    state.addingExpt = JSON.stringify(arr)
    setStorageItem('adding-expt', JSON.stringify(arr))
  },
  CLEAR_EXPTS: (state) => {
    state.addingExpt = ''
    removeStorageItem('adding-expt')
  },
  CACHE_BREED: (state, arr) => {
    state.addingBreed = JSON.stringify(arr)
    setStorageItem('adding-breed', JSON.stringify(arr))
  },
  CLEAR_BREED: (state) => {
    state.addingBreed = ''
    removeStorageItem('adding-breed')
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  cacheMouseInfo({ commit }, info) {
    commit('SET_M_INFO', info)
  },
  cacheChoosedMouse({ commit }, arr) {
    commit('CACHE_MOUSES', arr)
  },
  clearMouses({ commit }) {
    commit('CLEAR_MOUSES')
  },
  cacheExpts({ commit }, arr) {
    commit('CACHE_EXPTS', arr)
  },
  clearExpts({ commit }) {
    commit('CLEAR_EXPTS')
  },
  cacheBreed({ commit }, arr) {
    commit('CACHE_BREED', arr)
  },
  clearBreed({ commit }) {
    commit('CLEAR_BREED')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
