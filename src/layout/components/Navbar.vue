<template>
  <div class="navbar">

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu df s-jcc s-aic">
      <el-badge :is-dot="hasMsg" class="top-message__icon df s-jcc s-aic">
        <svg-icon icon-class="message" class="fs26" />
      </el-badge>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'

export default {
  components: {
    Breadcrumb
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ]),
    // 是否有消息
    hasMsg() {
      return true
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
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
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .top-message__icon {
      width: 26px;
      height: 26px;
      margin-right: 30px;
    }
  }
}
</style>
