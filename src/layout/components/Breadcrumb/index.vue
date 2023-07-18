<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <!-- <transition-group name="breadcrumb"> -->
    <!-- <el-breadcrumb-item v-for="(item,index) in levelList" :key="index">
      <span v-if="typeof(item)==='string'">{{ item }}</span>
      <a v-else @click="handleLink(item)">{{ item.meta.title }}</a>
    </el-breadcrumb-item> -->
    <!-- </transition-group> -->
    <!-- <el-breadcrumb-item v-if="breadTitle&&breadTitle.parentName">{{ breadTitle&&breadTitle.parentName }}</el-breadcrumb-item>
    <el-breadcrumb-item v-if="breadTitle&&breadTitle.meta.title">{{ breadTitle&&breadTitle.meta.title }}</el-breadcrumb-item> -->

    <el-breadcrumb-item v-if="$route&&$route.meta.parentName">{{ $route&&$route.meta.parentName[0] }}</el-breadcrumb-item>
    <el-breadcrumb-item v-if="$route&&$route.meta.title">{{ $route&&$route.meta.title }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp'
import { loadFromLocal } from '@/utils/auth'
import {SidebarMenuKey} from '@/config'

export default {
  data () {
    return {
      breadTitle: {},
      levelList: null,
      breadcrumbFront: ''
    }
  },
  computed: {
    lastMenus () {
      // 最新的路由
      let asyncMenu = loadFromLocal(SidebarMenuKey)
      return asyncMenu || []
    },
    activeMenu () {
      // 取当前路由
      const route = this.$route
      const { meta, name } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return name
    }
  },
  watch: {
    /* $route () {
      this.getBreadcrumb()
    },
    activeMenu () {
      this.getTitle()
    } */
  },
  created () {
    // this.getBreadcrumb()
    // this.getTitle()
  },
  methods: {
    getTitle () {
      let lastMenus = this.lastMenus.filter(i => {
        return i.meta && i.meta.title
      })
      let breadArr = []
      lastMenus.forEach(i => {
        if (i.children && i.children.length) {
          i.children.forEach(ch => {
            if (ch.name === this.activeMenu) {
              breadArr.push({ ...ch, parentName: i.meta.title })
            }
          })
        } else {
          if (i.name === this.activeMenu) {
            breadArr.push({...i})
          }
        }
      })

      const matched = this.$route.matched.filter(
        item => item.meta && item.meta.title
      )
      if (this.activeMenu === 'userInfo' && breadArr.length === 0) {
        this.breadTitle = matched[0]
      } else {
        this.breadTitle = breadArr[0]
      }
    },
    getBreadcrumb () {
      // only show routes with meta.title
      const matched = this.$route.matched.filter(
        item => item.meta && item.meta.title
      )
      const first = matched[0]
      console.log('first', first)
      this.breadcrumbFront = first.meta.parentName || []
      let obj = {}
      // 去重
      this.levelList = [...this.breadcrumbFront, first.meta.title].reduce(
        (cur, next) => {
          // eslint-disable-next-line
          obj[next] ? "" : (obj[next] = true && cur.push(next));
          return cur
        },
        []
      )
    },
    isDashboard (route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return (
        name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
      )
    },
    pathCompile (path) {
      // To solve this problem https://github.com/GanQianZhao/vue-element-admin/issues/561
      // const params = { aa: '1', bb: 2 }
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink (item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
