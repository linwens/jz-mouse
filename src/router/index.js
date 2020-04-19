import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/variety',
    component: Layout,
    redirect: '/variety/list',
    name: 'variety',
    meta: {
      title: '品系管理',
      icon: 'variety'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/variety/index'),
        name: 'varietyList',
        // hidden: true,
        meta: { title: '品系管理', noCache: true, breadcrumb: false }
      },
      {
        path: 'edit',
        component: () => import('@/views/variety/edit'),
        name: 'varietyEdit',
        hidden: true,
        meta: { title: '品系详情', noCache: true }
      }
    ]
  },

  {
    path: '/mouse',
    component: Layout,
    redirect: '/mouse/main',
    name: 'mouse',
    meta: {
      title: '小鼠管理',
      icon: 'mouse'
    },
    children: [
      {
        path: 'main',
        component: () => import('@/views/mouse/index'),
        name: 'mouseMain',
        // hidden: true,
        meta: { title: '小鼠管理', noCache: true, breadcrumb: false }
      },
      {
        path: 'addMouse',
        component: () => import('@/views/mouse/addMouse'),
        name: 'addMouse',
        hidden: true,
        meta: { title: '新增小鼠', noCache: true }
      },
      {
        path: 'addChild',
        component: () => import('@/views/mouse/addChild'),
        name: 'addChild',
        hidden: true,
        meta: { title: '新增子鼠', noCache: true }
      },
      {
        path: 'edit',
        component: () => import('@/views/mouse/edit'),
        name: 'edit',
        hidden: true,
        meta: { title: '查看/编辑', noCache: true }
      },
      {
        path: 'cage',
        component: () => import('@/views/mouse/cage'),
        name: 'cage',
        hidden: true,
        meta: { title: '选择笼位', noCache: true }
      }
    ]
  },

  {
    path: '/experiment',
    component: Layout,
    redirect: '/experiment/list',
    name: 'experiment',
    meta: {
      title: '实验管理',
      icon: 'experiment'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/experiment/index'),
        name: 'experimentList',
        // hidden: true,
        meta: { title: '实验管理', noCache: true, breadcrumb: false }
      },
      {
        path: 'edit',
        component: () => import('@/views/experiment/edit'),
        name: 'experimentEdit',
        hidden: true,
        meta: { title: '编辑', noCache: true }
      },
      {
        path: 'add',
        component: () => import('@/views/experiment/add'),
        name: 'experimentAdd',
        hidden: true,
        meta: { title: '添加小鼠', noCache: true }
      }
    ]
  },

  {
    path: '/todo',
    component: Layout,
    children: [
      {
        path: 'list',
        component: () => import('@/views/todo/index'),
        name: 'todo',
        meta: { title: '待处理事项', icon: 'todo', noCache: true }
      }
    ]
  },

  {
    path: '/breed',
    component: Layout,
    redirect: '/breed/list',
    name: 'breed',
    meta: {
      title: '繁育管理',
      icon: 'breed'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/breed/index'),
        name: 'breedList',
        // hidden: true,
        meta: { title: '繁育管理', noCache: true, breadcrumb: false }
      },
      {
        path: 'edit',
        component: () => import('@/views/breed/edit'),
        name: 'breedEdit',
        hidden: true,
        meta: { title: '编辑/查看', noCache: true }
      }
    ]
  },

  {
    path: '/delList',
    component: Layout,
    children: [
      {
        path: 'list',
        component: () => import('@/views/delList/index'),
        name: 'delList',
        meta: { title: '移除小鼠列表', icon: 'delList', noCache: true }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
