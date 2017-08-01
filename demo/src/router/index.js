import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import contact from '@/components/contact'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Hello',
			component: Hello
		},{
			path: '/contact',
			name: 'contact',
			component: contact
		}
	]
})
