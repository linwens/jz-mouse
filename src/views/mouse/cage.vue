<template>
  <div>
    <main-box class="mouse__cageChoice fs14 cl-black">
      <div class="mb16">
        <p class="mouse__cageChoice--p">
          剩余小鼠: 
          <span>{{ female }}只 (<i class="cl-purple">雌</i>)</span>
          /
          <span>{{ male }}只 (<i class="cl-blue">雄</i>)</span>
        </p>
      </div>
      <div class="mb16">
        <el-button size="small" class="w80">放入</el-button>
        <el-button size="small" class="w80">新增笼位</el-button>
      </div>
      <div>鼠笼</div>
      <div class="mouse__cageChoice--btns pos-a w-100 h60 df s-aic">
        <el-button size="small" class="w100 mr6" @click="goBack()">返回</el-button>
      </div>
    </main-box>
  </div>
</template>

<script>
export default {
  name: 'CageChoice',
  data() {
    return {
      male: 50,
      female: 50
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss">
  .mouse__cageChoice{
    padding-top: 17px;
    &--p{
      display: inline-block;
      color: #999;
      span{
        color: #333;
      }
    }
    &--btns {
      bottom: 0;
      left: 0;
      padding-left: 40px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(214,214,214,1);
    }
  }
</style>
