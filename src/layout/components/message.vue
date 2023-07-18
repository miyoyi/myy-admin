<template>
  <div class="header-message mr10" @click="goMessage">
    <el-badge :value="messageCount" class="item">
      <i class="el-icon-bell" />
    </el-badge>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['messageCount'])
  },
  methods: {
    goMessage () {
      // if (!this.messageCount) return
      this.$router.push({ name: 'message' })
    }
  }
}
</script>

<style lang="scss" scoped>
.header-message {
  cursor: pointer;
  i.el-icon-bell {
    font-size: 20px;
  }
}
</style>
