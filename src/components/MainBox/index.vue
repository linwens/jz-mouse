<template>
  <div class="mouse__basic-mainBox"><!-- 公共组件，包含：主内容的标题及公共样式 -->
    <slot />
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  .mouse__basic-mainBox {
    height: calc(100vh - 50px);
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    padding: 0 16px;
  }
</style>
