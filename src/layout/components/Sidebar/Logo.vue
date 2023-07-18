<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="typeLogo" :src="typeLogo" class="sidebar-logo">
        <h1 v-else class="sidebar-title">{{ title }} </h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="typeLogo" :src="typeLogo" class="sidebar-logo">
        <h1 class="sidebar-title">{{ title }} </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
// import logo2 from '@/assets/logo/coupon.png'
// import logo3 from '@/assets/logo/channel.png'
// import logo4 from '@/assets/logo/film.png'
import logo from '@/assets/logo/logo.png'
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      // logo2,
      // logo3,
      // logo4
    }
  },
  computed: {
    typeLogo () {
      return logo
      // let type = +this.userType
      // if (type === 2) {
      //   return this.logo2
      // } else if (type === 3) {
      //   return this.logo3
      // } else {
      //   return this.logo4
      // }
    },
    title () {
      let type = +this.userType
      return '管理后台'
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  padding: 20px 0;
  position: relative;
  width: 100%;
  border-bottom:1px solid rgb(78,139,250);
  // height: 50px;
  // line-height: 50px;
  // background: #2b2f3a;
  text-align: center;
  // overflow: hidden;
  &.collapse {
    & .sidebar-logo-link {
      & .sidebar-logo {
        width: 32px;
        height: 32px;
      }
    }
  }
  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 50px;
      height: 50px;
      vertical-align: middle;
    }

    & .sidebar-title {
      margin: 0;
      color: #fff;
      font-weight: 600;
      padding-top: 10px;
      font-size: 16px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
