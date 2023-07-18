import { lazyComponent } from '@/utils'
export default [
  {
    path: '/',
    name: '',
    sort: 1,
    meta: {
      title: '初始化',
      icon: '',
      iconUrl: ''
    },
    children: [
      {
        path: '/',
        name: '初始化',
        sort: 1,
        component: lazyComponent('commonsTest'),
        meta: { title: '初始化', iconUrl: '' }
      }
    ]
  }
]
