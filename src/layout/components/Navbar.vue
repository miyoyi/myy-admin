<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <!-- <message class="mr20 fc6" /> -->
      <el-dropdown class="avatar-container" trigger="click" @command="handleCommand">
        <div class="avatar-wrapper vm">
          <img :src="headImg||defaultAvatar" class="user-avatar" />
          <span class="vm">{{name}}</span>
          <i class="el-icon-caret-bottom vm" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item command="UserInfo">
            <a href="javascript:;">账号设置</a>
          </el-dropdown-item>
          <el-dropdown-item command="Logout">
            <a href="javascript:;">退出登录</a>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Breadcrumb from './Breadcrumb'
import Hamburger from './Hamburger'
// import Message from './message'
import defaultAvatar from '@/assets/default-logo.jpg'
export default {
  components: {
    Breadcrumb,
    Hamburger
    // Message
  },
  data () {
    return {
      defaultAvatar
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'headImg', 'name'])
  },
  methods: {
    ...mapActions(['toggleSideBar', 'LogOut']),
    handleCommand (cmd) {
      this[`to${cmd}`]()
    },
    toUserInfo () {
      this.$router.push(`/userInfo`)
    },
    toLogout () {
      this.$confirm('确定要退出登录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.LogOut()
        this.$router.push(`/login`)
      }).catch(() => {

      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    display: flex;
    align-items: center;
    margin-right: 30px;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
  }
  .user-avatar {
    width: 36px;
    height: 36px;
    border-radius: 25%;
    overflow: hidden;
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
