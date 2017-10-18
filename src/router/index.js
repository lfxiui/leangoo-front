import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import ProFile from '@/components/user/profile'
import BoardPage from '@/components/board/boardPage'
import Project from '../components/project/project'
import Login from '../components/login/login.vue'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path:'/index',
            name:'Hello',
            component:Hello
        },
        {
            path: '/profile',
            name: 'ProFile',
            component: ProFile
        },
        {
            path: '/board/:projectId/:boardId',
            name: 'Board',
            component: BoardPage
        },
        {
            path: '/project/:projectId/:tab',
            name: 'Project',
            component: Project
        }
    ]
})
