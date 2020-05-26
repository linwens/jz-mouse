<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu df s-jcc s-aic">
      <el-badge
        :is-dot="hasMsg"
        class="top-message__icon df s-jcc s-aic"
      >
        <svg-icon icon-class="message" class="fs26 cp" @click="goTodo()" />
      </el-badge>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import Breadcrumb from '@/components/Breadcrumb'
import { fetchList } from '@/api/todo'

export default {
  components: {
    Hamburger,
    Breadcrumb
  },
  data() {
    return {
      hasMsg: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  created() {
    this.getUnRead()
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    // 跳转待办事项列表
    goTodo() {
      this.$router.push({ name: 'todo' })
    },
    // 获取是否有未读消息
    getUnRead() {
      fetchList({
        status: 1,
        current: 1,
        size: 10
      }).then((res) => {
        if (res.data.total > 0) {
          this.hasMsg = true
        }
      })
    },
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
