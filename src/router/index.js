import Vue from 'vue'
import Router from 'vue-router'
import TabBar from '@/components/TabBar'
import Recommend from '@/components/recommend'
import TopList from '@/components/TopList'
import Singer from '@/components/Singer'
import SingerDetail from '@/components/SingerDetail'
import Rec from '@/components/Rec'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			redirect: '/recommend'
		},
		{
			path: '/recommend',
			component: Recommend,
			children: [
				{
					path: ':id',
					component: Rec
				}
			]
		},
		{
			path: '/singer',
			component: Singer,
			children: [
				{
					path: ':id',
					component: SingerDetail
				}
			]
		},
		{
			path: '/toplist',
			component: TopList
		}
	],
	linkActiveClass: 'my-active'
})
