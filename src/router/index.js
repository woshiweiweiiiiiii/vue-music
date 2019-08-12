import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/components/recommend'
import TopList from '@/components/TopList'
import Singer from '@/components/Singer'
import SingerDetail from '@/components/SingerDetail'
import ToplistDetail from '@/components/ToplistDetail'
import Rec from '@/components/Rec'
import Mv from '@/components/Mv'

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
		// {
		// 	path: '/singer/:id',
		// 	component: SingerDetail
		// },
		{
			path: '/toplist',
			component: TopList,
			children: [
				{
					path: ':id',
					component: ToplistDetail
				}
			]
		},
		{
			path: '/mv',
			component: Mv
			
		}
	],
	linkActiveClass: 'my-active'
})
