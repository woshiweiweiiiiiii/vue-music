// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import VueLazyload from 'vue-lazyload'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(VueLazyload, {
	loading: require('../static/images/loading.gif')
})
Vue.use(Vuex)
Vue.use(iView)


Vue.config.productionTip = false

//Vuex
const store = new Vuex.Store({
	state: {
		singer: {},
		rec: {},
		playing: false,
		fullScreen: false,
		playList: [],
		currentIndex: -1,
		toplist: {}
	},
	mutations: {
		setSinger(state, singer) {
			state.singer = singer
		},
		setRec(state, rec) {
			state.rec = rec
			
		},
		setPlayingState(state, flag) {
			state.playing = flag

		},
		setFullScreen(state, flag) {
			state.fullScreen = flag

		},
		setPlayList(state, list) {
			state.playList = list

		},
		setCurrentIndex(state, index) {
			state.currentIndex = index

		},
		setToplist(state, list) {
			state.toplist = list
		}
	},
	getters: {
		
		singer: state => state.singer,
		rec: state => state.rec,
		playing: state => state.playing,
		fullScreen: state => state.fullScreen,
		playList: state => state.playList,
		currentIndex: state => state.currentIndex,
		currentSong: state => {
			return state.playList[state.currentIndex] || {}
		}
	},
	actions: {
		selectPlay({ commit, state }, { list, index }) {
			commit('setPlayList', list)
			commit('setCurrentIndex', index)
			commit('setFullScreen', true)
			commit('setPlayingState', true)
		}
	}
})
//Vuex


/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: { App },
	template: '<App/>'
})
