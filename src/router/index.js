import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

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
        meta: { title: '品系列表', noCache: true }
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
    name: 'variety',
    meta: {
      title: '小鼠管理',
      icon: 'mouse'
    },
    children: [
      {
        path: 'main',
        component: () => import('@/views/mouse/index'),
        name: 'mouseMain',
        meta: { title: '详情', noCache: true }
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
        meta: { title: '列表', noCache: true }
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
        meta: { title: '列表', noCache: true }
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

  /* {
    path: '/charts',
    component: Layout,
    children: [
      {
        path: 'keyboard',
        component: () => import('@/views/charts/keyboard'),
        name: 'KeyboardChart',
        meta: { title: 'Keyboard Chart', icon: 'chart', noCache: true }
      }
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  }, */

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
